import type { Metadata } from "next";
import SiteImage from "@/components/SiteImage";
import { team, teamQuote } from "@/lib/data";

export const metadata: Metadata = {
  title: "Chi Siamo — Blue Art",
};

export default function ChiSiamoPage() {
  return (
    <div className="container py-20 md:py-28">
      <p className="eyebrow">Straordinario</p>
      <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
        Il nostro viaggio inizia qui
      </h1>
      <p className="mt-5 max-w-2xl text-[var(--color-fg-muted)] leading-relaxed">
        Scopri la nostra attività e cosa facciamo. Ci impegniamo per offrire
        qualità e un ottimo servizio. Unisciti a noi per crescita e successo.
        Siamo felici che tu voglia far parte della nostra storia.
      </p>

      {/* Paragrafo di posizionamento dal recap pre-pivot (materiali/contesto/
          recap-completo.md, sezione 12) — introduce le bio del team qui sotto,
          non le sostituisce. Vedi PROJECT.md. */}
      <div className="mt-10 max-w-2xl space-y-4 text-[var(--color-fg-muted)] leading-relaxed border-t border-[var(--color-border)] pt-10">
        <p>
          Blue Art è una cooperativa culturale nata per offrire struttura,
          professionalità e supporto operativo al mondo degli eventi artistici
          e musicali.
        </p>
        <p>
          La cooperativa lavora con e per artisti, affiancando musicisti,
          performer e professionisti della cultura, ma anche enti, aziende,
          associazioni e privati che desiderano realizzare eventi, spettacoli
          e progetti territoriali.
        </p>
        <p>
          Dall&rsquo;organizzazione di iniziative culturali al service audio,
          dal supporto tecnico alla costruzione di percorsi artistici e
          territoriali, Blue Art si propone come punto di incontro tra
          creatività, competenze operative e valorizzazione del territorio.
          Le persone che rendono possibile tutto questo sono qui sotto.
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <article
            key={member.name}
            id={member.name.toLowerCase()}
            className="card overflow-hidden scroll-mt-24"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <SiteImage slug={member.image} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h2 className="text-lg font-semibold">{member.name}</h2>
              <p className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wide mt-1">
                {member.role}
              </p>
              <p className="mt-3 text-sm text-[var(--color-fg-muted)] leading-relaxed">
                {member.bio}
              </p>
            </div>
          </article>
        ))}
      </div>

      <blockquote className="mt-16 max-w-2xl mx-auto text-center">
        <p className="text-xl font-medium leading-relaxed text-[var(--color-fg)]">
          &ldquo;{teamQuote.text}&rdquo;
        </p>
        <cite className="mt-4 block text-sm text-[var(--color-fg-muted)] not-italic">
          {teamQuote.author}
        </cite>
      </blockquote>
    </div>
  );
}
