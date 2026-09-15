import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy — BlueArt",
};

export default function CookiePage() {
  return (
    <div className="container py-20 md:py-28 max-w-2xl">
      <p className="eyebrow">Informativa provvisoria</p>
      <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Cookie Policy</h1>
      <p className="mt-4 rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-300">
        Testo da verificare e personalizzare prima della pubblicazione. Questa NON è
        un&rsquo;informativa legale definitiva.
      </p>
      <p className="mt-6 text-[var(--color-fg-muted)] leading-relaxed">
        Questa pagina è un segnaposto. Prima della pubblicazione dovrà descrivere i cookie e gli
        eventuali strumenti di tracciamento realmente presenti sul sito, inclusi servizi
        statistici, incorporamenti social, mappe, video o componenti di terze parti.
      </p>
      <h2 className="mt-8 text-lg font-semibold">Contenuti da completare</h2>
      <ul className="mt-3 space-y-2 text-[var(--color-fg-muted)] list-disc list-inside">
        <li>Elenco dei cookie tecnici necessari.</li>
        <li>Eventuali cookie statistici o di profilazione, se attivati.</li>
        <li>Durata, finalità e fornitori dei cookie.</li>
        <li>Modalità di gestione del consenso, se richiesta.</li>
        <li>Link alla Privacy Policy aggiornata.</li>
      </ul>
      <Link href="/" className="btn btn-secondary mt-8">
        Torna al sito
      </Link>
    </div>
  );
}
