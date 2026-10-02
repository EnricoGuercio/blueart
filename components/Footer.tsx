import Link from "next/link";
import Image from "next/image";
import { companyInfo } from "@/lib/data";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-border)] mt-24 bg-[var(--color-bg-raised)]">
      <Image
        src={`${basePath}/logo/glifo-blueart-bianco.png`}
        alt=""
        aria-hidden="true"
        width={168}
        height={228}
        className="glyph-mark hidden sm:block bottom-[-3rem] right-[-2rem] h-[220%] w-auto"
      />
      <div className="container relative py-14 grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold">
            Blue<span className="text-[var(--color-accent)]">Art</span>
          </p>
          <p className="mt-4 text-sm text-[var(--color-fg-muted)] max-w-xs">
            {companyInfo.ragioneSociale}
            <br />
            {companyInfo.sede}
          </p>
          <p className="mt-4 text-xs text-[var(--color-fg-faint)] max-w-xs">
            C.F. e P.IVA {companyInfo.piva}
            <br />
            PEC: {companyInfo.pec}
            <br />
            REA: da confermare
          </p>
        </div>

        <div>
          <p className="eyebrow mb-3">Navigazione</p>
          <nav className="flex flex-col gap-2 text-sm text-[var(--color-fg-muted)]">
            <Link href="/chi-siamo/" className="hover:text-[var(--color-fg)]">Chi Siamo</Link>
            <Link href="/servizi/" className="hover:text-[var(--color-fg)]">Servizi</Link>
            <a href={`${basePath}/eventi/`} className="hover:text-[var(--color-fg)]">Eventi</a>
            <a href={`${basePath}/blog/`} className="hover:text-[var(--color-fg)]">Blog</a>
            <Link href="/#contatti" className="hover:text-[var(--color-fg)]">Contatti</Link>
          </nav>
        </div>

        <div>
          <p className="eyebrow mb-3">Contatti</p>
          <a href={`mailto:${companyInfo.email}`} className="text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]">
            {companyInfo.email}
          </a>
          <div className="mt-4 flex gap-4 text-sm">
            <a href={companyInfo.facebook} target="_blank" rel="noopener noreferrer" className="text-[var(--color-fg-muted)] hover:text-[var(--color-accent)]">
              Facebook
            </a>
            <a href={companyInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-[var(--color-fg-muted)] hover:text-[var(--color-accent)]">
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)]">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-fg-faint)]">
          <p>&copy; {new Date().getFullYear()} Blue Art. Tutti i diritti riservati.</p>
          <div className="flex gap-4">
            <Link href="/privacy/" className="hover:text-[var(--color-fg-muted)]">Privacy</Link>
            <Link href="/cookie/" className="hover:text-[var(--color-fg-muted)]">Cookie</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
