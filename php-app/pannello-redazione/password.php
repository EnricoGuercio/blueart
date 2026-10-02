<?php
declare(strict_types=1);
require __DIR__ . '/_auth.php';
require_login();

$cfg = admin_config();
$errors = [];
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    require_post_csrf();
    $old = (string) ($_POST['attuale'] ?? '');
    $new = (string) ($_POST['nuova'] ?? '');
    $rep = (string) ($_POST['ripeti'] ?? '');
    if ($cfg === null || !password_verify($old, (string) $cfg['hash'])) {
        usleep(400000);
        $errors[] = 'La password attuale non è corretta.';
    }
    if (mb_strlen($new) < 10) {
        $errors[] = 'La nuova password deve avere almeno 10 caratteri.';
    }
    if ($new !== $rep) {
        $errors[] = 'Le due password nuove non coincidono.';
    }
    if (!$errors) {
        try {
            save_admin_config((string) $cfg['user'], password_hash($new, PASSWORD_DEFAULT));
            session_regenerate_id(true);
            flash_set('ok', 'Password cambiata.');
            header('Location: /pannello-redazione/');
            exit;
        } catch (Throwable $ex) {
            $errors[] = 'Non sono riuscito a salvare la nuova password.';
        }
    }
}

panel_start('Cambia password');
?>
<h1>Cambia password</h1>
<?php if ($errors) : ?>
  <div class="pn-flash pn-flash-err" role="alert"><ul><?php foreach ($errors as $er) : ?><li><?= e($er) ?></li><?php endforeach; ?></ul></div>
<?php endif; ?>
<form method="post" class="pn-form pn-narrow" autocomplete="off">
  <?= csrf_field() ?>
  <label>Password attuale <input type="password" name="attuale" required autocomplete="current-password"></label>
  <label>Nuova password <span class="pn-hint">Almeno 10 caratteri.</span> <input type="password" name="nuova" required autocomplete="new-password"></label>
  <label>Ripeti la nuova password <input type="password" name="ripeti" required autocomplete="new-password"></label>
  <div class="pn-actions"><button type="submit" class="pn-btn">Salva la nuova password</button></div>
</form>
<?php
panel_end();
