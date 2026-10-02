# Blue Art — Restyling (proposta, formato blueart.media)

Nuova versione del sito Blue Art, costruita con Next.js ed esportata come sito statico puro
(HTML/CSS/JS) per l'hosting Aruba condiviso. **È una demo da mostrare al cliente come proposta**,
non la versione pubblicabile: `noindex, nofollow` è attivo su tutte le pagine e `robots.txt`
blocca l'indicizzazione.

## Il pivot — cosa è cambiato e perché

Le sessioni precedenti avevano prodotto un sito scuro, multi-pagina, senza foto in home, con
portfolio a 3 gruppi e modal, pagina Contatti separata. **Questo pivot lo sostituisce
integralmente**: nel frattempo il cliente (tramite un'altra persona) ha pubblicato autonomamente
una bozza reale su Webador, live su **blueart.media**, e ha chiesto di mantenerne struttura e
stile visivo (chiaro, fotografico, testimonianze, form in fondo alla Home) migliorandola — non di
ripartire dalla direzione scura precedente.

Di conseguenza: struttura a pagine cambiata (Home con foto/hero/testimonianze/form integrato,
niente più pagina Contatti separata; Eventi in formato calendario invece che portfolio a gruppi
con modal; nuova pagina Blog), tema da scuro a chiaro, contenuti presi il più possibile identici
dal sito live invece che dalla vecchia demo `blueart-website/`.

**Cosa è stato riutilizzato dal lavoro precedente** (non si è ripartiti da zero): struttura
progetto Next.js + export statico, `components/SiteImage.tsx` (WebP+JPEG fallback), pipeline di
ottimizzazione immagini (Pillow/sips), `components/ContactForm.tsx` + `php-app/php/send.php`
(semplificati per i soli campi Nome/Email/Messaggio del form live, invece di Nome/Email/Telefono/
Tipo richiesta), font Raleway self-hosted, `next.config.ts` con `output: "export"`, `robots.txt`.
Non riutilizzato: `components/PortfolioGrid.tsx` (modal a gruppi, non più pertinente al formato
calendario) — rimosso.

## Verifica preliminare fatta prima di procedere

Come richiesto, prima di iniziare ho controllato che `rischi-aperti.md`, `mappa-foto-pagine.md` e
`blog-articoli-esistenti.md` fossero davvero le versioni aggiornate (non le vecchie bozze). Alla
prima verifica **non lo erano** (stessa intestazione delle bozze precedenti, `blog-articoli-
esistenti.md` non esisteva nemmeno) — trovati poi in `materiali/` (root, non nelle sottocartelle
attese) con nomi `rischi-aperti-v3.md` e `mappa-foto-pagine-v2.md`, verificati e copiati nelle
destinazioni corrette prima di procedere.

**Due problemi reali trovati ispezionando `blueart.media` direttamente**, non previsti né da
`mappa-foto-pagine.md` v2 né dal prompt di lavoro:
1. La card Home "Format culturali" usa già `img_3146` — la foto di fiera sposi/terzi esclusa dal
   nostro archivio (stesso evento di `IMG_0033`, brand "Baldinini"/"Lilium Resort", vedi
   `materiali/selezione-foto/manifest-riconciliato.md`). Sostituita con `palco-talk-vuoto.jpg`
   (usabile subito).
2. 4 immagini in uso sul sito live (`abbey-5-high.jpg`, `img_0679-high.jpg`, `img_3288-high.jpg`,
   `img_3151-high.jpg`) **non fanno parte delle 56 foto sorgente mai auditate da noi**. Su
   indicazione dell'utente sono state comunque riportate nel restyling (il cliente le ha già
   pubblicate lui stesso), ma restano **non coperte dal nostro audit diritti/brand** — se in
   futuro emergono problemi analoghi a quelli trovati nell'archivio delle 56 foto, andrebbero
   riverificate.

Ho anche trovato, ispezionando il sito live pagina per pagina, contenuti reali che i file di
contesto non menzionavano: le **3 testimonianze** reali in Home (Gloria T., Cristina G. —
Assessore Comunale, Alessandra e Maurizio), non citate né dal prompt né da `mappa-foto-pagine.md`
v2 (che anzi presupponeva nessuna testimonianza reale disponibile). Riportate verbatim.

