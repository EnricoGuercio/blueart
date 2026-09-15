// Stima il tempo di lettura dal conteggio parole reale del testo (velocità
// media ~200 parole/minuto). Nessun numero inventato: deriva dal contenuto.
const WORDS_PER_MINUTE = 200;

export function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
