<?php
declare(strict_types=1);
require __DIR__ . '/_auth.php';
require __DIR__ . '/_upload.php';
require_login();

$id = isset($_GET['id']) ? (string) $_GET['id'] : '';
$all = store_read('events');
$current = $id !== '' ? find_by_slug($all, $id) : null;
if ($id !== '' && $current === null) {
    http_response_code(404);
    panel_start('Evento non trovato');
    echo '<h1>Evento non trovato</h1><p><a href="/pannello-redazione/">← Torna all’elenco</a></p>';
    panel_end();
    exit;
}
$isNew = $current === null;

$v = [
    'titolo' => (string) ($current['title'] ?? ''),
    'data' => (string) ($current['date'] ?? ''),
    'ora' => (string) ($current['time'] ?? ''),
    'descrizione' => (string) ($current['description'] ?? ''),
    'luogo' => (string) ($current['location'] ?? ''),
    'note' => (string) ($current['note'] ?? ''),
    'patrocinio' => (string) ($current['patrocinio'] ?? ''),
];
$errors = [];

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    require_post_csrf();
    foreach (['titolo', 'data', 'ora', 'descrizione', 'luogo', 'note', 'patrocinio'] as $k) {
        $v[$k] = trim((string) ($_POST[$k] ?? ''));
    }
    if ($v['titolo'] === '' || mb_strlen($v['titolo']) > 160) {
        $errors[] = 'Scrivi il nome dell’evento (massimo 160 caratteri).';
    }
    if (!valid_iso_date($v['data'])) {
        $errors[] = 'Scegli una data valida.';
    }
    if ($v['ora'] !== '' && !preg_match('/^([01]\d|2[0-3]):[0-5]\d$/', $v['ora'])) {
        $errors[] = 'L’orario non è valido.';
    }
    foreach (['descrizione' => 400, 'luogo' => 200, 'note' => 300, 'patrocinio' => 300] as $k => $max) {
        if (mb_strlen($v[$k]) > $max) {
            $errors[] = "Il campo “$k” è troppo lungo (massimo $max caratteri).";
        }
    }
    $up = handle_image_upload('immagine', 'eventi');
    if ($up['error']) {
        $errors[] = $up['error'];
    }
    if ($isNew && $up['path'] === null && !$up['error']) {
        $errors[] = 'Aggiungi la locandina o una foto dell’evento.';
    }

    if (!$errors) {
        $oldImage = (string) ($current['image'] ?? '');
        $savedSlug = '';
        try {
            store_update('events', function (array $items) use ($v, $up, $current, $isNew, &$savedSlug) {
                $slug = $isNew ? unique_slug($items, slugify($v['titolo'])) : (string) $current['slug'];
                $savedSlug = $slug;
                $ev = [
                    'slug' => $slug,
                    'title' => $v['titolo'],
                    'description' => $v['descrizione'],
                    'date' => $v['data'],
                    'time' => $v['ora'],
                    'location' => $v['luogo'],
                    'note' => $v['note'],
                    'patrocinio' => $v['patrocinio'],
                    'image' => $up['path'] ?? (string) ($current['image'] ?? ''),
                ];
                if ($isNew) {
                    $items[] = $ev;
                } else {
                    foreach ($items as $i => $it) {
                        if (($it['slug'] ?? null) === $slug) {
                            $items[$i] = $ev;
                        }
                    }
                }
                return $items;
            });
            if ($up['path'] !== null && $oldImage !== '' && $oldImage !== $up['path']) {
                delete_upload($oldImage);
            }
            flash_set('ok', $isNew ? 'Evento creato e pubblicato.' : 'Modifiche salvate.');
            header('Location: /pannello-redazione/modifica-evento.php?id=' . rawurlencode($savedSlug));
            exit;
        } catch (Throwable $ex) {
            if ($up['path'] !== null) {
                delete_upload($up['path']);
            }
            $errors[] = 'Non sono riuscito a salvare. Riprova tra qualche istante.';
        }
    }
}

panel_start($isNew ? 'Nuovo evento' : 'Modifica evento');
?>
<p><a href="/pannello-redazione/#eventi">← Torna all’elenco</a></p>
<h1><?= $isNew ? 'Nuovo evento' : 'Modifica evento' ?></h1>
<?php if (!$isNew) : ?>
  <p class="pn-help"><a href="/eventi/" target="_blank" rel="noopener">Vedi sul sito ↗</a> (si apre in una nuova scheda)</p>
<?php endif; ?>
<?php if ($errors) : ?>
  <div class="pn-flash pn-flash-err" role="alert"><strong>Controlla questi punti:</strong><ul><?php foreach ($errors as $er) : ?><li><?= e($er) ?></li><?php endforeach; ?></ul></div>
<?php endif; ?>

<form method="post" enctype="multipart/form-data" class="pn-form" novalidate>
  <?= csrf_field() ?>
  <label>Nome dell’evento
    <input type="text" name="titolo" value="<?= e($v['titolo']) ?>" maxlength="160" required>
  </label>
  <div class="pn-row">
    <label>Data
      <input type="date" name="data" value="<?= e($v['data']) ?>" required>
    </label>
    <label>Ora di inizio <span class="pn-hint">(facoltativa)</span>
      <input type="time" name="ora" value="<?= e($v['ora']) ?>">
    </label>
  </div>
  <label>Descrizione breve
    <span class="pn-hint">Ad esempio: “Concerto in piazza a Loreto.”</span>
    <textarea name="descrizione" rows="3" maxlength="400"><?= e($v['descrizione']) ?></textarea>
  </label>
  <label>Luogo
    <input type="text" name="luogo" value="<?= e($v['luogo']) ?>" maxlength="200">
  </label>
  <label>Informazioni utili
    <span class="pn-hint">Ad esempio: “Ingresso libero, posti a sedere limitati”.</span>
    <input type="text" name="note" value="<?= e($v['note']) ?>" maxlength="300">
  </label>
  <label>Patrocinio o organizzatori <span class="pn-hint">(facoltativo)</span>
    <input type="text" name="patrocinio" value="<?= e($v['patrocinio']) ?>" maxlength="300">
  </label>

  <div class="pn-field">
    <label for="immagine">Locandina o foto<?= $isNew ? '' : ' (lascia vuoto per tenere quella attuale)' ?></label>
    <?php if (!$isNew && !empty($current['image'])) : ?>
      <div class="pn-current-img"><?= site_image((string) $current['image'], 'Immagine attuale', '') ?><span class="pn-hint">Immagine attuale</span></div>
    <?php endif; ?>
    <input type="file" id="immagine" name="immagine" accept="image/jpeg,image/png,image/webp" data-image-input>
    <img data-image-preview alt="" class="pn-newimg" hidden>
    <span class="pn-hint">JPG, PNG o WebP, al massimo 8 MB. Viene ridimensionata in automatico.</span>
  </div>

  <div class="pn-actions">
    <button type="submit" class="pn-btn">Salva evento</button>
    <a href="/pannello-redazione/#eventi">Annulla</a>
  </div>
</form>
<script src="/pannello-redazione/editor.js" defer></script>
<?php
panel_end();
