"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

// next/image non prefissa automaticamente `src` col basePath in questa
// versione di Next (solo next/link lo fa) — vedi next.config.ts.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Eventi e Blog sono pagine PHP su Aruba (contenuti modificabili dal pannello
// di redazione), non rotte Next: link normali con navigazione completa, mai
// <Link> (che proverebbe a caricare il payload RSC, inesistente per il PHP).
const navLinks = [
  { href: "/", label: "Home", hard: false },
  { href: "/chi-siamo/", label: "Chi Siamo", hard: false },
  { href: "/servizi/", label: "Servizi", hard: false },
  { href: "/eventi/", label: "Eventi", hard: true },
  { href: "/blog/", label: "Blog", hard: true },
];

function NavItem({ link, className, onClick }: { link: (typeof navLinks)[number]; className: string; onClick?: () => void }) {
  if (link.hard) {
    return (
      <a href={`${basePath}${link.href}`} className={className} onClick={onClick}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className} onClick={onClick}>
      {link.label}
    </Link>
  );
}

export default function Header() {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    if (detailsRef.current) detailsRef.current.open = false;
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="container flex items-center justify-between py-3">
        {/* Logo a piena proporzione (433×238), non più forzato in un
            riquadro 44×44 e ritagliato in cerchio: quel crop tagliava via
            la scritta "BlueArt", lasciando visibile solo un frammento del
            glifo — vedi punto "logo più visibile". Variante bianca, pensata
            apposta per sfondo scuro (invisibile su sfondo chiaro, per questo
            non era in uso finora). */}
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <Image
            src={`${basePath}/logo/logo-blueart-bianco.png`}
            alt="BlueArt"
            width={433}
            height={238}
            priority
            className="h-10 md:h-11 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavItem
              key={link.href}
              link={link}
              className="link-underline text-sm font-medium text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
            />
          ))}
        </nav>

        {/* Menu mobile: <details>/<summary> nativi, non stato React — l'apertura/
            chiusura è gestita interamente dal browser, non da un event handler
            JS soggetto a differenze di comportamento touch fra motori diversi.
            Il pannello è posizionato in absolute rispetto all'header (sticky,
            quindi è un containing block valido) per non essere schiacciato
            dentro la riga flex di logo/nav/bottone. */}
        <details ref={detailsRef} className="md:hidden group relative">
          <summary
            className="flex items-center justify-center w-11 h-11 -mr-2 touch-manipulation list-none cursor-pointer [&::-webkit-details-marker]:hidden"
            aria-label="Apri il menu di navigazione"
          >
            <span className="flex flex-col gap-1.5">
              <span className="h-px w-6 bg-[var(--color-fg)] transition-transform group-open:translate-y-[6.5px] group-open:rotate-45" />
              <span className="h-px w-6 bg-[var(--color-fg)] transition-opacity group-open:opacity-0" />
              <span className="h-px w-6 bg-[var(--color-fg)] transition-transform group-open:-translate-y-[6.5px] group-open:-rotate-45" />
            </span>
          </summary>

          <nav className="absolute right-0 top-full mt-3 w-[calc(100vw-3rem)] max-w-xs border border-[var(--color-border)] rounded-2xl shadow-lg px-6 py-4 flex flex-col gap-4 bg-[var(--color-bg-card)]">
            {navLinks.map((link) => (
              <NavItem
                key={link.href}
                link={link}
                className="text-base font-medium text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                onClick={closeMenu}
              />
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
