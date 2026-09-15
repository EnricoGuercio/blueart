import type { Metadata } from "next";
import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog — Blue Art",
};

export default function BlogPage() {
  return (
    <div className="container py-20 md:py-28">
      <p className="eyebrow">Il blog di Blue Art</p>
      <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
        Musica, arte e spettacolo
      </h1>
      <p className="mt-5 max-w-2xl text-[var(--color-fg-muted)] leading-relaxed">
        Entra nel mondo vibrante di Blue Art. Qui condividiamo la nostra passione
        per la musica, l&rsquo;arte e lo spettacolo, offrendo approfondimenti,
        storie e riflessioni.
      </p>

      <div className="mt-14 flex flex-col gap-8">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}/`} className="card overflow-hidden grid gap-0 md:grid-cols-[240px_1fr] group">
            <div className="aspect-[4/3] md:aspect-auto md:h-full overflow-hidden bg-[var(--color-bg-raised)]">
              <SiteImage slug={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 md:p-8">
              <p className="text-xs text-[var(--color-fg-faint)]">
                {post.date}
                {post.author ? ` · di ${post.author}` : ""}
              </p>
              <h2 className="mt-2 text-xl font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                {post.title}
              </h2>
              <p className="mt-3 text-sm text-[var(--color-fg-muted)] leading-relaxed">
                {post.excerpt}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent)]">
                Leggi di più »
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