## Stato di ogni pagina

- **Home** (`app/page.tsx`) — completa. Hero fotografico (non più vuoto/scuro): `trio-jazz-
  dallalto.jpg` (foto reale del nostro archivio, "usabile subito") al posto del video Vimeo del
  sito live, per semplicità ed export statico senza dipendenze esterne — vedi nota tecnica sotto.
  3 card servizi, sezione Chi siamo breve con link, galleria 3 foto, 3 testimonianze reali, form
  di contatto integrato in fondo (`id="contatti"`, non più una pagina a parte).
- **Chi siamo** (`app/chi-siamo/page.tsx`) — completa. 5 bio del team con foto, citazione finale di
  Matteo P. Nessuna modifica sostanziale rispetto al sito live, come indicato.
- **Servizi** (`app/servizi/page.tsx`) — completa. 4 card, stessi nomi del sito live (invariati);
  i 4 corpi testo sono stati riscritti nel tono (non nel contenuto) in questa sessione — vedi
  "Innesto creativo" più sotto. Foto confermate così come sono per 3 card su 4 (incluse copertina
  disco "Inner Life" e foto con watermark del fotografo); la 4ª (`IMG_3322` ritagliata) sostituita
  con `regia-dj-mixer.jpg` (soluzione neutra sempre disponibile — vedi sotto).
- **Eventi** (`app/eventi/page.tsx`) — completa nel formato (calendario semplice, non più gruppi
  con modal), popolata con l'unico evento reale disponibile (Konero Sound Music Group, Loreto,
  21 agosto 2026).
- **Blog** (`app/blog/page.tsx` + `app/blog/[slug]/page.tsx`) — completa. 3 articoli reali
  riportati identici da `materiali/contesto/blog-articoli-esistenti.md`, con export statico via
  `generateStaticParams`. Corretto il refuso "Eurdulørack" → "Eurorack" **nell'immagine stessa**
  (era inciso nell'illustrazione, non in testo HTML editabile: patch con Pillow, stesso font/
  stile, non generativo — vedi nota tecnica).
- **Privacy / Cookie** — invariate, placeholder provvisori con avviso, nessuna modifica richiesta
  né fatta.

## Innesto creativo — cosa è nostro, cosa è del cliente

Fino alla sessione precedente il sito riprendeva al 100% struttura e contenuti della bozza
`blueart.media`. In questo giro è stato innestato sopra quella base il materiale di posizionamento
sviluppato prima del pivot (`materiali/contesto/recap-completo.md`), rimasto inutilizzato fino ad
ora. La bozza del cliente resta la base strutturale — nessuna pagina, sezione o contenuto reale
(testimonianze, blog, bio/foto team, dati societari, evento) è stato toccato oltre a quanto
descritto qui.

**Aggiunto (mai presente prima, preso dal recap):**
- Hero Home (`app/page.tsx`): sottotitolo sostituito con quello del recap (sezione 9) e le **5
  keyword** del recap (sezione 10: Eventi, Artisti, Service audio, Progetti territoriali, Cultura)
  aggiunte come pillole sotto il sottotitolo — non esistevano da nessuna parte sul sito prima
  d'ora. Titolo H1 normalizzato da "Servizi CON e PER artisti" a "Servizi con e per artisti" (testo
  esatto del recap, non un'enfasi grafica nostra). Foto/CTA dell'hero invariate.
- Chi siamo (`app/chi-siamo/page.tsx`): aggiunto un blocco di 3 paragrafi (recap, sezione 12) prima
  della griglia bio, separato da un divisore. L'ultima frase ("Le persone che rendono possibile
  tutto questo sono qui sotto.") è una frase-ponte scritta da me per introdurre la griglia, non
  presente nel recap — non è un claim, solo un connettivo. Il paragrafo esistente del sito live
  ("Scopri la nostra attività...") resta sopra, invariato: si aggiunge, non si sostituisce.

