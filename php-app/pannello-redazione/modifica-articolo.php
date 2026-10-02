<?php
declare(strict_types=1);
require __DIR__ . '/_auth.php';
require __DIR__ . '/_upload.php';
require_login();

$id = isset($_GET['id']) ? (string) $_GET['id'] : '';
$all = store_read('blog');
$current = $id !== '' ? find_by_slug($all, $id) : null;
if ($id !== '' && $current === null) {
    http_response_code(404);
    panel_start('Articolo non trovato');
    echo '<h1>Articolo non trovato</h1><p><a href="/pannello-redazione/">← Torna all’elenco</a></p>';
    panel_end();
    exit;
}
$isNew = $current === null;
$team = site_team();
$services = site_services();

// valori da mostrare nel form
$v = [
    'titolo' => (string) ($current['title'] ?? ''),
    'data' => (string) ($current['date'] ?? date('Y-m-d')),
    'estratto' => (string) ($current['excerpt'] ?? ''),
    'testo' => (string) ($current['body'] ?? ''),
    'tipo' => (string) ($current['imageType'] ?? 'photo'),
    'argomenti' => implode(', ', (array) ($current['tags'] ?? [])),
    'firma' => (string) ($current['authorTeamSlug'] ?? ''),
    'servizio' => (string) ($current['relatedServiceSlug'] ?? ''),
];
$errors = [];

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    require_post_csrf();
    $v['titolo'] = trim((string) ($_POST['titolo'] ?? ''));
    $v['data'] = trim((string) ($_POST['data'] ?? ''));
    $v['estratto'] = trim((string) ($_POST['estratto'] ?? ''));
    $v['testo'] = str_replace("\r\n", "\n", trim((string) ($_POST['testo'] ?? '')));
    $v['tipo'] = ($_POST['tipo'] ?? 'photo') === 'infographic' ? 'infographic' : 'photo';
    $v['argomenti'] = trim((string) ($_POST['argomenti'] ?? ''));
    $v['firma'] = (string) ($_POST['firma'] ?? '');
    $v['servizio'] = (string) ($_POST['servizio'] ?? '');

    if ($v['titolo'] === '' || mb_strlen($v['titolo']) > 160) {
        $errors[] = 'Scrivi un titolo (massimo 160 caratteri).';
    }
    if (!valid_iso_date($v['data'])) {
        $errors[] = 'Scegli una data valida.';
    }
    if ($v['testo'] === '') {
        $errors[] = 'Scrivi il testo dell’articolo.';
    }
    if (mb_strlen($v['estratto']) > 400) {
        $errors[] = 'Il riassunto è troppo lungo (massimo 400 caratteri).';
    }
    if ($v['firma'] !== '' && !isset($team[$v['firma']])) {
        $errors[] = 'Firma non valida.';
    }
    if ($v['servizio'] !== '' && !isset($services[$v['servizio']])) {
        $errors[] = 'Servizio non valido.';
    }

    $up = handle_image_upload('immagine', 'blog');
    if ($up['error']) {
        $errors[] = $up['error'];
    }
    if ($isNew && $up['path'] === null && !$up['error']) {
        $errors[] = 'Aggiungi un’immagine per l’articolo.';
    }

    if (!$errors) {
        $tags = [];
        foreach (explode(',', $v['argomenti']) as $t) {
            $t = trim($t);
            if ($t !== '' && count($tags) < 5) {
                $tags[] = mb_substr($t, 0, 40);
            }
        }
        $oldImage = (string) ($current['image'] ?? '');
        $savedSlug = '';
        try {
            store_update('blog', function (array $items) use ($v, $tags, $up, $current, $isNew, $team, &$savedSlug) {
                $slug = $isNew ? unique_slug($items, slugify($v['titolo'])) : (string) $current['slug'];
                $savedSlug = $slug;
                $author = '';
                if ($v['firma'] !== '') {
                    $same = !$isNew && ($current['authorTeamSlug'] ?? '') === $v['firma'] && !empty($current['author']);
                    $author = $same ? (string) $current['author'] : $team[$v['firma']];
                }
                $post = [
                    'slug' => $slug,
                    'title' => $v['titolo'],
                    'date' => $v['data'],
                ];
                if ($author !== '') {
                    $post['author'] = $author;
                    $post['authorTeamSlug'] = $v['firma'];
                }
                $post['image'] = $up['path'] ?? (string) ($current['image'] ?? '');
                $post['imageType'] = $v['tipo'];
                $post['tags'] = $tags;
                if ($v['servizio'] !== '') {
                    $post['relatedServiceSlug'] = $v['servizio'];
                }
                $post['excerpt'] = $v['estratto'];
                $post['body'] = $v['testo'];
                if ($isNew) {
                    $items[] = $post;
                } else {
                    foreach ($items as $i => $it) {
                        if (($it['slug'] ?? null) === $slug) {
                            $items[$i] = $post;
                        }
                    }
                }
                return $items;
            });
            if ($up['path'] !== null && $oldImage !== '' && $oldImage !== $up['path']) {
                delete_upload($oldImage);
            }
            flash_set('ok', $isNew ? 'Articolo creato e pubblicato.' : 'Modifiche salvate.');
            header('Location: /pannello-redazione/modifica-articolo.php?id=' . rawurlencode($savedSlug));
            exit;
        } catch (Throwable $ex) {
            if ($up['path'] !== null) {
                delete_upload($up['path']);
            }
            $errors[] = 'Non sono riuscito a salvare. Riprova tra qualche istante.';
        }
    }
}

