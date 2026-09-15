import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import ContactForm from "@/components/ContactForm";
import { homeServiceTeasers, testimonials, gallery, companyInfo, heroKeywords } from "@/lib/data";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <SiteImage
            slug="trio-jazz-dallalto"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>
        <div className="container relative py-28 md:py-40 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto">
            Servizi con e per artisti
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-white/90">
            Blue Art è una cooperativa culturale che organizza eventi, supporta
            artisti e realizza progetti capaci di connettere musica, spettacolo,
            arte e territorio.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Ambiti di lavoro Blue Art">
            {heroKeywords.map((k) => (
              <li
                key={k}
                className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm"
              >
                {k}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link href="/#contatti" className="btn btn-primary">
              Dove trovarci
            </Link>
            <Link href="/servizi/" className="btn btn-secondary !bg-white/10 !text-white !border-white/40">
              Scopri i servizi
            </Link>
          </div>
        </div>
      </section>

      {/* Servizi */}
      <section className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">I nostri servizi artistici</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
            Dove la creatività si fonde con l&rsquo;eccellenza
          </h2>
          <p className="mt-4 text-[var(--color-fg-muted)]">
            Blue Art offre una vasta gamma di servizi per soddisfare ogni esigenza
            creativa. Che tu sia un privato, un&rsquo;azienda o un&rsquo;istituzione,
            abbiamo la soluzione artistica perfetta per te.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {homeServiceTeasers.map((s) => (
            <article key={s.slug} className="card overflow-hidden flex flex-col">
              <div className="aspect-[4/3] overflow-hidden">
                <SiteImage slug={s.image} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm text-[var(--color-fg-muted)] leading-relaxed flex-1">
                  {s.text}
                </p>
                <Link href="/servizi/" className="mt-5 text-sm font-semibold text-[var(--color-accent)] link-underline">
                  {s.cta} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Chi siamo teaser */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-raised)]">
        <div className="container py-20 md:py-28 max-w-3xl">
          <p className="eyebrow">Chi siamo</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
            Connessioni tra artisti, territorio e comunità
          </h2>
          <p className="mt-5 text-[var(--color-fg-muted)] leading-relaxed">
            Blue Art è una cooperativa che lavora nel campo della cultura e delle
            arti, con l&rsquo;obiettivo di creare connessioni tra artisti,
            territorio e comunità.
          </p>
          <p className="mt-4 text-[var(--color-fg-muted)] leading-relaxed">
            Crediamo in progetti che nascono dall&rsquo;ascolto e si sviluppano
            insieme a chi li vive: artisti, associazioni, imprese e cittadini. Ogni
            iniziativa che portiamo avanti nasce dalla volontà di dare spazio,
            visibilità e struttura a idee culturali capaci di lasciare un segno.
          </p>
          <Link href="/chi-siamo/" className="mt-6 inline-block btn btn-primary">
            Conosci il nostro team
          </Link>
        </div>
      </section>

      {/* Gallery */}
      <section className="container py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">L&rsquo;arte che ispira</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
            Ogni opera d&rsquo;arte è un viaggio
          </h2>
          <p className="mt-4 text-[var(--color-fg-muted)]">
            Una storia da raccontare. Lasciati ispirare dalle nostre creazioni e
            scopri come l&rsquo;arte può trasformare il tuo mondo.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {gallery.map((g, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-[var(--color-border)]">
              <SiteImage slug={g.image} alt={g.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonianze */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-raised)]">
        <div className="container py-20 md:py-28">
          <p className="eyebrow text-center block">Testimonianze</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure key={i} className="card p-6">
                <blockquote className="text-sm text-[var(--color-fg-muted)] leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold">
                  — {t.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Contatti */}
      <section id="contatti" className="container py-20 md:py-28 scroll-mt-20">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Pronto a creare qualcosa di straordinario?
            </h2>
            <p className="mt-5 text-[var(--color-fg-muted)] leading-relaxed">
              Contattaci oggi stesso per discutere il tuo prossimo progetto
              artistico. Siamo pronti a dare forma alla tua visione.
            </p>

            <div className="mt-8">
              <p className="eyebrow">Dove trovarci</p>
              <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
                {companyInfo.ragioneSociale}
                <br />
                {companyInfo.sede}
              </p>
              <p className="mt-3 text-sm text-[var(--color-fg-muted)]">
                Email: <a href={`mailto:${companyInfo.email}`} className="text-[var(--color-accent)]">{companyInfo.email}</a>
                <br />
                Pec: {companyInfo.pec}
                <br />
                C.F. e P.IVA {companyInfo.piva}
              </p>
              <div className="mt-4 flex gap-4 text-sm">
                <a href={companyInfo.facebook} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] link-underline">
                  Facebook
                </a>
                <a href={companyInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] link-underline">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="card p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
