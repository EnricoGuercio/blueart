"use client";

import { useState, type FormEvent } from "react";

// fetch() con percorso assoluto non è riscritto dal basePath di Next (solo
// next/link lo è) — vedi next.config.ts. Il form resta comunque non
// funzionante su GitHub Pages, che non esegue PHP: serve solo a non avere un
// percorso sbagliato sopra a quello, quando poi girerà su Aruba.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(`${basePath}/php/send.php`, {
        method: "POST",
        body: formData,
      });

      // Il markup e il fetch sono pronti per essere collegati a un server
      // PHP reale: questo endpoint non è stato testato contro un server
      // reale in questa fase.
      let data: { ok?: boolean; message?: string } = {};
      try {
        data = await res.json();
      } catch {
        // risposta non JSON: probabile che qui non ci sia nessun PHP in ascolto (es. anteprima locale statica)
      }

      if (res.ok && data.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Invio non riuscito. Scrivi direttamente a info@blueart.media.");
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Impossibile contattare il server. Scrivi direttamente a info@blueart.media."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot antispam */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] w-px h-px opacity-0"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1.5">
          Nome *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)] px-4 py-2.5 text-sm text-[var(--color-fg)] outline-none focus:border-[var(--color-accent-bright)]"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1.5">
          Indirizzo email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)] px-4 py-2.5 text-sm text-[var(--color-fg)] outline-none focus:border-[var(--color-accent-bright)]"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5">
          Messaggio *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)] px-4 py-2.5 text-sm text-[var(--color-fg)] outline-none focus:border-[var(--color-accent-bright)]"
        />
      </div>

      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Invio in corso…" : "Invia modulo"}
      </button>

      {status === "success" && (
        <p className="text-sm text-emerald-400">Messaggio inviato correttamente.</p>
      )}
      {status === "error" && <p className="text-sm text-red-400">{errorMessage}</p>}
    </form>
  );
}
