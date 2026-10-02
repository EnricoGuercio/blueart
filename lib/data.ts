// La maggior parte dei testi in questo file è ripresa dal sito live blueart.media
// (Webador). Alcuni contenuti sono invece un innesto del materiale di
// posizionamento sviluppato prima del pivot (`materiali/contesto/recap-completo.md`),
// mai integrato nella bozza del cliente: `heroKeywords`, il sottotitolo dell'hero
// e il testo introduttivo di "Chi siamo" (in `app/chi-siamo/page.tsx`). I testi di
// `services` sono stati riscritti nel tono (non nel contenuto informativo) per
// risolvere la tensione descritta in `materiali/contesto/rischi-aperti.md` punto 7 —
// vedi `PROJECT.md` per il dettaglio di cosa è nostro e cosa è del cliente.

// Dal recap (sezione 10) — mai mostrate sul sito live, aggiunte nell'hero.
export const heroKeywords = ["Eventi", "Artisti", "Service audio", "Progetti territoriali", "Cultura"];

export const homeServiceTeasers = [
  {
    slug: "consulenza-artistica",
    title: "Consulenza artistica",
    text: "Offriamo consulenze personalizzate e sinergie per aiutarti a definire il tuo progetto artistico, dalla scelta dei suoni, dei materiali alle tecniche più adatte.",
    cta: "Richiedi una consulenza",
    image: "home-consulenza-artistica",
  },
  {
    slug: "produzione-eventi",
    title: "Produzione eventi",
    text: "Progettiamo e realizziamo eventi culturali, dalla prima idea alla messa in scena. Musica, arte contemporanea, video e fotografia. L'arte valorizzata a 360°",
    cta: "Scopri di più",
    // Sostituita: la foto del sito live (img_0679, una conferenza stampa) aveva
    // una composizione debole (schermo con browser in primo piano, persone
    // piccole in basso). teatro-storico-dallalto (usabile subito) è più forte
    // e coerente — vedi PROJECT.md.
    image: "teatro-storico-dallalto",
  },
  {
    slug: "format-culturali",
    title: "Format culturali",
    text: "Organizziamo eventi e workshop interattivi per privati e aziende, per esplorare il mondo dell'arte e stimolare la creatività. Da secoli si investe sull'arte per valorizzare il proprio business.",
    cta: "Partecipa ad un evento",
    // Sostituita rispetto al sito live: la foto originale (img_3146) è la stessa
    // foto di fiera sposi/terzi esclusa dal nostro archivio (vedi manifest-riconciliato.md
    // e PROJECT.md) — qui usiamo palco-talk-vuoto (usabile subito).
    image: "palco-talk-vuoto",
  },
];

export type Service = {
  slug: string;
  title: string;
  text: string;
  image: string;
};

