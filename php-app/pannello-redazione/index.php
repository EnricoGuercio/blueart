<?php
declare(strict_types=1);
require __DIR__ . '/_auth.php';
require_login();

$events = events_all();
$posts = blog_all();

panel_start('Eventi e articoli');
?>
<h1>Eventi e articoli</h1>
<p class="pn-help">Qui vedi i contenuti come li vedranno i visitatori. Clicca su uno per modificarlo, oppure aggiungine uno nuovo.</p>

<section id="eventi" class="pn-section">
  <div class="pn-section-head">
    <h2>Eventi</h2>
    <a href="modifica-evento.php" class="pn-btn">+ Nuovo evento</a>
  </div>
  <?php if (!$events) : ?><p class="pn-help">Non ci sono ancora eventi.</p><?php endif; ?>
  <div class="pn-list">
    <?php foreach ($events as $ev) : ?>
      <div class="pn-item">
        <a href="modifica-evento.php?id=<?= e(rawurlencode((string) $ev['slug'])) ?>" class="card overflow-hidden grid gap-0 md:grid-cols-[200px_1fr]">
          <div class="aspect-[4/5] md:aspect-auto md:h-full overflow-hidden">
            <?= site_image((string) ($ev['image'] ?? ''), (string) $ev['title'], 'w-full h-full object-cover') ?>
          </div>
          <div class="p-6 flex flex-col justify-center">
            <p class="eyebrow"><?= e(date_long((string) $ev['date'])) ?><?= !empty($ev['time']) ? e(' · ore ' . $ev['time']) : '' ?></p>
            <h3 class="mt-2 text-xl font-bold tracking-tight"><?= e($ev['title']) ?></h3>
            <?php if (!empty($ev['description'])) : ?><p class="mt-2 text-sm text-[var(--color-fg-muted)]"><?= e($ev['description']) ?></p><?php endif; ?>
          </div>
        </a>
        <div class="pn-item-actions">
          <a href="modifica-evento.php?id=<?= e(rawurlencode((string) $ev['slug'])) ?>">Modifica</a>
          <a href="/eventi/" target="_blank" rel="noopener">Vedi sul sito</a>
          <a href="elimina.php?tipo=evento&amp;id=<?= e(rawurlencode((string) $ev['slug'])) ?>" class="pn-danger">Elimina</a>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
</section>

<section id="blog" class="pn-section">
  <div class="pn-section-head">
    <h2>Articoli del blog</h2>
    <a href="modifica-articolo.php" class="pn-btn">+ Nuovo articolo</a>
  </div>
  <?php if (!$posts) : ?><p class="pn-help">Non ci sono ancora articoli.</p><?php endif; ?>
  <div class="pn-list">
    <?php foreach ($posts as $post) : ?>
      <div class="pn-item">
        <a href="modifica-articolo.php?id=<?= e(rawurlencode((string) $post['slug'])) ?>" class="card overflow-hidden grid gap-0 md:grid-cols-[200px_1fr] group">
          <div class="aspect-[4/3] md:aspect-auto md:h-full overflow-hidden bg-[var(--color-bg-raised)]">
            <?= site_image((string) ($post['image'] ?? ''), (string) $post['title'], 'w-full h-full object-cover') ?>
          </div>
          <div class="p-6">
            <p class="text-xs text-[var(--color-fg-faint)]"><?= e(date_short((string) $post['date'])) ?><?= !empty($post['author']) ? e(' · di ' . $post['author']) : '' ?></p>
            <h3 class="mt-2 text-lg font-semibold"><?= e($post['title']) ?></h3>
            <p class="mt-2 text-sm text-[var(--color-fg-muted)] leading-relaxed"><?= e($post['excerpt'] ?? '') ?></p>
          </div>
        </a>
        <div class="pn-item-actions">
          <a href="modifica-articolo.php?id=<?= e(rawurlencode((string) $post['slug'])) ?>">Modifica</a>
          <a href="/blog/<?= e($post['slug']) ?>/" target="_blank" rel="noopener">Vedi sul sito</a>
          <a href="elimina.php?tipo=articolo&amp;id=<?= e(rawurlencode((string) $post['slug'])) ?>" class="pn-danger">Elimina</a>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
</section>
<?php
panel_end();
