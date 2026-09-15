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

export const events: EventItem[] = [
  {
    slug: "konero-sound-music-group",
    title: "Konero Sound Music Group",
    description: "Concerto in piazza Papa Giovanni XXIII a Loreto.",
    date: "Venerdì 21 agosto 2026",
    time: "ore 21:15",
    location: "Piazza Papa Giovanni XXIII, Loreto (AN)",
    note: "Ingresso libero, posti a sedere limitati",
    patrocinio: "Patrocinio del Comune di Loreto - Assessorato alla Cultura",
    image: "evento-konero-locandina",
  },
];

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

export const blogPosts: BlogPost[] = [
  {
    slug: "i-computer-cantano-da-65-anni",
    title: "I computer cantano da 65 anni (e nessuno se n'era accorto)",
    date: "18 ago 2026",
    author: "Michele Pallotta",
    authorTeamSlug: "michele",
    image: "blog-computer-cantano",
    imageType: "infographic",
    tags: ["Storia della musica", "Tecnologia"],
    relatedServiceSlug: "consulenza-per-artisti",
    excerpt:
      "Se vi interessano la musica e la tecnologia, vi sarà sicuramente capitato di sentire parlare di intelligenza artificiale applicata alla musica: ma se pensate che siano \"diavolerie\" moderne, vi sbagliate di grosso.",
    body: `Se vi interessano la musica e la tecnologia, vi sarà sicuramente capitato di sentire parlare, o magari di partecipare, a delle discussioni e delle critiche relative all'intelligenza artificiale applicata alla musica: siamo infatti arrivati a un punto in cui i computer sanno sia scrivere sia, grazie ai sintetizzatori vocali, cantare canzoni. Ma se pensate che siano "diavolerie" moderne, vi sbagliate di grosso perché già nel 1956 e nel 1961 i computer avevano fatto passi da gigante nel mondo della musica.

### Push Button Bertha, la canzone che confuse il Copyright americano

Nel 1956, nei laboratori della ElectroData Corporation a Pasadena, gli ingegneri Douglas Bolitho e Martin Klein programmarono il computer Datatron 205 unendo principi matematici a principi di composizione musicale. Il computer generava così vari pattern musicali, scartando quelli che non soddisfacevano le condizioni date, e creò la prima composizione musicale. I due ingegneri chiamarono poi un compositore, Jack Owens, per valutarla: fu lui a scrivere il testo, dando vita a "Push Button Bertha". Questa canzone creò all'epoca uno strano problema per la Library of Congress statunitense, l'ente che si occupava dei diritti d'autore: se per il testo si poteva tranquillamente attribuire la paternità a Jack Owens, per la musica non si sapeva a chi attribuire la creazione del brano, se agli ingegneri o al computer stesso.

### Quando un computer cantò per Arthur C. Clarke

Nel 1961, nei Laboratori Bell, i ricercatori John Kelly, Carol Lochbaum e Max Mathews condussero esperimenti su un sintetizzatore vocale e riuscirono a far cantare al calcolatore IBM 7094 la canzone "Daisy Bell", scritta da Harry Dacre nel 1892. Durante questa prova, come visitatore, era presente anche lo scrittore Arthur C. Clarke, che rimase talmente colpito dall'esperimento da inserirlo nel suo libro "2001: Odissea nello spazio", poi ripreso anche nella versione originale dell'omonimo film di Stanley Kubrick.

### Sintetizzatori, Auto-Tune e Intelligenza Artificiale: l'evoluzione della musica elettronica

Per iniziare a parlare della storia dei sintetizzatori, o Synth, bisogna prima vedere la loro definizione, ovvero: Sintetizzatore - Strumento musicale elettronico, costituito da oscillatori che generano suoni di gamma molto ampia (note, timbri di numerosissimi strumenti, rumori ecc.) e da una tastiera che consente di controllare e modificare la frequenza d'uscita dei suoni stessi (definizione dell'Enciclopedia Treccani). Detto questo, iniziamo con la storia dei sintetizzatori: questo strumento nacque già a fine Ottocento, ufficialmente con il brevetto depositato da Thaddeus Cahill, poi sviluppato dallo stesso nel 1901 con il nome di Telharmonium, che funzionava tramite la sintesi additiva a ruote sonore. Lo strumento, però, era gigantesco e quindi impossibile da diffondere al pubblico. Nel 1920, grazie agli studi del fisico sovietico Lev Sergeevič Termen (noto in Occidente come Léon Theremine), nacque il Theremin, uno dei primi strumenti capaci di suonare senza il contatto fisico con l'utilizzatore; mentre nel 1928, grazie al violoncellista e radiotelegrafista francese Maurice Martenot e ispirandosi al Theremin, venne creato l'Ondes Martenot. Entrambi erano strumenti più piccoli dell'originale Telharmonium e quindi adatti a una presentazione e vendita al pubblico. Il vero "boom" commerciale dei Synth avvenne però intorno alla seconda metà del Novecento, quando sintetizzatori molto più evoluti e portatili furono utilizzati per tantissime canzoni dell'epoca, soprattutto nei generi pop e dance.

Nei decenni successivi i Synth si evolvettero sempre più velocemente, passando da semplici suoni elettronici a riproduzioni sempre più fedeli delle sonorità degli strumenti acustici. Oltre a questo, nacquero anche sintetizzatori capaci di creare veri e propri pattern musicali, come poteva fare il computer Datatron 205 menzionato prima: tra gli artisti italiani che usavano il computer per creare musica si possono citare gli 883, il gruppo di Max Pezzali e Mauro Repetto, oppure dei DJ come Jovanotti, ai suoi esordi.

Successivamente nacquero anche i primi effetti, ovvero modulazioni di suoni reali per modificarli leggermente: il più semplice di tutti è il riverbero, capace di prendere un suono, come la voce, ed estenderlo nel tempo, dandogli anche toni più caldi. Andando avanti, nacque nel 1997 uno degli effetti più complessi e soprattutto più utilizzati oggi, ossia l'Auto-Tune, un software proprietario per la manipolazione dell'audio, creato da Antares Audio Technologies grazie agli studi dell'ingegnere Andy Hildebrand, reso poi celebre come effetto dalla canzone Believe di Cher. Come ultima frontiera, oggi c'è l'arrivo delle intelligenze artificiali, capaci di accorpare in semplici processi tutta questa evoluzione di due secoli e quindi di creare canzoni, con tanto di testo cantato, partendo solamente da una descrizione fornita da una persona: ed è da qui che nasce tutto il discorso sul copyright e sull'eticità di lasciare questi studi nelle mani di un solo computer.`,
  },
  {
    slug: "dal-fonografo-allo-streaming",
    title:
      "Dal fonografo allo streaming: la storia tecnica di come ascoltiamo la musica",
    date: "14 ago 2026",
    image: "blog-fonografo-streaming",
    imageType: "infographic",
    tags: ["Storia della musica", "Tecnologia"],
    relatedServiceSlug: "service-audio-luci-video",
    excerpt:
      "Dietro ogni canzone ascoltata oggi in cuffia c'è più di un secolo di invenzioni che hanno cambiato radicalmente il modo di riprodurre il suono. Ecco le tappe tecniche che hanno segnato questa evoluzione.",
    body: `Dietro ogni canzone ascoltata oggi in cuffia c'è più di un secolo di invenzioni che hanno cambiato radicalmente il modo di riprodurre il suono. Ecco le tappe tecniche che hanno segnato questa evoluzione.

### Dal cilindro al disco (1877-1948)

Tutto comincia nel 1877, quando Thomas Edison mette a punto il fonografo, il primo apparecchio in grado di registrare e riprodurre un suono, usando cilindri incisi da una puntina. Dieci anni dopo, nel 1887, Emil Berliner brevetta il grammofono e introduce il disco piatto, inciso a 78 giri al minuto: un formato in gommalacca che permetteva al massimo 5 minuti di musica per lato. La vera svolta arriva nel 1948, quando la Columbia Records lancia l'LP (long playing) in vinile: grazie a solchi molto più fitti, un lato del disco può contenere 23-30 minuti di musica, diventando lo standard dell'ascolto domestico per i decenni successivi.

### La musica diventa portatile (anni '60-'80)

Nel 1963 la Philips introduce la musicassetta, un nastro magnetico racchiuso in una cartuccia compatta, ma è solo nel 1979 che la musica diventa davvero personale: il Walkman di Sony, un lettore di cassette tascabile, permette per la prima volta di ascoltare musica in cuffia mentre ci si muove, anticipando di vent'anni l'iPod.

### Il salto nel digitale: il Compact Disc (1982)

Nel 1982 Sony e Philips lanciano il CD, il primo supporto musicale digitale di massa: un disco da 12 centimetri, letto tramite laser, con campionamento a 44,1 kHz e 16 bit di risoluzione, capace di contenere fino a 74 minuti di musica. Su quella cifra circola un aneddoto celebre — che il formato fosse stato calibrato apposta per far entrare la Nona Sinfonia di Beethoven nell'esecuzione di Furtwängler, voluta fortemente dal presidente Sony Norio Ohga — ma l'ingegnere Philips Kees Schouhamer Immink, che sviluppò la modulazione tecnica (EFM) alla base del CD, ha in seguito ridimensionato la storia definendola più un bell'aneddoto che la reale spiegazione tecnica: la scelta dei 12 cm nacque piuttosto da un compromesso tra i 10 cm proposti da Sony e gli 11,5 cm proposti da Philips. Il primo album stampato industrialmente su CD fu The Visitors degli ABBA, nell'agosto 1982.

### La musica si comprime: l'MP3 (1993-1995)

Negli anni '90 il ricercatore tedesco Karlheinz Brandenburg, del Fraunhofer Institute, mette a punto l'MP3: un algoritmo di compressione "lossy" che sfrutta un modello psicoacustico, cioè elimina le frequenze che l'orecchio umano percepisce meno, riducendo drasticamente le dimensioni dei file senza una perdita di qualità troppo evidente. Brandenburg testò a lungo l'algoritmo usando come riferimento il brano Tom's Diner di Suzanne Vega, per verificare che la voce non venisse deformata. Il formato, ufficializzato nel 1995, esplode a livello globale grazie a Napster, la piattaforma di file-sharing lanciata nel 1999, che rende per la prima volta la musica digitale liberamente scambiabile online — aprendo anche una lunga stagione di battaglie legali sul diritto d'autore.

### La musica liquida e lo streaming (anni 2000-oggi)

Nel 2001 Apple lancia l'iPod, che porta migliaia di brani mp3 in un unico dispositivo portatile. A metà degli anni 2000 nasce l'espressione "musica liquida" per descrivere un ascolto sempre più svincolato dal possesso fisico del supporto. Il passo successivo è lo streaming: Spotify debutta nel 2008 in Europa e arriva in Italia nel 2013, seguito da altre piattaforme concorrenti, spostando definitivamente il paradigma dal possesso della musica al suo accesso on demand, tramite cataloghi sconfinati disponibili all'istante da qualunque dispositivo connesso.`,
  },
  {
    slug: "francesco-guccini",
    title: "Francesco Guccini",
    date: "14 ago 2026",
    image: "blog-guccini",
    imageType: "photo",
    tags: ["In memoria", "Musica italiana"],
    // Nessun rimando ai servizi: è un necrologio, un collegamento commerciale
    // qui stonerebbe — vedi PROJECT.md.
    excerpt:
      "Francesco Guccini si è spento il 6 agosto 2026 a 86 anni, nella sua casa di Pavana. Per oltre cinquant'anni una delle voci più importanti — e più libere — della musica italiana.",
    body: `### È morto Francesco Guccini, il "Maestrone" della canzone d'autore italiana

Francesco Guccini si è spento il 6 agosto 2026 a 86 anni, nella sua casa di Pavana, il piccolo borgo sull'Appennino tosco-emiliano dove era nato nel 1940 e dove aveva scelto di vivere gran parte degli ultimi anni, lontano dai riflettori. Da tempo la vista lo aveva tradito — una maculopatia che negli ultimi diciotto mesi gli aveva impedito persino di leggere, uno dei piaceri a cui teneva di più — e da mesi non usciva quasi più di casa. La famiglia ha voluto una cerimonia funebre strettamente privata, mentre per settembre è annunciato un momento pubblico di commemorazione per permettere a chi lo ha amato di dargli l'ultimo saluto.

### Una vita nella canzone e nella storia d'Italia

Cresciuto a Modena e poi trapiantato a Bologna, città che avrebbe raccontato più di ogni altra, Guccini è stato per oltre cinquant'anni una delle voci più importanti — e più libere — della musica italiana. Insieme a Fabrizio De André, Francesco De Gregori e Giorgio Gaber ha contribuito a trasformare la canzone d'autore da semplice intrattenimento a strumento di racconto storico, politico e civile, capace di parlare di provincia, ingiustizia sociale e contraddizioni del Paese senza mai perdere la vena poetica.

Tra i suoi brani più noti restano "La locomotiva", "L'avvelenata", "Auschwitz", "Via Paolo Fabbri 43", "Incontro" e "Autogrill". "La locomotiva", forse la sua canzone-manifesto, nacque dalla lettura di un vecchio libro di memorie operaie: raccontava la storia vera di Pietro Rigosi, un fuochista anarchico che nel 1893, alla stazione di Poggio Renatico, si impadronì di una locomotiva lanciandola a folle velocità come gesto di ribellione contro l'ingiustizia sociale. Guccini ne fece un eroe popolare, e il brano diventò un inno delle lotte studentesche e operaie degli anni Settanta.

Ritiratosi dai concerti e dall'incisione di nuovi dischi ormai da tempo, negli ultimi decenni si era dedicato soprattutto alla scrittura: ventisei libri pubblicati tra il 1989 e il 2020, spesso in coppia con lo scrittore Loriano Macchiavelli, con cui firmò una fortunata serie di romanzi gialli. "Non mi manca scrivere canzoni perché scrivo libri — disse in un'intervista del 2018 — è un'altra forma di scrittura, ma è sempre scrittura." Nel 2004 il presidente della Repubblica Carlo Azeglio Ciampi lo aveva nominato Ufficiale dell'Ordine al Merito della Repubblica Italiana.

### La chitarra da cinquemila lire

Guccini amava raccontare gli inizi con ironia, senza mai prendersi troppo sul serio. "Comprai la prima chitarra per cinquemila lire da un falegname di Porretta", ricordava, riferendosi al paese vicino a Pavana. Con quello strumento comprato di seconda mano scrisse la sua primissima canzone, "Auschwitz", incisa quando lavorava ancora come giornalista alla Gazzetta dell'Emilia di Modena: dal disco non guadagnò un soldo, perché all'epoca non era nemmeno iscritto alla SIAE. Un episodio che lui stesso citava spesso per raccontare quanto fosse stato casuale e non calcolato l'inizio di una carriera che lo avrebbe reso uno dei simboli della musica italiana.`,
  },
];

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
