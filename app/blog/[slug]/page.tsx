import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogHeaderImage from "@/components/BlogHeaderImage";
import RichText from "@/components/RichText";
import SiteImage from "@/components/SiteImage";
import { blogPosts, team, services } from "@/lib/data";
import { estimateReadingMinutes } from "@/lib/reading-time";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  return { title: post ? `${post.title} — Blue Art` : "Blog — Blue Art" };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const readingMinutes = estimateReadingMinutes(post.body);
  const authorMember = post.authorTeamSlug
    ? team.find((m) => m.name.toLowerCase() === post.authorTeamSlug)
    : undefined;
  const relatedService = post.relatedServiceSlug
    ? services.find((s) => s.slug === post.relatedServiceSlug)
    : undefined;

  return (
    <article className="container py-20 md:py-28 max-w-3xl">
      <Link href="/blog/" className="text-sm text-[var(--color-accent)] link-underline">
        ← Torna al blog
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[var(--color-fg-faint)]">
        <span>{post.date}</span>
        <span aria-hidden="true">·</span>
        <span>{readingMinutes} min di lettura</span>
        {!authorMember && post.author && (
          <>
            <span aria-hidden="true">·</span>
            <span>di {post.author}</span>
          </>
        )}
      </div>

      <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">{post.title}</h1>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Argomenti">
        {post.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-fg-muted)]"
          >
            {tag}
          </li>
        ))}
      </ul>

      {authorMember && (
        <Link
          href={`/chi-siamo/#${post.authorTeamSlug}`}
          scroll={false}
          className="mt-5 inline-flex items-center gap-2.5 group"
        >
          <span className="w-8 h-8 rounded-full overflow-hidden border border-[var(--color-border)] shrink-0">
            <SiteImage slug={authorMember.image} alt={authorMember.name} className="w-full h-full object-cover" />
          </span>
          <span className="text-sm text-[var(--color-fg-muted)]">
            di{" "}
            <span className="font-medium text-[var(--color-fg)] group-hover:text-[var(--color-accent)] link-underline">
              {post.author}
            </span>
          </span>
        </Link>
      )}

      <div className="mt-8">
        <BlogHeaderImage slug={post.image} alt={post.title} imageType={post.imageType} />
      </div>

      <div className="mt-10">
        <RichText body={post.body} />
      </div>

      {relatedService && (
        <div className="mt-14 card p-6">
          <p className="eyebrow">Ti potrebbe interessare</p>
          <h2 className="mt-2 text-lg font-semibold">{relatedService.title}</h2>
          <p className="mt-2 text-sm text-[var(--color-fg-muted)] leading-relaxed">
            {relatedService.text}
          </p>
          <Link
            href={`/servizi/#${relatedService.slug}`}
            scroll={false}
            className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent)] link-underline"
          >
            Scopri il servizio →
          </Link>
        </div>
      )}
    </article>
  );
}
