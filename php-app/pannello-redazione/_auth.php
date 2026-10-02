<?php
/*
 * Autenticazione, sessione, CSRF e layout del pannello di redazione.
 * Un solo utente (credenziali in data/admin.php, password solo come hash).
 */
declare(strict_types=1);
require dirname(__DIR__) . '/inc/bootstrap.php';

const IDLE_TIMEOUT = 1800;      // 30 minuti senza attività
const ABSOLUTE_TIMEOUT = 28800; // 8 ore dal login
const MAX_FAILED = 5;           // tentativi falliti...
const FAIL_WINDOW = 900;        // ...in 15 minuti
const LOCK_SECONDS = 900;       // blocco di 15 minuti

/* ---------- Header di sicurezza (su ogni pagina del pannello) ---------- */
function panel_headers(): void
{
    header('X-Robots-Tag: noindex, nofollow, noarchive');
    header('Cache-Control: no-store, no-cache, must-revalidate');
    header('X-Frame-Options: DENY');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: same-origin');
    // Niente script inline: gli script del pannello sono file propri (editor.js).
    header("Content-Security-Policy: default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'none'");
}

function is_https(): bool
{
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https')
        || ((int) ($_SERVER['SERVER_PORT'] ?? 0) === 443);
}

function panel_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    session_name('redazione_sid');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/pannello-redazione/',
        'secure' => is_https(),   // Secure quando servito in HTTPS
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    session_start();
}

/* ---------- Credenziali ---------- */
function admin_config(): ?array
{
    $f = DATA_DIR . '/admin.php';
    if (!is_file($f)) {
        return null;
    }
    $cfg = include $f;
    return (is_array($cfg) && !empty($cfg['user']) && !empty($cfg['hash'])) ? $cfg : null;
}

function save_admin_config(string $user, string $hash): void
{
    if (!is_dir(DATA_DIR) && !@mkdir(DATA_DIR, 0755, true)) {
        throw new RuntimeException('Cartella dati non scrivibile.');
    }
    $php = "<?php\n// Generato dal pannello. Non modificare a mano. Contiene solo l'hash della password.\nreturn " . var_export(['user' => $user, 'hash' => $hash], true) . ";\n";
    $file = DATA_DIR . '/admin.php';
    $tmp = $file . '.tmp' . bin2hex(random_bytes(4));
    if (file_put_contents($tmp, $php) === false || !@rename($tmp, $file)) {
        throw new RuntimeException('Impossibile salvare la password.');
    }
    @chmod($file, 0600);
}

/* ---------- Limite ai tentativi di login ---------- */
function attempts_file(): string
{
    return DATA_DIR . '/login-attempts.json';
}

function attempts_load(): array
{
    $raw = is_file(attempts_file()) ? @file_get_contents(attempts_file()) : '';
    $d = $raw ? json_decode($raw, true) : [];
    return is_array($d) ? $d : [];
}

function attempts_save(array $d): void
{
    if (!is_dir(DATA_DIR)) {
        @mkdir(DATA_DIR, 0755, true);
    }
    @file_put_contents(attempts_file(), json_encode($d), LOCK_EX);
}

function client_key(): string
{
    return hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? 'x'));
}

// Secondi di blocco residuo (0 = libero)
function login_locked_for(): int
{
    $d = attempts_load();
    $k = client_key();
    $until = (int) ($d[$k]['locked_until'] ?? 0);
    return max(0, $until - time());
}

function login_register_failure(): void
{
    $d = attempts_load();
    $now = time();
    // pulizia voci vecchie
    foreach ($d as $key => $v) {
        if (($v['first'] ?? 0) < $now - FAIL_WINDOW && ($v['locked_until'] ?? 0) < $now) {
            unset($d[$key]);
        }
    }
    $k = client_key();
    $v = $d[$k] ?? ['count' => 0, 'first' => $now, 'locked_until' => 0];
    if ($v['first'] < $now - FAIL_WINDOW) {
        $v = ['count' => 0, 'first' => $now, 'locked_until' => 0];
    }
    $v['count']++;
    if ($v['count'] >= MAX_FAILED) {
        $v['locked_until'] = $now + LOCK_SECONDS;
        $v['count'] = 0;
        $v['first'] = $now;
    }
    $d[$k] = $v;
    attempts_save($d);
}

