import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — BlueArt",
};

export default function PrivacyPage() {
  return (
    <div className="container py-20 md:py-28 max-w-2xl">
      <p className="eyebrow">Informativa provvisoria</p>
      <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-4 rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-300">
        Testo da verificare e personalizzare prima della pubblicazione. Questa NON è
        un&rsquo;informativa legale definitiva.
      </p>
      <p className="mt-6 text-[var(--color-fg-muted)] leading-relaxed">
        Questa pagina è un segnaposto grafico e redazionale. Prima della messa online dovrà
        essere sostituita con un&rsquo;informativa completa, redatta o verificata da un
        professionista, coerente con i dati effettivamente raccolti dal sito e con gli strumenti
        tecnici attivati.
      </p>
      <h2 className="mt-8 text-lg font-semibold">Contenuti da completare</h2>
      <ul className="mt-3 space-y-2 text-[var(--color-fg-muted)] list-disc list-inside">
        <li>Identità e dati di contatto del titolare del trattamento.</li>
        <li>Tipologie di dati raccolti tramite form, email, statistiche o strumenti terzi.</li>
        <li>Finalità, basi giuridiche e tempi di conservazione.</li>
        <li>Eventuali responsabili esterni e trasferimenti di dati.</li>
        <li>Diritti degli interessati e modalità di esercizio.</li>
      </ul>
      <Link href="/" className="btn btn-secondary mt-8">
        Torna al sito
      </Link>
    </div>
  );
}
