import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/data";
import SiteImage from "@/components/SiteImage";

export const metadata: Metadata = {
  title: "Servizi — Blue Art",
};

export default function ServiziPage() {
  return (
    <div className="container py-20 md:py-28">
      <p className="eyebrow">Scopri i nostri servizi</p>
      <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
        Scopri i nostri servizi
      </h1>
      {/* Tono riallineato alle 4 card sotto: stesso contenuto informativo
          dell'originale del cliente (ampiezza dei servizi, personalizzazione,
          supporto continuativo), niente linguaggio da pitch — vedi PROJECT.md
          e materiali/contesto/rischi-aperti.md punto 7. */}
      <p className="mt-5 max-w-2xl text-[var(--color-fg-muted)] leading-relaxed">
        I nostri servizi coprono il supporto tecnico e organizzativo per eventi
        e artisti: dal service audio, luci e video alla consulenza per chi
        lavora in ambito musicale, fino alla promozione di eventi per enti
        locali, aziende e privati. Ogni intervento viene adattato alle esigenze
        specifiche del cliente, con un supporto costante lungo tutte le fasi
        del progetto.
      </p>

      <div className="mt-16 flex flex-col gap-16">
        {services.map((s, i) => (
          <article
            key={s.slug}
            id={s.slug}
            className={`grid gap-8 md:grid-cols-2 items-center scroll-mt-24 ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] aspect-[4/3]">
              <SiteImage slug={s.image} alt={s.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{s.title}</h2>
              <p className="mt-4 text-[var(--color-fg-muted)] leading-relaxed">{s.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link href="/#contatti" className="btn btn-primary">
          Contattaci
        </Link>
      </div>
    </div>
  );
}
