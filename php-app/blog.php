<?php
/*
 * Blog pubblico (elenco + dettaglio), letto da data/blog.json.
 * Stesso markup e stesse classi di app/blog/page.tsx e app/blog/[slug]/page.tsx.
 * Raggiunto tramite .htaccess: /blog/ e /blog/<slug>/.
 */
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$slug = isset($_GET['slug']) ? (string) $_GET['slug'] : '';
$posts = blog_all();

if ($slug === '') {
    page_start('Blog — Blue Art');
    ?>
    <div class="container py-20 md:py-28">
      <p class="eyebrow">Il blog di Blue Art</p>
      <h1 class="mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">Musica, arte e spettacolo</h1>
      <p class="mt-5 max-w-2xl text-[var(--color-fg-muted)] leading-relaxed">
        Entra nel mondo vibrante di Blue Art. Qui condividiamo la nostra passione per la musica, l’arte e lo spettacolo, offrendo approfondimenti, storie e riflessioni.
      </p>
      <div class="mt-14 flex flex-col gap-8">
        <?php foreach ($posts as $post) : ?>
          <a href="/blog/<?= e($post['slug']) ?>/" class="card overflow-hidden grid gap-0 md:grid-cols-[240px_1fr] group">
            <div class="aspect-[4/3] md:aspect-auto md:h-full overflow-hidden bg-[var(--color-bg-raised)]">
              <?= site_image((string) ($post['image'] ?? ''), (string) $post['title'], 'w-full h-full object-cover') ?>
            </div>
            <div class="p-6 md:p-8">
              <p class="text-xs text-[var(--color-fg-faint)]">
                <?= e(date_short((string) $post['date'])) ?><?= !empty($post['author']) ? e(' · di ' . $post['author']) : '' ?>
              </p>
              <h2 class="mt-2 text-xl font-semibold group-hover:text-[var(--color-accent)] transition-colors"><?= e($post['title']) ?></h2>
              <p class="mt-3 text-sm text-[var(--color-fg-muted)] leading-relaxed"><?= e($post['excerpt'] ?? '') ?></p>
              <span class="mt-4 inline-block text-sm font-semibold text-[var(--color-accent)]">Leggi di più »</span>
            </div>
          </a>
        <?php endforeach; ?>
        <?php if (!$posts) : ?>
          <p class="text-[var(--color-fg-muted)]">Nessun articolo pubblicato al momento.</p>
        <?php endif; ?>
      </div>
    </div>
    <?php
    page_end();
    exit;
}

$post = find_by_slug($posts, $slug);
if ($post === null) {
    page_start('Articolo non trovato — Blue Art', '', 404);
    ?>
    <div class="container py-20 md:py-28 max-w-3xl">
      <a href="/blog/" class="text-sm text-[var(--color-accent)] link-underline">← Torna al blog</a>
      <h1 class="mt-6 text-3xl md:text-4xl font-bold tracking-tight">Articolo non trovato</h1>
      <p class="mt-4 text-[var(--color-fg-muted)]">L’articolo che cerchi non esiste o è stato rimosso.</p>
    </div>
    <?php
    page_end();
    exit;
}

$team = site_team();
$services = site_services();
$authorKey = (string) ($post['authorTeamSlug'] ?? '');
$authorMember = ($authorKey !== '' && isset($team[$authorKey])) ? $team[$authorKey] : null;
$relatedKey = (string) ($post['relatedServiceSlug'] ?? '');
$related = ($relatedKey !== '' && isset($services[$relatedKey])) ? $services[$relatedKey] : null;
$isInfographic = ($post['imageType'] ?? 'photo') === 'infographic';
$title = (string) $post['title'];

