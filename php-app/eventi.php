<?php
/*
 * Calendario eventi pubblico, letto da data/events.json.
 * Stesso markup e stesse classi di app/eventi/page.tsx. Raggiunto tramite
 * .htaccess: /eventi/.
 */
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$events = events_all();
page_start('Eventi — Blue Art');
?>
<div class="container py-20 md:py-28">
  <p class="eyebrow">Calendario eventi</p>
  <h1 class="mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">Calendario eventi - programmazione passo passo</h1>

  <div class="mt-14 flex flex-col gap-8">
    <?php foreach ($events as $ev) : ?>
      <article class="card overflow-hidden grid gap-0 md:grid-cols-[280px_1fr]">
        <div class="aspect-[4/5] md:aspect-auto md:h-full overflow-hidden">
          <?= site_image((string) ($ev['image'] ?? ''), (string) $ev['title'], 'w-full h-full object-cover') ?>
        </div>
        <div class="p-6 md:p-8 flex flex-col justify-center">
          <p class="eyebrow"><?= e(date_long((string) $ev['date'])) ?><?= !empty($ev['time']) ? e(' · ore ' . $ev['time']) : '' ?></p>
          <h2 class="mt-2 text-2xl font-bold tracking-tight"><?= e($ev['title']) ?></h2>
          <?php if (!empty($ev['description'])) : ?><p class="mt-3 text-[var(--color-fg-muted)]"><?= e($ev['description']) ?></p><?php endif; ?>
          <?php if (!empty($ev['location'])) : ?><p class="mt-3 text-sm text-[var(--color-fg-muted)]"><?= e($ev['location']) ?></p><?php endif; ?>
          <?php if (!empty($ev['note'])) : ?><p class="mt-3 text-sm font-medium"><?= e($ev['note']) ?></p><?php endif; ?>
          <?php if (!empty($ev['patrocinio'])) : ?><p class="mt-1 text-sm text-[var(--color-fg-faint)]"><?= e($ev['patrocinio']) ?></p><?php endif; ?>
        </div>
      </article>
    <?php endforeach; ?>

    <?php if (!$events) : ?>
      <p class="text-[var(--color-fg-muted)]">Nessun evento in programma al momento.</p>
    <?php endif; ?>
  </div>
</div>
<?php
page_end();
