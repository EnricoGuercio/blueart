"use client";

import { useRef } from "react";
import SiteImage from "./SiteImage";

type Props = {
  slug: string;
  alt: string;
  // "photo": header ritagliato con object-cover, altezza responsive fissa.
  // "infographic": nessun ritaglio, immagine a piena larghezza del
  // contenitore con altezza naturale (object-contain) — vedi PROJECT.md.
  imageType?: "photo" | "infographic";
};

export default function BlogHeaderImage({ slug, alt, imageType = "photo" }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isInfographic = imageType === "infographic";

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="block w-full text-left cursor-zoom-in group"
        aria-label={`Apri l'immagine a schermo intero: ${alt}`}
      >
        {isInfographic ? (
          <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-raised)]">
            <SiteImage
              slug={slug}
              alt={alt}
              className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </div>
        ) : (
          <div className="h-[220px] sm:h-[320px] md:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden border border-[var(--color-border)]">
            <SiteImage
              slug={slug}
              alt={alt}
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        )}
      </button>

      {/* Lightbox nativo: <dialog> dà Esc-to-close e ::backdrop gratis dal
          browser, non serve gestirli a mano. Il click "fuori dall'immagine"
          chiude solo quando il target del click è il dialog stesso (backdrop
          o padding), non un suo discendente come l'immagine o il bottone X. */}
      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="open:flex items-center justify-center bg-transparent p-0 m-auto max-w-[95vw] max-h-[95vh] backdrop:bg-black/85"
        aria-label={alt}
      >
        <div className="relative max-w-[95vw] max-h-[95vh]">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Chiudi"
            className="absolute top-2 right-2 flex items-center justify-center w-11 h-11 text-white bg-black/55 hover:bg-black/70 rounded-full text-2xl leading-none touch-manipulation"
          >
            ×
          </button>
          <SiteImage
            slug={slug}
            alt={alt}
            loading="eager"
            className="max-w-[95vw] max-h-[85vh] w-auto h-auto object-contain rounded-lg"
          />
        </div>
      </dialog>
    </>
  );
}