page_start($title . ' — Blue Art', (string) ($post['excerpt'] ?? ''));
?>
<article class="container py-20 md:py-28 max-w-3xl">
  <a href="/blog/" class="text-sm text-[var(--color-accent)] link-underline">← Torna al blog</a>

  <div class="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[var(--color-fg-faint)]">
    <span><?= e(date_short((string) $post['date'])) ?></span>
    <span aria-hidden="true">·</span>
    <span><?= e(reading_time_label((string) ($post['body'] ?? ''))) ?></span>
    <?php if (!$authorMember && !empty($post['author'])) : ?>
      <span aria-hidden="true">·</span>
      <span>di <?= e($post['author']) ?></span>
    <?php endif; ?>
  </div>

  <h1 class="mt-2 text-3xl md:text-4xl font-bold tracking-tight"><?= e($title) ?></h1>

  <?php if (!empty($post['tags']) && is_array($post['tags'])) : ?>
    <ul class="mt-4 flex flex-wrap gap-2" aria-label="Argomenti">
      <?php foreach ($post['tags'] as $tag) : ?>
        <li class="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-fg-muted)]"><?= e($tag) ?></li>
      <?php endforeach; ?>
    </ul>
  <?php endif; ?>

  <?php if ($authorMember) : ?>
    <a href="/chi-siamo/#<?= e($authorKey) ?>" class="mt-5 inline-flex items-center gap-2.5 group">
      <span class="w-8 h-8 rounded-full overflow-hidden border border-[var(--color-border)] shrink-0">
        <?= site_image('team-' . $authorKey, $authorMember, 'w-full h-full object-cover') ?>
      </span>
      <span class="text-sm text-[var(--color-fg-muted)]">
        di <span class="font-medium text-[var(--color-fg)] group-hover:text-[var(--color-accent)] link-underline"><?= e($post['author'] ?? $authorMember) ?></span>
      </span>
    </a>
  <?php endif; ?>

  <?php if (!empty($post['image'])) : ?>
    <div class="mt-8">
      <button type="button" data-lightbox-open class="block w-full text-left cursor-zoom-in group" aria-label="<?= e("Apri l'immagine a schermo intero: " . $title) ?>">
        <?php if ($isInfographic) : ?>
          <div class="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-raised)]">
            <?= site_image((string) $post['image'], $title, 'w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]') ?>
          </div>
        <?php else : ?>
          <div class="h-[220px] sm:h-[320px] md:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden border border-[var(--color-border)]">
            <?= site_image((string) $post['image'], $title, 'w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]') ?>
          </div>
        <?php endif; ?>
      </button>
      <dialog data-lightbox class="open:flex items-center justify-center bg-transparent p-0 m-auto max-w-[95vw] max-h-[95vh] backdrop:bg-black/85" aria-label="<?= e($title) ?>">
        <div class="relative max-w-[95vw] max-h-[95vh]">
          <button type="button" data-lightbox-close aria-label="Chiudi" class="absolute top-2 right-2 flex items-center justify-center w-11 h-11 text-white bg-black/55 hover:bg-black/70 rounded-full text-2xl leading-none touch-manipulation">×</button>
          <?= site_image((string) $post['image'], $title, 'max-w-[95vw] max-h-[85vh] w-auto h-auto object-contain rounded-lg', 'eager') ?>
        </div>
      </dialog>
    </div>
  <?php endif; ?>

  <div class="mt-10"><?= render_body((string) ($post['body'] ?? '')) ?></div>

  <?php if ($related) : ?>
    <div class="mt-14 card p-6">
      <p class="eyebrow">Ti potrebbe interessare</p>
      <h2 class="mt-2 text-lg font-semibold"><?= e($related['title']) ?></h2>
      <p class="mt-2 text-sm text-[var(--color-fg-muted)] leading-relaxed"><?= e($related['text']) ?></p>
      <a href="/servizi/#<?= e($relatedKey) ?>" class="mt-4 inline-block text-sm font-semibold text-[var(--color-accent)] link-underline">Scopri il servizio →</a>
    </div>
  <?php endif; ?>
</article>
<?php
page_end();
