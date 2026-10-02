<?php
declare(strict_types=1);
require __DIR__ . '/_auth.php';

panel_headers();
panel_session();

if (is_logged_in()) {
    header('Location: /pannello-redazione/');
    exit;
}

$cfg = admin_config();
$error = '';

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    // Il CSRF vale anche per il login (token di sessione anonima)
    $sent = (string) ($_POST['csrf'] ?? '');
    if ($sent === '' || !hash_equals(csrf_token(), $sent)) {
        $error = 'La pagina era scaduta. Riprova.';
    } elseif (login_locked_for() > 0) {
        $error = 'Troppi tentativi. Riprova tra ' . (int) ceil(login_locked_for() / 60) . ' minuti.';
    } elseif ($cfg === null) {
        $error = 'Il pannello non è ancora configurato (manca la password).';
    } else {
        $okUser = hash_equals((string) $cfg['user'], (string) ($_POST['utente'] ?? ''));
        $okPass = password_verify((string) ($_POST['password'] ?? ''), (string) $cfg['hash']);
        if ($okUser && $okPass) {
            login_clear_failures();
            do_login();
            if (password_needs_rehash((string) $cfg['hash'], PASSWORD_DEFAULT)) {
                save_admin_config((string) $cfg['user'], password_hash((string) $_POST['password'], PASSWORD_DEFAULT));
            }
            header('Location: /pannello-redazione/');
            exit;
        }
        login_register_failure();
        usleep(400000); // rallenta chi prova a indovinare
        $error = login_locked_for() > 0
            ? 'Troppi tentativi. Riprova tra ' . (int) ceil(login_locked_for() / 60) . ' minuti.'
            : 'Utente o password non corretti.';
    }
}

panel_start('Accesso', false);
?>
<div class="pn-login">
  <h1>Accesso alla redazione</h1>
  <p class="pn-help">Area riservata per modificare Eventi e articoli del blog.</p>
  <?php if ($cfg === null) : ?>
    <div class="pn-flash pn-flash-err">Il pannello non è ancora configurato: manca la password. Segui le istruzioni in <code>imposta-password.php</code>.</div>
  <?php endif; ?>
  <?php if ($error !== '') : ?><div class="pn-flash pn-flash-err" role="alert"><?= e($error) ?></div><?php endif; ?>
  <form method="post" autocomplete="off" class="pn-form">
    <?= csrf_field() ?>
    <label>Utente <input type="text" name="utente" required autocomplete="username" autofocus></label>
    <label>Password <input type="password" name="password" required autocomplete="current-password"></label>
    <button type="submit" class="pn-btn">Entra</button>
  </form>
</div>
<?php
panel_end();
