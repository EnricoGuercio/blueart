<?php
/*
 * Nucleo condiviso di pagine pubbliche Eventi/Blog e pannello di redazione.
 * Solo PHP "puro" e funzioni di base (nessuna libreria esterna). Pensato per
 * un hosting condiviso: richiede PHP >= 7.4 (usa str_contains/str_starts_with
 * con polyfill qui sotto) e, opzionali, GD/fileinfo per le immagini.
 */
declare(strict_types=1);

if (!function_exists('str_contains')) {
    function str_contains(string $h, string $n): bool { return $n === '' || strpos($h, $n) !== false; }
}
if (!function_exists('str_starts_with')) {
    function str_starts_with(string $h, string $n): bool { return strncmp($h, $n, strlen($n)) === 0; }
}

define('SITE_ROOT', dirname(__DIR__));
define('DATA_DIR', SITE_ROOT . '/data');
define('SEED_DIR', SITE_ROOT . '/seed');
define('UPLOAD_DIR', SITE_ROOT . '/uploads');

date_default_timezone_set('Europe/Rome');

/* ---------- Escape (sempre, per ogni contenuto che arriva dai JSON) ---------- */
function e($s): string
{
    return htmlspecialchars((string) $s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/* ---------- Archivio JSON ---------- */
// I dati modificati dal pannello stanno in data/; finché non c'è una modifica
// si legge il contenuto iniziale in seed/ (che un nuovo deploy può
// tranquillamente sovrascrivere, a differenza di data/).
function store_read(string $name): array
{
    foreach ([DATA_DIR . "/$name.json", SEED_DIR . "/$name.json"] as $file) {
        if (is_file($file)) {
            $raw = @file_get_contents($file);
            $data = is_string($raw) ? json_decode($raw, true) : null;
            if (is_array($data)) {
                return array_values($data);
            }
        }
    }
    return [];
}

// Lettura-modifica-scrittura con blocco esclusivo, scrittura atomica e una
// copia di sicurezza (.bak) della versione precedente.
function store_update(string $name, callable $fn): void
{
    if (!is_dir(DATA_DIR) && !@mkdir(DATA_DIR, 0755, true)) {
        throw new RuntimeException('Cartella dati non scrivibile.');
    }
    $lock = fopen(DATA_DIR . '/.lock', 'c');
    if (!$lock || !flock($lock, LOCK_EX)) {
        throw new RuntimeException('Impossibile bloccare i dati.');
    }
    try {
        $items = $fn(store_read($name));
        $json = json_encode(array_values($items), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
        if ($json === false) {
            throw new RuntimeException('Dati non salvabili.');
        }
        $file = DATA_DIR . "/$name.json";
        $tmp = $file . '.tmp' . bin2hex(random_bytes(4));
        if (file_put_contents($tmp, $json . "\n") === false) {
            throw new RuntimeException('Scrittura non riuscita.');
        }
        if (is_file($file)) {
            @copy($file, $file . '.bak');
        }
        if (!@rename($tmp, $file)) {
            @unlink($tmp);
            throw new RuntimeException('Salvataggio non riuscito.');
        }
    } finally {
        flock($lock, LOCK_UN);
        fclose($lock);
    }
}

function blog_all(): array
{
    $posts = store_read('blog');
    usort($posts, fn($a, $b) => strcmp((string) ($b['date'] ?? ''), (string) ($a['date'] ?? '')));
    return $posts;
}

function events_all(): array
{
    $events = store_read('events');
    usort($events, fn($a, $b) => strcmp((string) ($a['date'] ?? ''), (string) ($b['date'] ?? '')));
    return $events;
}

function find_by_slug(array $items, string $slug): ?array
{
    foreach ($items as $it) {
        if (($it['slug'] ?? null) === $slug) {
            return $it;
        }
    }
    return null;
}

/* ---------- Slug ---------- */
function slugify(string $text): string
{
    $text = mb_strtolower($text, 'UTF-8');
    $text = strtr($text, [
        'à' => 'a', 'á' => 'a', 'â' => 'a', 'ä' => 'a', 'è' => 'e', 'é' => 'e', 'ê' => 'e', 'ë' => 'e',
        'ì' => 'i', 'í' => 'i', 'î' => 'i', 'ï' => 'i', 'ò' => 'o', 'ó' => 'o', 'ô' => 'o', 'ö' => 'o',
        'ù' => 'u', 'ú' => 'u', 'û' => 'u', 'ü' => 'u', 'ç' => 'c', 'ñ' => 'n',
    ]);
    $text = preg_replace('/[^a-z0-9]+/', '-', $text) ?? '';
    $text = trim($text, '-');
    return substr($text !== '' ? $text : 'senza-titolo', 0, 70);
}

function unique_slug(array $items, string $base, ?string $except = null): string
{
    $taken = [];
    foreach ($items as $it) {
        if (($it['slug'] ?? null) !== $except) {
            $taken[$it['slug'] ?? ''] = true;
        }
    }
    $slug = $base;
    for ($i = 2; isset($taken[$slug]); $i++) {
        $slug = $base . '-' . $i;
    }
    return $slug;
}

/* ---------- Date ---------- */
const MESI_BREVI = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
const MESI_LUNGHI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
const GIORNI = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

function valid_iso_date(string $iso): bool
{
    if (!preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $iso, $m)) {
        return false;
    }
    return checkdate((int) $m[2], (int) $m[3], (int) $m[1]);
}

function date_short(string $iso): string // 2026-08-18 -> 18 ago 2026
{
    if (!valid_iso_date($iso)) {
        return '';
    }
    [$y, $m, $d] = array_map('intval', explode('-', $iso));
    return $d . ' ' . MESI_BREVI[$m - 1] . ' ' . $y;
}

function date_long(string $iso): string // 2026-08-21 -> Venerdì 21 agosto 2026
{
    if (!valid_iso_date($iso)) {
        return '';
    }
    [$y, $m, $d] = array_map('intval', explode('-', $iso));
    $dow = (int) gmdate('w', gmmktime(0, 0, 0, $m, $d, $y));
    return GIORNI[$dow] . ' ' . $d . ' ' . MESI_LUNGHI[$m - 1] . ' ' . $y;
}

function reading_minutes(string $text): int
{
    $words = preg_split('/\s+/u', trim($text), -1, PREG_SPLIT_NO_EMPTY);
    return max(1, (int) ceil(count($words ?: []) / 200));
}

/* ---------- Riferimenti fissi del sito ----------
 * Copia minima di team/servizi di lib/data.ts, per la firma collegata a Chi
 * Siamo e per il box "Ti potrebbe interessare". Se cambiano lì, vanno
 * aggiornati anche qui (sono 5 nomi e 4 servizi). */
function site_team(): array
{
    return ['matteo' => 'Matteo', 'emanuele' => 'Emanuele', 'michele' => 'Michele', 'jacopo' => 'Jacopo', 'federico' => 'Federico'];
}

function site_services(): array
{
    return [
        'service-audio-luci-video' => ['title' => 'Service Audio Luci Video', 'text' => "Offriamo servizi di audio, video e luci per eventi pubblici e aziendali: conferenze, concerti ed eventi privati. Ci occupiamo di amplificazione audio per convegni e assemblee aziendali, e di streaming video e trasmissioni in diretta per chi segue l'evento anche a distanza."],
        'consulenza-per-artisti' => ['title' => 'Consulenza per artisti', 'text' => "Affianchiamo gli artisti nella costruzione della propria immagine, in collaborazione con vocal coach e studi di registrazione. Curiamo la grafica dei dischi e realizziamo siti web pensati per le esigenze di ciascun artista, per promuovere la musica e restare in contatto con il pubblico. Grazie alla nostra rete di contatti, aiutiamo l'artista a valutare il percorso di promozione più adatto."],
        'promozione-artisti-enti-locali' => ['title' => 'Promozione con Artisti per enti locali', 'text' => "Organizziamo eventi per pubbliche amministrazioni e aziende, comprese le feste di paese che coinvolgono la comunità locale. Ci occupiamo della pianificazione e realizzazione dell'evento, lavorando a stretto contatto con le pubbliche amministrazioni per sviluppare contenuti artistici che valorizzino il patrimonio culturale e naturale del territorio. Disponibilità di partenariato per bandi regionali e FNSV."],
        'promozione-artisti-privati-aziende' => ['title' => 'Promozione con Artisti per privati e aziende', 'text' => "Per le aziende, organizziamo eventi pensati per promuovere il brand e creare occasioni di interazione diretta con il pubblico, in cui presentare prodotti e servizi. Adattiamo ogni evento alle esigenze specifiche del cliente."],
    ];
}

/* ---------- Immagini ----------
 * "image" può essere: uno slug del sito ("blog-guccini" => /images/blog-guccini.*)
 * oppure un percorso caricato dal pannello ("uploads/blog/xyz.jpg"). */
function image_urls(string $image): array
{
    if (str_contains($image, '/')) {
        $rel = ltrim($image, '/');
        // solo dentro uploads/, mai percorsi arbitrari
        if (!str_starts_with($rel, 'uploads/') || str_contains($rel, '..')) {
            return ['', null];
        }
        $webpRel = preg_replace('/\.(jpe?g|png)$/i', '.webp', $rel);
        $hasWebp = $webpRel !== $rel && is_file(SITE_ROOT . '/' . $webpRel);
        return ['/' . $rel, $hasWebp ? '/' . $webpRel : null];
    }
    $slug = preg_replace('/[^a-z0-9_-]/i', '', $image);
    return ['/images/' . $slug . '.jpg', '/images/' . $slug . '.webp'];
}

function site_image(string $image, string $alt, string $class, string $loading = 'lazy'): string
{
    [$src, $webp] = image_urls($image);
    if ($src === '') {
        return '';
    }
    $h = '<picture>';
    if ($webp) {
        $h .= '<source srcset="' . e($webp) . '" type="image/webp">';
    }
    return $h . '<img src="' . e($src) . '" alt="' . e($alt) . '" loading="' . e($loading) . '" decoding="async" class="' . e($class) . '"></picture>';
}

/* ---------- Corpo articolo ---------- (stesso formato di RichText.tsx) */
function render_body(string $body): string
{
    $blocks = preg_split("/\r?\n\r?\n/", $body) ?: [];
    $html = '<div class="space-y-5 leading-relaxed text-[var(--color-fg-muted)]">';
    foreach ($blocks as $block) {
        $block = trim($block);
        if ($block === '') {
            continue;
        }
        if (str_starts_with($block, '### ')) {
            $html .= '<h3 class="pt-2 text-xl font-semibold text-[var(--color-fg)]">' . e(substr($block, 4)) . '</h3>';
        } else {
            $html .= '<p>' . e($block) . '</p>';
        }
    }
    return $html . '</div>';
}

/* ---------- Guscio del sito (header/footer/CSS generati da Next) ---------- */
function shell_part(string $name): string
{
    $f = SITE_ROOT . '/inc/shell-' . $name . '.html';
    return is_file($f) ? (string) file_get_contents($f) : '';
}

function page_start(string $title, string $description = '', int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: text/html; charset=UTF-8');
    echo '<!DOCTYPE html><html lang="it"><head><meta charset="utf-8">';
    echo shell_part('head');
    echo '<title>' . e($title) . '</title>';
    if ($description !== '') {
        echo '<meta name="description" content="' . e($description) . '">';
    }
    echo '<meta name="robots" content="noindex, nofollow, nocache"><meta name="googlebot" content="noindex, nofollow">';
    echo '</head><body>' . shell_part('header') . '<main>';
}

function page_end(): void
{
    echo '</main>' . shell_part('footer');
    echo '<script src="/js/site-php.js" defer></script></body></html>';
}

function reading_time_label(string $body): string
{
    return reading_minutes($body) . ' min di lettura';
}
