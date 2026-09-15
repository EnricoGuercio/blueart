"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fix per un bug noto di Chromium: quando `html { scroll-behavior: smooth }`
 * è attivo, lo scroll automatico del browser verso un'ancora `#id` al
 * caricamento diretto di una pagina (es. link a `/chi-siamo/#michele`) viene
 * interrotto e la pagina resta in cima, invece di posizionarsi sull'elemento.
 * Qui rifacciamo a mano quello scroll dopo il primo paint — esplicitamente
 * "instant" (non "smooth"/default, che erediterebbe scroll-behavior dalla
 * pagina e sarebbe soggetto allo stesso identico bug che stiamo aggirando).
 *
 * Il fix copre DUE casi distinti, gestiti separatamente perché nessuno dei
 * due, da solo, li copre entrambi:
 *
 * 1. Navigazione tra pagine diverse (es. da un articolo blog a
 *    /chi-siamo/#michele): il root layout NON rimonta con l'App Router (solo
 *    i segmenti di route sotto cambiano), quindi un effetto "solo al mount"
 *    non si ripeterebbe — riagganciato a `usePathname()`, riparte a ogni
 *    cambio di pagina.
 *
 * 2. Click su un'ancora della STESSA pagina (es. "Dove trovarci" in home
 *    verso home stessa "/#contatti"): qui `pathname` non cambia affatto,
 *    quindi il caso 1 non si attiva. Next.js gestisce questi click con
 *    `history.pushState`, che NON genera un evento nativo `hashchange`
 *    (a differenza dell'assegnazione diretta a `location.hash` o dei tasti
 *    avanti/indietro) — un listener su `hashchange` da solo non basta.
 *    Intercettiamo perciò il click sul link stesso, in fase di capture,
 *    confrontando il pathname di destinazione con quello corrente.
 */
export default function HashScrollFix() {
  const pathname = usePathname();

  // Caso 1: cambio pagina con ancora nell'URL di arrivo.
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const id = decodeURIComponent(hash.slice(1));
      document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" });
    };

    // setTimeout invece di requestAnimationFrame: rAF può restare in sospeso
    // se la pagina non è nello stato "visibile" (accade con alcuni strumenti
    // di automazione/preview), mentre i timer restano affidabili. Due
    // tentativi ravvicinati coprono anche l'eventuale shift di layout dovuto
    // al caricamento delle immagini sopra l'ancora.
    const t1 = setTimeout(scrollToHash, 50);
    const t2 = setTimeout(scrollToHash, 350);

    window.addEventListener("hashchange", scrollToHash);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [pathname]);

  // Caso 2: click su un'ancora che punta alla pagina già aperta (nessun
  // cambio di pathname, quindi l'effetto sopra non riparte). Un listener
  // unico a livello di documento, mai ri-attaccato, così vede ogni click a
  // prescindere da quale pagina sia montata in quel momento.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (!url.hash) return;
      if (url.pathname !== window.location.pathname) return; // pagina diversa: caso 1

      const id = decodeURIComponent(url.hash.slice(1));
      // Ritardo breve: aspettiamo che Next aggiorni l'URL/history prima di
      // scrollare, per non correre contro la sua stessa gestione del click.
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" });
      }, 50);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
