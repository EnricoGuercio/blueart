<?php
declare(strict_types=1);
require __DIR__ . '/_auth.php';
require __DIR__ . '/_upload.php';
require_login();

$tipo = (string) ($_GET['tipo'] ?? $_POST['tipo'] ?? '');
$id = (string) ($_GET['id'] ?? $_POST['id'] ?? '');
if (!in_array($tipo, ['evento', 'articolo'], true)) {
    http_response_code(400);
    exit('Richiesta non valida.');
}
$store = $tipo === 'evento' ? 'events' : 'blog';
$item = find_by_slug(store_read($store), $id);
if ($item === null) {
    flash_set('err', 'Contenuto non trovato (forse già eliminato).');
    header('Location: /pannello-redazione/');
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    require_post_csrf();
    try {
        store_update($store, function (array $items) use ($id) {
            return array_values(array_filter($items, fn($it) => ($it['slug'] ?? null) !== $id));
        });
        if (!empty($item['image'])) {
            delete_upload((string) $item['image']);
        }
        flash_set('ok', ($tipo === 'evento' ? 'Evento eliminato.' : 'Articolo eliminato.'));
    } catch (Throwable $ex) {
        flash_set('err', 'Non sono riuscito a eliminare. Riprova.');
    }
    header('Location: /pannello-redazione/');
    exit;
}

panel_start('Elimina');
?>
<h1>Eliminare <?= $tipo === 'evento' ? 'questo evento' : 'questo articolo' ?>?</h1>
<div class="pn-confirm">
  <p><strong><?= e($item['title']) ?></strong></p>
  <p>Sparirà subito dal sito e <strong>non si può annullare</strong>.</p>
  <form method="post" class="pn-actions">
    <?= csrf_field() ?>
    <input type="hidden" name="tipo" value="<?= e($tipo) ?>">
    <input type="hidden" name="id" value="<?= e($id) ?>">
    <button type="submit" class="pn-btn pn-btn-danger">Sì, elimina</button>
    <a href="/pannello-redazione/" class="pn-btn pn-btn-ghost">No, torna indietro</a>
  </form>
</div>
<?php
panel_end();