**Riscritto nel tono, non nel contenuto (risolve `rischi-aperti.md` punto 7 per le card):**
- I 4 corpi testo in `app/servizi/page.tsx` (`lib/data.ts`, export `services`) sono stati
  riformulati per rimuovere linguaggio da pitch ("stai investendo nel tuo successo!", "risultati
  eccellenti e un'esperienza senza pari", "trasformiamo ogni evento in un'esperienza memorabile" e
  simili), mantenendo integralmente le stesse informazioni (stessi servizi, stesse specifiche —
  es. "partenariato per bandi regionali e FNSV" resta testuale) e senza aggiungere alcun claim
  nuovo. I 4 **nomi** delle card non sono stati toccati, come richiesto.
- **Non toccato deliberatamente**: il paragrafo introduttivo della pagina Servizi ("Siamo orgogliosi
  di offrire... stai investendo nel tuo successo!") resta il testo originale del cliente — il
  prompt di lavoro scopava la riscrittura esplicitamente al "corpo testo di ciascuna card", non
  all'introduzione di pagina. Risultato: la tensione di tono descritta al punto 7 è **ridotta ma
  non del tutto risolta** — la pagina apre ancora con un paragrafo in stile pitch, poi le 4 card
  sotto sono in tono sobrio. Segnalo la stonatura invece di correggerla di mia iniziativa, dato che
  eccedere lo scope indicato non era stato chiesto.

**Foto sostituite in questo giro** (revisione qualitativa su tutto il sito, non solo `IMG_3322`/
`IMG_3146` già sostituite prima):
- Galleria Home: `img_3288` (sito live) mostrava **loghi di terzi non autorizzati** leggibili
  (Palaindoor, Comune di Ancona/"Città dello Sport", sponsor su cartelli tavolo tipo "Carni Società
  Cooperativa Agricola") — lo stesso tipo di rischio già escluso sistematicamente nel nostro
  archivio (vedi `manifest-riconciliato.md`), semplicemente non era mai stato notato perché la foto
  arriva dal sito del cliente, non dalle nostre 56 foto auditate. Sostituita con
  `palco-notturno-blueart` (banner BlueArt proprio, nessuna persona, "usabile subito").
- Card Home "Produzione eventi": `img_0679` (foto di una conferenza stampa, composizione debole —
  schermo con finestra del browser in primo piano, persone piccole in basso) sostituita con
  `teatro-storico-dallalto` (teatro storico visto dall'alto, "usabile subito"), già disponibile ma
  non ancora usata da nessuna pagina.
- **Non toccate**: `home-consulenza-artistica` (`abbey-5`, la mappa-foto-pagine segnalava origine
  incerta, ma visivamente è una foto reale e specifica — sessione di registrazione con chitarra —
  non generica/stock, giudicata comunque forte) e `home-gallery-3` (`img_3151`, performance al
  pianoforte in locale, atmosferica, nessun brand). Le 3 foto della pagina Servizi (mixer, copertina
  disco "Inner Life", foto con watermark del fotografo) non sono state toccate: sono contenuto reale
  specifico, non stock/generico, e la card 4 era già stata sostituita in una sessione precedente.

## Nota sul tono dei testi — parzialmente risolto

`materiali/contesto/rischi-aperti.md` (v3, punto 7) segnalava la tensione fra il tono "da pitch" dei
testi del sito live e le linee guida precedenti. **I 4 corpi testo dei servizi sono stati
ammorbiditi** in questo giro (vedi sopra). Resta il paragrafo introduttivo della pagina Servizi,
lasciato intenzionalmente invariato per rispettare lo scope indicato — vedi sopra per il dettaglio.
Va chiarito con Enrico se va sistemato anche quello o se la stonatura residua è accettabile.

## Come si avvia in locale

```bash
cd blueart-restyling
npm install
npm run dev
```

Apri `http://localhost:3000`.

Export statico (quello che andrà su Aruba):

```bash
npm run build
```

Output in `out/`. Anteprima locale dell'export:

```bash
npx serve out
```

Il form contatti non è stato testato contro un server PHP reale (come già indicato in
precedenza): verificato solo che markup e fetch siano corretti. Per testarlo:

```bash
php -S localhost:8000
```
(da dentro `out/`).

## Cosa resta bloccato (aggiornato da `materiali/contesto/rischi-aperti.md` v3)

Molti punti che erano aperti nelle sessioni precedenti **sono stati chiusi dalla scoperta del
sito live** — il footer di `blueart.media` ha reso pubblici la maggior parte dei dati societari e
i link social. Quello che resta:

1. **Foto persone riconoscibili / brand di terzi** (punti 1-2 di `rischi-aperti.md`): 27 foto del
   nostro archivio restano "usabile con permesso", non referenziate dal sito, incluse quelle a
   rischio minori (`IMG_7782`, `IMG_7784`) e quella con minore confermato (`IMG_3322`, sostituita
   ovunque). Il dettaglio foto per foto resta in `materiali/selezione-foto/manifest-riconciliato.md`,
   non toccato in questo giro.
2. **2 delle 4 immagini del sito live non coperte dal nostro audit restano in uso**
   (`home-consulenza-artistica`/`abbey-5`, `home-gallery-3`/`img_3151`) — giudicate visivamente
   buone e senza brand di terzi visibili, ma senza lo stesso livello di verifica dell'archivio
   delle 56 foto. Le altre 2 (`img_0679`, `img_3288`) sono state sostituite in questa sessione
   (vedi "Innesto creativo") perché una aveva brand di terzi non autorizzati, l'altra una
   composizione debole.
3. **Dati eventi/portfolio dei 3 gruppi originali** (auditorium, live, cultura in sala) — ancora
   senza nome evento/luogo/anno confermato. Diventato meno urgente: il formato "calendario eventi"
   scelto ora non richiede quei 3 gruppi, e un evento reale (Konero Sound) è già disponibile e in
   uso.
4. **Testi legali privacy/cookie** — ancora placeholder, invariati.
5. **Form PHP mai testato su hosting Aruba reale** — invariato; il form del sito live gira su
   infrastruttura Webador, non su Aruba/PHP, quindi non è un test già fatto altrove.
6. **Numero REA, indirizzo completo (via/civico), discrepanza Confindustria Ancona/Marche, AGCI
   Cultura** — non presenti nemmeno sul sito live, non inventati: il footer del sito mostra "REA:
   da confermare" invece di un numero inventato.
7. **Tono dei testi "da pitch"** — parzialmente risolto: i 4 corpi testo dei servizi sono stati
   ammorbiditi, il paragrafo introduttivo della pagina Servizi resta invariato per scope — vedi
   nota dedicata sopra, da chiarire con Enrico se va sistemato anche quello.
8. **Versioni multiple del sito** (`rischi-aperti.md` punto 9): ora sono 4 — `blueart-website-
   demo-ok/`, `blueart-website/`, `blueart.media` (live, pubblico), questo progetto Next.js
   (privato). Da tenere distinti nelle comunicazioni col cliente.
9. **SEO/indicizzazione al momento dello switch** (`rischi-aperti.md` punto 10): `blueart.media`
   è già live e presumibilmente indicizzato — quando questo restyling sarà pronto a sostituirlo,
   andranno pianificati redirect per non perdere posizionamento.
10. **Nessun numero WhatsApp** — non fornito dal cliente, non aggiunto.

## Note tecniche

- **Hero con foto invece di video**: il sito live usa un video Vimeo di sfondo. In questa build ho
  usato una foto reale del nostro archivio (`trio-jazz-dallalto`, "usabile subito") per restare
  semplice e senza dipendenze esterne in un export statico — il prompt permetteva esplicitamente
  "foto o video". Se si preferisce il video, è un cambiamento contenuto (componente hero isolato
  in `app/page.tsx`).
- **Correzione refuso "Eurorack"**: fatta modificando i pixel dell'immagine con Pillow (rettangolo
  di riempimento nel colore di sfondo campionato + testo ridisegnato in Arial Bold, stessa
  dimensione), non generativa, non un ritocco AI — script non conservato nel repo, riproducibile
  se serve.
- Le immagini del sito live scaricate sono in `public/images/live/` (originali) e già processate
  (resize + WebP/JPEG) in `public/images/`. La pipeline di elaborazione (sips per HEIC, Pillow per
  resize/WebP) resta la stessa delle sessioni precedenti.
- `IMG_3146.jpg`, se mai autorizzata in futuro, va ruotata di 180° prima dell'uso (non ha tag EXIF
  di orientamento) — invariato dalle note precedenti.


## Pannello di redazione per Eventi e Blog (PHP)

Eventi e Blog non sono più pagine statiche Next sull'hosting finale: sono script PHP che leggono
`data/events.json` e `data/blog.json`, modificabili dal cliente da `/pannello-redazione/`. Il resto
del sito (Home, Chi siamo, Servizi, Privacy, Cookie) resta Next statico.

**Build per Aruba**: `npm run build:aruba` (build + copia di `php-app/` in `out/` + estrazione del "guscio" +
rimozione di `out/blog` e `out/eventi` statici). Il codice PHP sta in `php-app/`, NON in `public/`, così non finisce mai
nella demo statica. Il normale `npm run build` (GitHub Pages) tiene le versioni statiche di Eventi/Blog
per la demo, lette dagli stessi JSON (`content/*.json`, unica fonte dei contenuti iniziali).

**Come funziona**
- `scripts/build-shell.mjs` copia da `out/index.html` CSS, font, header e footer in `out/inc/shell-*.html`:
  le pagine PHP li includono, quindi hanno lo stesso aspetto e lo stesso menu `<details>` del resto del sito.
  Verificato: il markup di `<main>` di Eventi/Blog PHP è identico a quello di Next (confronto automatico).
- Contenuti iniziali in `seed/` (si sovrascrive a ogni deploy); le modifiche del cliente vanno in `data/`
  e `uploads/` (mai nel pacchetto: un nuovo caricamento FTP non le cancella — non sovrascrivere `data/` e `uploads/`).
- `.htaccess` (root) riscrive `/blog/`, `/blog/<slug>/`, `/eventi/` verso `blog.php`/`eventi.php`.
- `php-app/inc/bootstrap.php` ha anche una copia minima di team e servizi (`site_team()`, `site_services()`):
  se cambiano in `lib/data.ts` vanno aggiornati anche lì.

**Prima configurazione (obbligatoria)**: la password non è nel repository. Da una macchina con PHP:
`php php-app/pannello-redazione/imposta-password.php [utente]` crea `data/admin.php` (solo hash) da caricare
in `data/` sul server. Senza quel file nessuno può entrare. Dal pannello si può poi cambiare password.

**Sicurezza**: password con `password_hash`; sessione con cookie `HttpOnly`/`SameSite=Lax`/`Secure` (in HTTPS),
timeout 30 min di inattività e 8 h assolute; CSRF su ogni form; blocco 15 min dopo 5 login falliti; escape di
ogni contenuto in output; upload validati dal contenuto (non dall'estensione), solo JPG/PNG/WebP, max 8 MB,
ricodificati e ridimensionati con GD se presente; `uploads/` senza esecuzione di codice; `data/`, `seed/`, `inc/`
non accessibili dal web; header `X-Robots-Tag: noindex` e CSP restrittiva sul pannello. Il percorso del pannello
NON è in `robots.txt` apposta (lo renderebbe pubblico): oggi `Disallow: /` copre tutto il sito; quando il sito
verrà aperto ai motori di ricerca, restano `noindex` e `X-Robots-Tag` a escluderlo.

**Non verificato su Aruba reale** (stesso discorso di `send.php`): versione PHP/estensioni (testato su PHP 8.5
locale; il codice usa solo funzioni di base, serve PHP ≥ 7.4, GD/fileinfo/exif opzionali), che `AllowOverride`
permetta `Options` e le direttive di `.htaccess`, permessi di scrittura su `data/` e `uploads/`.
Il pannello non gira su GitHub Pages (niente PHP): si mostra in locale con
`php -S localhost:8000 -t out scripts/dev-router.php` dopo `npm run build:aruba`.