panel_start($isNew ? 'Nuovo articolo' : 'Modifica articolo');
?>
<p><a href="/pannello-redazione/#blog">← Torna all’elenco</a></p>
<h1><?= $isNew ? 'Nuovo articolo' : 'Modifica articolo' ?></h1>
<?php if (!$isNew) : ?>
  <p class="pn-help"><a href="/blog/<?= e($current['slug']) ?>/" target="_blank" rel="noopener">Vedi sul sito ↗</a> (si apre in una nuova scheda)</p>
<?php endif; ?>
<?php if ($errors) : ?>
  <div class="pn-flash pn-flash-err" role="alert"><strong>Controlla questi punti:</strong><ul><?php foreach ($errors as $er) : ?><li><?= e($er) ?></li><?php endforeach; ?></ul></div>
<?php endif; ?>

<form method="post" enctype="multipart/form-data" class="pn-form" novalidate>
  <?= csrf_field() ?>

  <label>Titolo
    <input type="text" name="titolo" value="<?= e($v['titolo']) ?>" maxlength="160" required>
  </label>

  <label>Data di pubblicazione
    <input type="date" name="data" value="<?= e($v['data']) ?>" required>
  </label>

  <label>Riassunto breve
    <span class="pn-hint">Due righe che compaiono nell’elenco del blog, sotto il titolo.</span>
    <textarea name="estratto" rows="3" maxlength="400"><?= e($v['estratto']) ?></textarea>
  </label>

  <div class="pn-field">
    <label for="testo">Testo dell’articolo</label>
    <span class="pn-hint">Scrivi normalmente. Per iniziare un nuovo paragrafo lascia una riga vuota. Per un titoletto dentro l’articolo premi il bottone qui sotto.</span>
    <div class="pn-toolbar"><button type="button" class="pn-btn pn-btn-small" data-insert-heading>+ Titoletto</button></div>
    <div class="pn-editor">
      <textarea id="testo" name="testo" rows="16" data-editor><?= e($v['testo']) ?></textarea>
      <div class="pn-preview" data-preview aria-live="polite"><p class="pn-hint">L’anteprima del testo appare qui.</p></div>
    </div>
  </div>

  <div class="pn-field">
    <label for="immagine">Immagine principale<?= $isNew ? '' : ' (lascia vuoto per tenere quella attuale)' ?></label>
    <?php if (!$isNew && !empty($current['image'])) : ?>
      <div class="pn-current-img"><?= site_image((string) $current['image'], 'Immagine attuale', '') ?><span class="pn-hint">Immagine attuale</span></div>
    <?php endif; ?>
    <input type="file" id="immagine" name="immagine" accept="image/jpeg,image/png,image/webp" data-image-input>
    <img data-image-preview alt="" class="pn-newimg" hidden>
    <span class="pn-hint">Foto JPG, PNG o WebP, al massimo 8 MB. Viene ridimensionata in automatico.</span>
  </div>

  <fieldset class="pn-field">
    <legend>Che tipo di immagine è?</legend>
    <label class="pn-radio"><input type="radio" name="tipo" value="photo" <?= $v['tipo'] === 'infographic' ? '' : 'checked' ?>> <span><strong>Una foto</strong> — viene mostrata ritagliata in alto all’articolo, ingrandibile con un click.</span></label>
    <label class="pn-radio"><input type="radio" name="tipo" value="infographic" <?= $v['tipo'] === 'infographic' ? 'checked' : '' ?>> <span><strong>Un’infografica o uno schema</strong> — viene mostrata intera, senza tagli, per restare leggibile.</span></label>
  </fieldset>

  <label>Argomenti
    <span class="pn-hint">Parole chiave separate da virgola, ad esempio: Storia della musica, Tecnologia (massimo 5).</span>
    <input type="text" name="argomenti" value="<?= e($v['argomenti']) ?>">
  </label>

  <label>Firma dell’articolo
    <span class="pn-hint">Se scelto, il nome diventa un link alla scheda della persona in “Chi siamo”.</span>
    <select name="firma">
      <option value="">Nessuna firma</option>
      <?php foreach ($team as $k => $name) : ?><option value="<?= e($k) ?>" <?= $v['firma'] === $k ? 'selected' : '' ?>><?= e($name) ?></option><?php endforeach; ?>
    </select>
  </label>

  <label>Servizio da proporre a fine articolo
    <span class="pn-hint">Mostra un riquadro “Ti potrebbe interessare” con il servizio scelto. Per temi delicati (ad esempio un ricordo) lascia “Nessuno”.</span>
    <select name="servizio">
      <option value="">Nessuno</option>
      <?php foreach ($services as $k => $s) : ?><option value="<?= e($k) ?>" <?= $v['servizio'] === $k ? 'selected' : '' ?>><?= e($s['title']) ?></option><?php endforeach; ?>
    </select>
  </label>

  <div class="pn-actions">
    <button type="submit" class="pn-btn">Salva articolo</button>
    <a href="/pannello-redazione/#blog">Annulla</a>
  </div>
</form>
<script src="/pannello-redazione/editor.js" defer></script>
<?php
panel_end();
