import type { Metadata } from "next";
import SiteImage from "@/components/SiteImage";
import { events } from "@/lib/data";

export const metadata: Metadata = {
  title: "Eventi — Blue Art",
};

export default function EventiPage() {
  return (
    <div className="container py-20 md:py-28">
      <p className="eyebrow">Calendario eventi</p>
      <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
        Calendario eventi - programmazione passo passo
      </h1>

      <div className="mt-14 flex flex-col gap-8">
        {events.map((e) => (
          <article key={e.slug} className="card overflow-hidden grid gap-0 md:grid-cols-[280px_1fr]">
            <div className="aspect-[4/5] md:aspect-auto md:h-full overflow-hidden">
              <SiteImage slug={e.image} alt={e.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <p className="eyebrow">{e.date} · {e.time}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">{e.title}</h2>
              <p className="mt-3 text-[var(--color-fg-muted)]">{e.description}</p>
              <p className="mt-3 text-sm text-[var(--color-fg-muted)]">{e.location}</p>
              <p className="mt-3 text-sm font-medium">{e.note}</p>
              <p className="mt-1 text-sm text-[var(--color-fg-faint)]">{e.patrocinio}</p>
            </div>
          </article>
        ))}

        {events.length === 0 && (
          <p className="text-[var(--color-fg-muted)]">
            Nessun evento in programma al momento.
          </p>
        )}
      </div>
    </div>
  );
}