// 4 card, stessi nomi del sito live (non cambiati). Testi riscritti nel tono
// (non nel contenuto informativo) rispetto all'originale del cliente: niente
// linguaggio da pitch/startup, stesso contenuto, nessun claim nuovo — vedi
// PROJECT.md e materiali/contesto/rischi-aperti.md punto 7. Il testo originale
// del cliente resta comunque leggibile nella cronologia del progetto.
export const services: Service[] = [
  {
    slug: "service-audio-luci-video",
    title: "Service Audio Luci Video",
    text: "Offriamo servizi di audio, video e luci per eventi pubblici e aziendali: conferenze, concerti ed eventi privati. Ci occupiamo di amplificazione audio per convegni e assemblee aziendali, e di streaming video e trasmissioni in diretta per chi segue l'evento anche a distanza.",
    image: "servizio-audio-luci-video",
  },
  {
    slug: "consulenza-per-artisti",
    title: "Consulenza per artisti",
    text: "Affianchiamo gli artisti nella costruzione della propria immagine, in collaborazione con vocal coach e studi di registrazione. Curiamo la grafica dei dischi e realizziamo siti web pensati per le esigenze di ciascun artista, per promuovere la musica e restare in contatto con il pubblico. Grazie alla nostra rete di contatti, aiutiamo l'artista a valutare il percorso di promozione più adatto.",
    image: "servizio-disco-innerlife",
  },
  {
    slug: "promozione-artisti-enti-locali",
    title: "Promozione con Artisti per enti locali",
    text: "Organizziamo eventi per pubbliche amministrazioni e aziende, comprese le feste di paese che coinvolgono la comunità locale. Ci occupiamo della pianificazione e realizzazione dell'evento, lavorando a stretto contatto con le pubbliche amministrazioni per sviluppare contenuti artistici che valorizzino il patrimonio culturale e naturale del territorio. Disponibilità di partenariato per bandi regionali e FNSV.",
    image: "servizio-watermark-fotografo",
  },
  {
    slug: "promozione-artisti-privati-aziende",
    title: "Promozione con Artisti per privati e aziende",
    text: "Per le aziende, organizziamo eventi pensati per promuovere il brand e creare occasioni di interazione diretta con il pubblico, in cui presentare prodotti e servizi. Adattiamo ogni evento alle esigenze specifiche del cliente.",
    // Sostituita rispetto al sito live: era un ritaglio di IMG_3322, foto esclusa
    // dal nostro archivio (minore riconoscibile nell'inquadratura completa — vedi
    // manifest-riconciliato.md). Il ritaglio specifico del cliente non mostrava il
    // problema, ma si usa comunque l'alternativa neutra sempre disponibile.
    image: "regia-dj-mixer",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

export const team: TeamMember[] = [
  {
    name: "Matteo",
    role: "Fondatore e presidente",
    bio: "L'ideatore di Blue Art, il creativo, il pazzo che riesce a catalizzare le idee più folli in eventi eseguibili.",
    image: "team-matteo",
  },
  {
    name: "Emanuele",
    role: "Tecnico",
    bio: "Il tecnico, il dronista, il fonico, il lucista, il Dj, l'insegnate di ballo latino americano. Sa fare qualsiasi cosa, e la fa anche bene!",
    image: "team-emanuele",
  },
  {
    name: "Michele",
    role: "Coordinamento",
    bio: "L'ancora della cooperativa, i piedi per terra, ma con quel pizzico di creatività che a volte gli sfugge e completa questa figura speciale. Lui è l'elemento che plasma il progetto, lo modula e gli dà la forma che poi verrà a caratterizzare l'evento.",
    image: "team-michele",
  },
  {
    name: "Jacopo",
    role: "Allestimenti da palco",
    bio: "Energia pura, il countryman della situazione. Appassionato Dj si approccia al mondo artistico soprattutto nelle tecniche di allestimenti da palco.",
    image: "team-jacopo",
  },
  {
    name: "Federico",
    role: "Nuova generazione",
    bio: "La testimonianza della nuova generazione. Curioso di apprendere le funzioni di un palco, di una struttura organizzativa, ha le idee chiare per creare eventi adatti ai ragazzi della sua età.",
    image: "team-federico",
  },
];

export const teamQuote = {
  text: "Sono estremamente soddisfatto dei risultati ottenuti dal team. Hanno fatto di tutto per soddisfare le esigenze del progetto e hanno superato tutte le aspettative.",
  author: "Matteo P. - Presidente Blue Art.",
};

export type Testimonial = {
  text: string;
  author: string;
};

// Testimonianze reali, riprese identiche dal sito live (non inventate).
export const testimonials: Testimonial[] = [
  {
    text: "L'evento aziendale per i nostri 30 anni di attività è stato formidabile: luci, dj set, karaoke. Ci siamo divertiti davvero tanto",
    author: "Gloria T., cliente privato",
  },
  {
    text: "Lo spettacolo in teatro voluto da Blue Art per promuovere gli artisti locali ha avuto un bell'impatto sulla cittadinanza, da ripetere assolutamente",
    author: "Cristina G., Assessore Comunale",
  },
  {
    text: "Al nostro matrimonio cercavamo l'intrattenimento e invece abbiamo trovato artisti e tecnici che ci hanno supportato in tutto anche con dei gadget artistici come bomboniere",
    author: "Alessandra e Maurizio, sposi 2024",
  },
];

// Fonte unica dei contenuti Eventi/Blog: gli stessi JSON letti dal pannello di
// redazione PHP su Aruba (public/seed/*.json). Qui servono solo alla demo
// statica (GitHub Pages), dove PHP non gira.
import eventsData from "../content/events.json";
import blogData from "../content/blog.json";

const MESI_BREVI = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
const MESI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
const GIORNI = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];

function parseIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d, dow: new Date(Date.UTC(y, m - 1, d)).getUTCDay() };
}
// "2026-08-18" -> "18 ago 2026"
export function formatDateShort(iso: string) {
  const { y, m, d } = parseIso(iso);
  return `${d} ${MESI_BREVI[m - 1]} ${y}`;
}
// "2026-08-21" -> "Venerdì 21 agosto 2026"
export function formatDateLong(iso: string) {
  const { y, m, d, dow } = parseIso(iso);
  return `${GIORNI[dow]} ${d} ${MESI[m - 1]} ${y}`;
}