function login_clear_failures(): void
{
    $d = attempts_load();
    unset($d[client_key()]);
    attempts_save($d);
}

/* ---------- Sessione autenticata ---------- */
function is_logged_in(): bool
{
    panel_session();
    if (empty($_SESSION['auth'])) {
        return false;
    }
    $now = time();
    if ($now - (int) ($_SESSION['last'] ?? 0) > IDLE_TIMEOUT || $now - (int) ($_SESSION['since'] ?? 0) > ABSOLUTE_TIMEOUT) {
        $_SESSION = [];
        return false;
    }
    $_SESSION['last'] = $now;
    return true;
}

function require_login(): void
{
    panel_headers();
    if (!is_logged_in()) {
        header('Location: /pannello-redazione/login.php');
        exit;
    }
}

function do_login(): void
{
    session_regenerate_id(true);
    $_SESSION = ['auth' => true, 'since' => time(), 'last' => time(), 'csrf' => bin2hex(random_bytes(32))];
}

function do_logout(): void
{
    panel_session();
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', ['expires' => time() - 3600, 'path' => $p['path'], 'secure' => $p['secure'], 'httponly' => true, 'samesite' => 'Lax']);
    }
    session_destroy();
}

/* ---------- CSRF ---------- */
function csrf_token(): string
{
    panel_session();
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return (string) $_SESSION['csrf'];
}

function csrf_field(): string
{
    return '<input type="hidden" name="csrf" value="' . e(csrf_token()) . '">';
}

function require_post_csrf(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        http_response_code(405);
        exit('Metodo non consentito.');
    }
    $sent = (string) ($_POST['csrf'] ?? '');
    if ($sent === '' || !hash_equals(csrf_token(), $sent)) {
        http_response_code(400);
        exit('Sessione scaduta o richiesta non valida. Torna indietro, ricarica la pagina e riprova.');
    }
}

/* ---------- Messaggi (flash) ---------- */
function flash_set(string $type, string $msg): void
{
    panel_session();
    $_SESSION['flash'] = ['type' => $type, 'msg' => $msg];
}

function flash_take(): ?array
{
    panel_session();
    $f = $_SESSION['flash'] ?? null;
    unset($_SESSION['flash']);
    return is_array($f) ? $f : null;
}

/* ---------- Layout del pannello ---------- */
function panel_start(string $title, bool $nav = true): void
{
    header('Content-Type: text/html; charset=UTF-8');
    echo '<!DOCTYPE html><html lang="it"><head><meta charset="utf-8">';
    echo shell_part('head');
    echo '<title>' . e($title) . ' — Redazione Blue Art</title>';
    echo '<meta name="robots" content="noindex, nofollow, noarchive"><meta name="googlebot" content="noindex, nofollow">';
    echo '<link rel="stylesheet" href="/pannello-redazione/pannello.css">';
    echo '</head><body class="pannello"><header class="pn-top"><div class="pn-wrap pn-top-in">';
    echo '<a href="/pannello-redazione/" class="pn-brand"><img src="/logo/logo-blueart-bianco.png" alt="BlueArt" height="34"><span>Redazione</span></a>';
    if ($nav) {
        echo '<nav class="pn-nav">'
            . '<a href="/pannello-redazione/">Eventi e articoli</a>'
            . '<a href="/pannello-redazione/password.php">Cambia password</a>'
            . '<a href="/" target="_blank" rel="noopener">Vedi il sito</a>'
            . '<form method="post" action="/pannello-redazione/logout.php">' . csrf_field() . '<button type="submit" class="pn-link">Esci</button></form>'
            . '</nav>';
    }
    echo '</div></header><main class="pn-wrap pn-main">';
    $f = flash_take();
    if ($f) {
        echo '<div class="pn-flash pn-flash-' . e($f['type']) . '" role="status">' . e($f['msg']) . '</div>';
    }
}

function panel_end(): void
{
    echo '</main></body></html>';
}
