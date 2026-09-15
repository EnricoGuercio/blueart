"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

// next/image non prefissa automaticamente `src` col basePath in questa
// versione di Next (solo next/link lo fa) — vedi next.config.ts.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/chi-siamo/", label: "Chi Siamo" },
  { href: "/servizi/", label: "Servizi" },
  { href: "/eventi/", label: "Eventi" },
  { href: "/blog/", label: "Blog" },
];

export default function Header() {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    if (detailsRef.current) detailsRef.current.open = false;
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/90 backdrop-blur"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <Image src={`${basePath}/logo/logo-blueart-nero-bordo-bianco.png`} alt="BlueArt" width={44} height={44} priority className="rounded-full" />
          <span className="text-lg font-semibold">
            Blue<span className="text-[var(--color-accent)]">Art</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline text-sm font-medium text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
            >
              {link.label}
            </Link>
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

          <nav className="absolute right-0 top-full mt-3 w-[calc(100vw-3rem)] max-w-xs border border-[var(--color-border)] rounded-2xl shadow-lg px-6 py-4 flex flex-col gap-4 bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