export type EventItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  note: string;
  patrocinio: string;
  image: string;
};

export const events: EventItem[] = (eventsData as unknown as EventItem[])
  .map((e) => ({ ...e, date: formatDateLong(e.date), time: `ore ${e.time}` }));

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author?: string;
  // Se l'autore è un membro del team, lo slug corrispondente in `team` (per
  // nome, minuscolo) per collegare la firma alla sua bio in Chi Siamo.
  authorTeamSlug?: string;
  image: string;
  // "photo": foto reale, header ritagliato con object-cover (trattamento
  // invariato). "infographic": illustrazione/schema, mostrata a piena
  // larghezza nel corpo dell'articolo con altezza naturale (object-contain),
  // mai ritagliata in un riquadro header — vedi PROJECT.md.
  imageType: "photo" | "infographic";
  excerpt: string;
  body: string; // paragrafi separati da \n\n, sottotitoli con prefisso "### "
  tags: string[];
  // Slug del servizio più pertinente in `services`, per il box "Ti potrebbe
  // interessare" a fondo articolo. Assente = nessun rimando (es. necrologio).
  relatedServiceSlug?: string;
};

export const blogPosts: BlogPost[] = (blogData as unknown as BlogPost[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((p) => ({ ...p, date: formatDateShort(p.date) }));

export const gallery = [
  { image: "regia-audio-auditorium", alt: "Regia audio in auditorium" },
  // Sostituita: la foto del sito live (img_3288) mostrava loghi di terzi non
  // autorizzati (Palaindoor, Comune di Ancona, sponsor su cartelli tavolo) —
  // stesso tipo di rischio già escluso nel nostro archivio, vedi PROJECT.md.
  // palco-notturno-blueart mostra invece il banner BlueArt proprio, nessuna persona.
  { image: "palco-notturno-blueart", alt: "Palco allestito di sera con banner BlueArt" },
  { image: "home-gallery-3", alt: "Performance al pianoforte in un locale" },
];

export const companyInfo = {
  ragioneSociale: "Blue Art soc. coop. a r.l.",
  piva: "02782320424",
  pec: "blueart.ancona@pec.it",
  sede: "60027 Osimo (AN), Italia",
  email: "info@blueart.media",
  facebook: "https://facebook.com/blueartcoop",
  instagram: "https://instagram.com/blueart.ancona",
  // REA e indirizzo completo (via/civico) non disponibili: non inventati, vedi
  // materiali/contesto/rischi-aperti.md punto 6.
};
