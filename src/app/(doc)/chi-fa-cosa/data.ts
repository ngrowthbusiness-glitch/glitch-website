/* ─────────────────────────────────────────────
   CHI FA COSA — modello dei dati
   Il percorso del cliente da sinistra a destra,
   con il livello di impegno dichiarato su ogni pezzo.
───────────────────────────────────────────── */

export type Mode = "servizi" | "ecommerce";
export type Who = "io" | "insieme" | "tu" | "fuori";
export type Rhythm = 1 | 2 | 3 | 4;
export type StageId = "traffico" | "sito" | "conversione" | "relazione" | "base";

export const MODES: { id: Mode; label: string; hint: string }[] = [
  {
    id: "servizi",
    label: "Servizi",
    hint: "Consulenza, professionisti, formazione, B2B. Si vende dopo un contatto.",
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    hint: "Si vende online: l'ordine si chiude sul sito, anche quando prima c'è stata una chat o una telefonata.",
  },
];

export const WHO_LABEL: Record<Who, string> = {
  io: "Io",
  insieme: "Insieme",
  tu: "Tu",
  fuori: "Fuori",
};

export const RHYTHM_LABEL: Record<Rhythm, string> = {
  1: "Apertura",
  2: "Cantiere",
  3: "Ciclo",
  4: "Evento",
};

/* Le quattro tappe del percorso, da sinistra a destra.
   Piu' si va a destra, piu' si stringe: e' il funnel. */
export const STAGES: { id: StageId; n: string; label: string; claim: string }[] = [
  {
    id: "traffico",
    n: "01",
    label: "Traffico",
    claim: "Farsi trovare e farsi vedere. È la parte larga, ed è quella che costa se sotto non regge niente.",
  },
  {
    id: "sito",
    n: "02",
    label: "Sito e CRO",
    claim: "Dove atterrano. Qui faccio praticamente tutto, tranne lo sviluppo pesante.",
  },
  {
    id: "conversione",
    n: "03",
    label: "Conversione",
    claim: "Il punto in cui qualcuno tira fuori la carta o lascia il numero.",
  },
  {
    id: "relazione",
    n: "04",
    label: "Relazione",
    claim: "Nutrire chi non è ancora pronto e far tornare chi ha già comprato. Il fatturato meno caro che esista.",
  },
];

/* ─────────────────────────────────────────────
   LA ROTTA (2026-11-04): la pagina apre sulla strategia.
   Prima la direzione, poi il ritmo, poi le mani.
   Le competenze sono la prova che la direzione si mette a terra,
   non un elenco di servizi.
───────────────────────────────────────────── */

export const HERO = {
  eyebrow: "Come lavoro",
  title: "Prima la direzione,",
  titleEm: "poi le mani.",
  sub: "Entro nella tua azienda come direttore marketing. Guardo tutto il percorso a partire dai numeri veri, e decido con te la cosa che conta adesso. Il resto aspetta, e c'è scritto perché.",
};

export const DIRECTION = {
  label: "La direzione",
  title: "Il mio lavoro è decidere cosa conta. Poi farlo succedere.",
  points: [
    {
      t: "Capire dove sei",
      b: "Prima di toccare qualcosa guardo i numeri veri: cosa porta soldi, cosa ne costa, dove si perde la gente. Non la dashboard, la conclusione.",
    },
    {
      t: "Decidere la cosa che conta adesso",
      b: "Le priorità scritte, in ordine, con il perché di quell'ordine. Una cosa grossa al mese, chiusa, invece di dieci lasciate a metà.",
    },
    {
      t: "Dire cosa non si fa",
      b: "Anche quando è la cosa su cui ti eri intestardito. Due ore passate a decidere di non fare una cosa valgono più di venti passate a farla.",
    },
    {
      t: "Tenere tutti sulla stessa rotta",
      b: "Tu, chi lavora con te, l'agenzia, i fornitori: ognuno sa cosa deve fare, e io controllo che quello che torna funzioni davvero.",
    },
  ],
  limit:
    "Per questo si apre un cantiere alla volta, due al massimo. Se ne apriamo cinque restano tutti a metà; se ne apriamo due si chiudono, e si passa ai successivi.",
};

export const RHYTHM = {
  label: "Il ritmo",
  title: "Come la direzione diventa lavoro, mese per mese",
};

export const HANDS = {
  label: "Le mani",
  title: "Quando serve, la direzione la metto a terra io",
  body: "So fare molte delle cose che servono, e le faccio quando sono la priorità, non perché c'è da fare. Su ogni pezzo di lavoro dichiaro prima quanto ci metto le mani, così non ci sono zone grigie.",
  ends: ["Le mie mani", "Le mani di altri, il mio controllo"],
  /* tre livelli, e per ognuno qualche area d'esempio (id di AREAS): si aprono con un clic */
  levels: [
    {
      id: "operativo" as const,
      says: "Ci metto le mani io",
      body: "La pagina, la campagna, il tracciamento, i flussi email: li faccio io e li metto online io.",
      areas: ["misura", "ads", "cro", "email"],
    },
    {
      id: "supporto" as const,
      says: "Lo facciamo in due",
      body: "Imposto, scrivo e controllo io. Una parte la fai tu o chi lavora con te, perché serve la tua testa, la tua faccia o il tuo tempo.",
      areas: ["messaggio", "economia", "organico", "newsletter"],
    },
    {
      id: "consulenziale" as const,
      says: "Non lo tocco, lo dirigo",
      body: "Decido che serve, scelgo chi lo fa, gli scrivo cosa deve fare e controllo il risultato prima che lo veda il pubblico.",
      areas: ["social", "produzione", "sviluppo"],
    },
  ],
  open: "Vedi tutte le aree, tappa per tappa",
  close: "Chiudi le aree",
  mapTitle: "Il percorso del cliente, da sinistra a destra",
  mapBody: "Più si va a destra, più si stringe: è il percorso che fa chi ti trova, ti sceglie e torna. Ogni area si apre e dice cosa faccio io, cosa facciamo insieme, cosa fai tu.",
};

/* Il limite, disegnato: cinque cantieri aperti restano a metà, due alla volta si chiudono. */
export const LIMIT_VIEW = {
  tanti: "Cinque aperti insieme",
  tantiEsito: "tutti a metà",
  pochi: "Due alla volta",
  pochiEsito: "chiusi, e si passa ai successivi",
};

/* L'indice in testa alla pagina, che poi resta a margine mentre si legge. */
export const INDEX: { id: string; n?: number; t: string; b: string }[] = [
  { id: "direzione", n: 1, t: "La direzione", b: "Cosa conta adesso, e cosa aspetta" },
  { id: "cervello", t: "Il cervello e io", b: "Cosa fa l'AI, cosa faccio io" },
  { id: "ritmo", n: 2, t: "Il ritmo", b: "Come diventa lavoro, mese per mese" },
  { id: "mani", n: 3, t: "Le mani", b: "Cosa faccio io, cosa facciamo in due, cosa dirigo" },
  { id: "domande", t: "Domande", b: "Quelle che mi fanno per iscritto" },
];

/* La rotta (design 2026-11-04): il rumore di un'azienda che, mentre si scorre,
   si mette in ordine sotto i quattro punti della direzione. a = sotto quale punto, -1 = aspetta. */
export const RUMORE: [string, number][] = [
  ["Meta Ads", 1], ["Google Ads", 1], ["newsletter", -1], ["sito nuovo", 0], ["l'agenzia", 3],
  ["preventivi", -1], ["GA4", 0], ["Instagram", -1], ["il listino", 1], ["checkout", 0],
  ["SEO", -1], ["WhatsApp", 3], ["fornitori", 3], ["TikTok", 2], ["il CRM", -1], ["i video", -1],
  ["il catalogo", 0], ["recensioni", -1], ["Amazon", 2], ["la fiera", 2], ["il grafico", 3],
  ["le offerte", 1], ["LinkedIn", -1], ["i coupon", 2], ["il pixel", 0], ["la mail di Natale", 2],
];
export const RUMORE_FASI = [
  "Oggi è tutto acceso, e niente è in ordine.",
  "Prima si guarda tutto, a partire dai numeri veri.",
  "Poi si sceglie. Il resto aspetta, e c'è scritto perché.",
];

/* Chi fa cosa, fra il cervello AI e me: il sistema vero con cui lavoro
   (le call diventano task e decisioni sulla pagina del progetto del cliente). */
export const BRAIN = {
  label: "Il cervello e io",
  title: "Un cervello AI tiene insieme il tuo progetto. Io decido cosa conta.",
  body: "Uso l'intelligenza artificiale in modo massiccio: mi rende più veloce, e il tempo che risparmio va sulle decisioni.",
  ai: [
    "Ascolta le call e ne tira fuori task e decisioni",
    "Tiene il piano aggiornato sulla pagina del tuo progetto",
    "Prepara bozze, controlli e letture dei numeri",
    "Ricorda perché si è deciso cosa, e quando",
  ],
  io: [
    "Decido la cosa che conta adesso",
    "Parlo con te e con chi lavora con te",
    "Controllo quello che esce, prima che lo veda il pubblico",
    "Mi prendo la responsabilità del risultato",
  ],
  /* La scena: un pezzo di call qualsiasi (nessun cliente vero) che diventa piano.
     key = la frase che il cervello sottolinea. */
  call: "La call del lunedì",
  righe: [
    { chi: "Tu", t: "Le campagne costano sempre di più, e non sappiamo quali contatti diventano clienti.", key: "non sappiamo quali contatti diventano clienti" },
    { chi: "Io", t: "Chi li richiama, adesso, i contatti che arrivano?", key: "" },
    { chi: "Tu", t: "Un po' tutti, quando c'è tempo.", key: "" },
    { chi: "Tu", t: "E il sito nuovo? Lo vorremmo pronto per la primavera.", key: "il sito nuovo" },
    { chi: "Io", t: "Prima guardiamo dove si perde la gente su quello che c'è.", key: "dove si perde la gente" },
  ],
  pagina: "La pagina del progetto",
  uscite: [
    { tipo: "Task", t: "Collegare ogni contatto alla vendita che ne è uscita", bozza: "Bozza del tracciamento pronta", timbro: "Si fa adesso" },
    { tipo: "Task", t: "Rifare il sito per la primavera", timbro: "Aspetta", perche: "Prima si guarda dove si perde la gente" },
    { tipo: "Memoria", t: "Deciso lunedì: prima i numeri, poi il sito" },
  ],
  fasi: [
    "Una call come tutte le settimane.",
    "Il cervello ascolta.",
    "Tira fuori task e decisioni, e le scrive sulla pagina del progetto.",
    "Prepara le bozze.",
    "Ricorda perché si è deciso, e quando.",
    "Poi decido io: cosa si fa adesso, cosa aspetta.",
    "Il cervello propone e ricorda. Decido io, e ne rispondo io.",
  ],
};

/* Il righello del mese: quattro settimane da sette giorni, e i giorni che contano.
   Il giorno 1 e' il lunedi' della call di apertura. */
export type DayMark = "call" | "online" | "chiusa" | "nota" | "riga";
export const RIGHELLO: Record<number, { k: DayMark; t: string }> = {
  1: { k: "call", t: "Call di apertura" },
  5: { k: "online", t: "Il primo pezzo è online" },
  8: { k: "call", t: "Call di verifica" },
  14: { k: "chiusa", t: "La cosa grossa è chiusa" },
  15: { k: "nota", t: "La nota scritta" },
  22: { k: "call", t: "Call di chiusura" },
  28: { k: "riga", t: "Il punto e il mese dopo" },
};
export const RIGHELLO_LEGENDA: { k: DayMark; t: string }[] = [
  { k: "call", t: "Call" },
  { k: "chiusa", t: "La cosa grossa chiusa" },
  { k: "nota", t: "Nota scritta" },
];

/* La chiusura in fondo alla pagina: il motivo per cui l'ho mandata. */
export const CLOSING = {
  title: "Se qualcosa qui non torna con come lavorate voi, è la prima cosa da dirmi.",
  body: "Questa pagina racconta come lavoro di norma. Ogni progetto la piega un po', e la forma giusta si decide insieme, dopo aver guardato i numeri veri. Le domande che restano si chiariscono meglio a voce.",
};

export const BASE_STAGE = {
  id: "base" as StageId,
  label: "I due pilastri",
  claim: "Non sono tappe del percorso: reggono tutte e quattro. Se cedono questi, non c'è campagna che tenga.",
};

/* Il livello di impegno, dichiarato su ogni pezzo di lavoro.
   Tre stati, non due: la maggior parte del fraintendimento
   nasce dal fatto che il cliente ne immagina uno solo. */
export const EFFORTS: { id: Effort; label: string; short: string; body: string }[] = [
  {
    id: "operativo",
    label: "Operativo",
    short: "Operativo",
    body: "Ci metto le mani io. Il file, la pagina, la campagna, la mail: li produco io e li metto in aria io.",
  },
  {
    id: "supporto",
    label: "Supporto",
    short: "Supporto",
    body: "Lo facciamo in due. Io imposto, scrivo e controllo; una parte la esegui tu o chi lavora con te, perché non è delegabile a me.",
  },
  {
    id: "consulenziale",
    label: "Consulenziale",
    short: "Consulenziale",
    body: "Non lo tocco. Decido che serve, scelgo chi lo fa, gli scrivo cosa deve fare e verifico il risultato prima che lo veda il pubblico.",
  },
];

export type Op = { t: string; who: Who; r: Rhythm; mode?: Mode };

export type Effort = "operativo" | "supporto" | "consulenziale";

export type Area = {
  id: string;
  stage: StageId;
  effort: Effort;
  /* true = area vera del tuo business in cui non sono io a mettere le mani */
  outside?: boolean;
  title: string;
  short: string;
  claim: string;
  modes: Mode[];
  terms: string[];
  ops: Op[];
  need?: string;
};

export const AREAS: Area[] = [
  /* ══ DATA ══════════════════════════════════ */
  {
    id: "misura",
    stage: "base",
    effort: "operativo",
    title: "Misura e tracciamento",
    short: "Misura",
    claim: "Gli strumenti che dicono la verità, anche quando non fa piacere.",
    modes: ["servizi", "ecommerce"],
    terms: ["tracking", "GA4", "pixel", "Tag Manager", "attribuzione", "consenso cookie", "report", "dashboard"],
    ops: [
      { t: "Censimento di cosa è installato oggi e di cosa sta dicendo il falso", who: "io", r: 1 },
      { t: "Pixel e API di conversione, senza che gli eventi si contino due volte fra browser e server", who: "io", r: 2 },
      { t: "Analytics e tag manager, con gli eventi che contano davvero e non il solo pageview", who: "io", r: 2 },
      { t: "Parametri di tracciamento sui link, decisi una volta e poi rispettati sempre", who: "io", r: 2 },
      { t: "Banner cookie e consenso attivi prima che parta un euro di traffico a pagamento", who: "io", r: 2 },
      { t: "Prova completa con un contatto vero: dal click al modulo, dal modulo alla mail, dalla mail al pannello", who: "io", r: 2 },
      { t: "Il report periodico, che dice cosa è successo e cosa ne consegue", who: "io", r: 3 },
    ],
    need: "Gli accessi ai pannelli. È il muro numero uno: nella maggior parte dei progetti la prima settimana si perde qui, non sul lavoro.",
  },
  {
    id: "conduzione",
    stage: "base",
    effort: "operativo",
    title: "Lettura e conduzione",
    short: "Conduzione",
    claim: "Cosa si fa questa settimana, cosa aspetta, cosa non si fa mai.",
    modes: ["servizi", "ecommerce"],
    terms: ["priorità", "roadmap", "KPI", "coordinamento fornitori", "brainstorming", "piano di lavoro"],
    ops: [
      { t: "Le priorità della settimana, scritte, con l'ordine dichiarato", who: "io", r: 3 },
      { t: "Lettura dei numeri: non la dashboard, la conclusione", who: "io", r: 3 },
      { t: "La call di confronto, di norma una a settimana", who: "insieme", r: 3 },
      { t: "Coordinamento di chi già lavora con te: agenzia, sviluppatore, grafico, social, fornitori", who: "io", r: 3 },
      { t: "Controllo di quello che consegnano agenzia e fornitori: che funzioni sul sito vero, che misuri giusto, che sia quello che si era deciso", who: "io", r: 3 },
      { t: "Scegliere il fornitore quando serve una competenza che non ho, e scrivergli cosa deve fare", who: "io", r: 2 },
      { t: "Dire cosa non si fa, e perché. Anche quando è la cosa su cui ti eri intestardito", who: "io", r: 3 },
      { t: "Il punto a mente fredda dopo ogni lancio: cosa teniamo, cosa buttiamo", who: "io", r: 4 },
    ],
    need: "Che le decisioni si prendano. Un progetto fermo su una decisione costa più di un progetto fatto male: quello almeno insegna qualcosa.",
  },
  {
    id: "economia",
    stage: "conversione",
    effort: "supporto",
    title: "Offerta, prezzo, margine",
    short: "Offerta",
    claim: "Se il conto non torna, il traffico peggiora le cose invece di migliorarle.",
    modes: ["servizi", "ecommerce"],
    terms: ["prezzo", "margine", "LTV", "costo di acquisizione", "listino", "sconti", "bundle", "unit economics"],
    ops: [
      { t: "Prezzo, cosa è incluso, cosa no", who: "tu", r: 1 },
      { t: "Come è costruito il pacchetto: livelli, durata, garanzia", who: "insieme", r: 1 },
      { t: "Quanto puoi permetterti di pagare un cliente, e quanto vale nel tempo", who: "io", r: 1 },
      { t: "La meccanica: finestre, scadenze vere, prove, bonus, sconti", who: "io", r: 2 },
      { t: "Dirti quando l'offerta non regge, prima di spingerci sopra del traffico a pagamento", who: "io", r: 1 },
      { t: "Ripensare il pacchetto quando i numeri dicono che il problema è quello", who: "io", r: 4 },
    ],
    need: "I numeri veri: costi, margini, storico delle vendite. Senza, qualsiasi calcolo è una recita.",
  },

  /* ══ PIATTAFORMA ═══════════════════════════ */
  {
    id: "pagine",
    stage: "sito",
    effort: "operativo",
    title: "Pagine e moduli di contatto",
    short: "Pagine",
    claim: "Il punto in cui uno sconosciuto lascia il suo numero.",
    modes: ["servizi"],
    terms: ["landing page", "funnel", "form", "CRO", "thank you page", "prenotazione appuntamenti", "sito"],
    ops: [
      { t: "Struttura della pagina: cosa si vede prima, cosa dopo, cosa non si vede affatto", who: "io", r: 2 },
      { t: "Il testo, tutto", who: "io", r: 2 },
      { t: "Il modulo: quante domande, quali, in che ordine", who: "io", r: 2 },
      { t: "Pagina di ringraziamento e cosa succede nei primi cinque minuti dopo", who: "io", r: 2 },
      { t: "Prenotazione della call, promemoria, gestione dei mancati appuntamenti", who: "io", r: 2 },
      { t: "Resa e velocità su telefono, dove sta la gran parte del traffico", who: "io", r: 2 },
      { t: "Prova completa prima di aprire i rubinetti", who: "io", r: 2 },
      { t: "Ritocchi in base a dove le persone si fermano", who: "io", r: 3 },
    ],
  },
  {
    id: "vendita",
    stage: "conversione",
    effort: "supporto",
    title: "Il momento della vendita",
    short: "Vendita",
    claim: "Fra il contatto e il sì ci sono più soldi che in tutto il resto.",
    modes: ["servizi"],
    terms: ["CRM commerciale", "preventivi", "follow-up", "pipeline", "script di vendita", "lead"],
    ops: [
      { t: "Quanto passa fra il contatto e la prima risposta, e chi risponde", who: "insieme", r: 1 },
      { t: "La traccia della call: cosa chiedere, in che ordine, cosa non promettere", who: "io", r: 2 },
      { t: "Il preventivo: come è scritto, cosa contiene, quanto dura", who: "io", r: 2 },
      { t: "I follow-up: quanti, a che distanza, cosa dicono", who: "io", r: 2 },
      { t: "Parlare con i clienti e chiudere", who: "tu", r: 3 },
      { t: "Lettura del perché si perde: prezzo, tempi, o messaggio sbagliato a monte", who: "io", r: 3 },
    ],
    need: "Che qualcuno mi dica com'è andata. Un contatto perso senza motivazione è un dato buttato, e sono quelli che valgono di più.",
  },
  {
    id: "negozio",
    stage: "sito",
    effort: "operativo",
    title: "Sito e schede prodotto",
    short: "Negozio",
    claim: "Il negozio deve rispondere alle obiezioni al posto tuo.",
    modes: ["ecommerce"],
    terms: ["e-commerce", "Shopify", "WooCommerce", "schede prodotto", "CRO", "recensioni", "catalogo", "tema"],
    ops: [
      { t: "Struttura del negozio, categorie e navigazione", who: "io", r: 2 },
      { t: "Schede prodotto: testo, ordine delle informazioni, obiezioni affrontate prima che nascano", who: "io", r: 2 },
      { t: "Foto e video di prodotto", who: "tu", r: 2 },
      { t: "Leve di conversione: carrello laterale, soglia di spedizione gratuita, ricerca, correlati, misure", who: "io", r: 2 },
      { t: "Recensioni vere: raccolta, moderazione, messa in pagina. Mai importate, mai inventate", who: "insieme", r: 3 },
      { t: "Velocità su telefono, che è quasi sempre il vero collo di bottiglia", who: "fuori", r: 2 },
      { t: "Modifiche mirate al tema quando servono", who: "io", r: 2 },
      { t: "Pulizia del catalogo: varianti, codici, disponibilità, doppioni", who: "io", r: 2 },
    ],
    need: "Le foto dei prodotti che vendi davvero, tutte le varianti comprese. Una variante senza foto o si fotografa o si toglie: non esistono terze strade.",
  },
  {
    id: "cro",
    stage: "sito",
    effort: "operativo",
    title: "CRO e test",
    short: "CRO e test",
    claim: "Far rendere di più il traffico che hai già. Qui faccio praticamente tutto, tranne lo sviluppo pesante.",
    modes: ["servizi", "ecommerce"],
    terms: ["CRO", "test A/B", "tasso di conversione", "mappe di calore", "velocità", "mobile", "ottimizzazione"],
    ops: [
      { t: "Dove si perde la gente, guardando i dati e le registrazioni e non le opinioni", who: "io", r: 1 },
      { t: "Le ipotesi da provare, messe in fila per quanto valgono e non per quanto sono comode", who: "io", r: 3 },
      { t: "Modifiche a testo, struttura, ordine delle informazioni, chiamate all'azione", who: "io", r: 2 },
      { t: "Test A/B quando il traffico basta a dire qualcosa. Spesso non basta, e te lo dico invece di fingere", who: "io", r: 3 },
      { t: "Velocità e resa su telefono: misuro io, gli interventi pesanti li fa uno sviluppatore", who: "insieme", r: 2 },
      { t: "Riscritture profonde del tema o del template", who: "fuori", r: 2 },
      { t: "Lettura del risultato e decisione: si tiene, si butta, si riprova diversamente", who: "io", r: 3 },
    ],
    need: "Traffico sufficiente perché un test significhi qualcosa. Sotto una certa soglia non si testa: si decide con la testa, si mette in aria e si guarda il risultato.",
  },
  {
    id: "checkout",
    stage: "conversione",
    effort: "operativo",
    title: "Carrello e checkout",
    short: "Checkout",
    claim: "L'ultimo metro, dove se ne va la metà del lavoro.",
    modes: ["ecommerce"],
    terms: ["carrello", "checkout", "pagamenti", "spese di spedizione", "carrelli abbandonati", "resi"],
    ops: [
      { t: "Quanti passaggi ci sono e quanti se ne possono togliere", who: "io", r: 2 },
      { t: "Metodi di pagamento disponibili e quelli che mancano", who: "insieme", r: 2 },
      { t: "Costi che compaiono tardi: spedizione, contrassegno, soglie", who: "io", r: 2 },
      { t: "Recupero di chi abbandona: email, promemoria, tempistiche", who: "io", r: 2 },
      { t: "Ordine di prova completo, pagamento vero incluso, prima di spingere traffico", who: "io", r: 2 },
      { t: "Lettura del punto esatto in cui si perde la gente", who: "io", r: 3 },
    ],
  },
  {
    id: "email",
    stage: "relazione",
    effort: "operativo",
    title: "CRM e automazioni",
    short: "CRM",
    claim: "I flussi che partono da soli e continuano a lavorare per mesi senza chiedere niente a nessuno.",
    modes: ["servizi", "ecommerce"],
    terms: ["CRM", "marketing automation", "flussi", "Klaviyo", "Brevo", "Mailchimp", "segmenti", "automazioni", "WhatsApp"],
    ops: [
      { t: "Quali flussi servono davvero, e in che ordine costruirli", who: "io", r: 1 },
      { t: "Benvenuto, carrello abbandonato, post-acquisto", who: "io", r: 2, mode: "ecommerce" },
      { t: "Benvenuto, nutrimento, riattivazione dei contatti freddi", who: "io", r: 2, mode: "servizi" },
      { t: "Le email dei flussi scritte una per una, non un modello riempito", who: "io", r: 2 },
      { t: "Segmenti, etichette, consensi, gestione delle disiscrizioni", who: "io", r: 2 },
      { t: "Caricamento sulla piattaforma e messa in aria", who: "io", r: 2 },
      { t: "Sequenze dedicate quando c'è un lancio o una stagione", who: "io", r: 4 },
      { t: "Controllo periodico che i flussi girino ancora e non si siano rotti da soli", who: "io", r: 3 },
    ],
    need: "L'accesso alla piattaforma e i dati legali per il piè di pagina. Si costruiscono una volta e poi lavorano da soli: è il pezzo con il rapporto lavoro-resa migliore di tutta la pagina.",
  },
  {
    id: "newsletter",
    stage: "relazione",
    effort: "supporto",
    title: "Newsletter e invii ricorrenti",
    short: "Newsletter",
    claim: "L'invio che torna ogni settimana. È l'attività che mangia più tempo di tutte, e per questo non la tengo tutta io.",
    modes: ["servizi", "ecommerce"],
    terms: ["newsletter", "invii", "DEM", "SMS", "piano editoriale email", "campagne email"],
    ops: [
      { t: "Il piano degli invii: quanti, quando, e di cosa parlano", who: "io", r: 3 },
      { t: "L'angolo e la struttura di ogni invio, così non si parte dal foglio bianco", who: "io", r: 3 },
      { t: "La scrittura degli invii ricorrenti", who: "insieme", r: 3 },
      { t: "Impaginazione e caricamento sulla piattaforma", who: "tu", r: 3 },
      { t: "A chi va e a che ora: segmento e orario li decido io", who: "io", r: 3 },
      { t: "Rilettura prima dell'invio: niente parte senza che l'abbia guardato", who: "io", r: 3 },
      { t: "Lettura di aperture, click e disiscrizioni, e cosa cambiare di conseguenza", who: "io", r: 3 },
    ],
    need: "Qualcuno che scriva gli invii ricorrenti, anche tu. Se li tengo tutti io si mangiano il tempo che serve alle cose che spostano di più, e te ne accorgi dai numeri prima che dalla fattura.",
  },
  {
    id: "ritorno",
    stage: "relazione",
    effort: "supporto",
    title: "Chi è già cliente",
    short: "Ritorno",
    claim: "Il fatturato meno caro che esista, e quasi sempre abbandonato.",
    modes: ["servizi", "ecommerce"],
    terms: ["retention", "riacquisto", "fidelizzazione", "recensioni", "referral", "passaparola", "casi studio"],
    ops: [
      { t: "Ogni quanto torna un cliente, e quanto vale nel tempo", who: "io", r: 1 },
      { t: "Occasioni di riacquisto: ricambi, ricariche, taglie, stagioni", who: "io", r: 3, mode: "ecommerce" },
      { t: "Cosa succede nei primi trenta giorni di un cliente nuovo", who: "insieme", r: 2, mode: "servizi" },
      { t: "Quando e come chiedere una recensione o una referenza", who: "io", r: 1 },
      { t: "Casi studio costruiti sui clienti contenti", who: "io", r: 2, mode: "servizi" },
      { t: "Programma fedeltà, quando ha senso. Spesso non ne ha, e te lo dico", who: "io", r: 1 },
      { t: "Rapporto con i clienti, ascolto, relazione", who: "tu", r: 3 },
    ],
  },

  /* ══ CONTENT ═══════════════════════════════ */
  {
    id: "messaggio",
    stage: "traffico",
    effort: "supporto",
    title: "Brand e messaggio",
    short: "Brand",
    claim: "Cosa dici, a chi, e perché dovrebbero crederti.",
    modes: ["servizi", "ecommerce"],
    terms: ["posizionamento", "target", "promessa", "tono di voce", "brand", "differenziazione"],
    ops: [
      { t: "Chi è il cliente che vuoi, e soprattutto quale non vuoi", who: "insieme", r: 1 },
      { t: "Cosa prometti, e su cosa poggia la promessa", who: "insieme", r: 1 },
      { t: "Il meccanismo che ti rende diverso, scritto in modo che si capisca in una riga", who: "io", r: 1 },
      { t: "Le parole con cui lo dici, decise una volta e poi usate ovunque uguali", who: "io", r: 1 },
      { t: "Cosa non si dice mai, per scelta", who: "insieme", r: 1 },
      { t: "Revisione quando cambia l'offerta o si muove il mercato", who: "io", r: 4 },
    ],
    need: "Un paio d'ore della tua testa, e non sono delegabili. Cosa ti rende diverso non si inventa a tavolino: si tira fuori da te. Io faccio le domande e scrivo la risposta.",
  },
  {
    id: "organico",
    stage: "traffico",
    effort: "supporto",
    title: "Contenuti organici",
    short: "Organico",
    claim: "Decido cosa si dice e in che ordine. Pubblicare e rispondere è di un'altra persona.",
    modes: ["servizi", "ecommerce"],
    terms: ["calendario editoriale", "angoli", "script video", "reel", "carosello", "LinkedIn", "Instagram", "TikTok", "YouTube"],
    ops: [
      { t: "Gli argomenti e gli angoli, agganciati a quello che stanno dicendo le campagne", who: "io", r: 3 },
      { t: "Il calendario: cosa esce, quando, su quale canale", who: "io", r: 3 },
      { t: "Le tracce dei video e la struttura dei post", who: "io", r: 3 },
      { t: "Sessione di confronto sugli argomenti, quando serve una testa in più", who: "insieme", r: 3 },
      { t: "Riprese, voce, faccia", who: "tu", r: 3 },
      { t: "Pubblicazione quotidiana, risposte ai commenti e ai messaggi", who: "fuori", r: 3 },
      { t: "Lettura di cosa ha funzionato e perché, e cosa smettere di fare", who: "io", r: 3 },
    ],
    need: "Il tuo tempo davanti alla telecamera, e una persona che pubblichi e risponda. Di solito è una figura part-time, e non sono io: se ti dicessi il contrario ti starei vendendo qualcosa.",
  },
  {
    id: "seo",
    stage: "traffico",
    effort: "operativo",
    title: "Ricerca e presenza organica",
    short: "SEO",
    claim: "Esserci quando qualcuno sta già cercando.",
    modes: ["servizi", "ecommerce"],
    terms: ["SEO", "blog", "parole chiave", "Google Business", "Merchant Center", "feed prodotti", "indicizzazione"],
    ops: [
      { t: "Cosa cercano davvero le persone, con quali parole, e con che intenzione", who: "io", r: 1 },
      { t: "Struttura del sito e delle categorie", who: "io", r: 2 },
      { t: "Piano di pagine e articoli, programmato nel tempo invece che pubblicato a strappi", who: "io", r: 2 },
      { t: "Scrittura dei testi", who: "io", r: 2 },
      { t: "Interventi tecnici: velocità, dati strutturati, indicizzazione", who: "fuori", r: 2 },
      { t: "Feed prodotti verso Google e i marketplace", who: "io", r: 2, mode: "ecommerce" },
      { t: "Scheda Google dell'attività e recensioni locali", who: "insieme", r: 3, mode: "servizi" },
      { t: "Controllo delle posizioni e del traffico, e cosa ne consegue", who: "io", r: 3 },
    ],
  },

  /* ══ ADVERTISING ═══════════════════════════ */
  {
    id: "ads",
    stage: "traffico",
    effort: "operativo",
    title: "Struttura e conduzione delle campagne",
    short: "Campagne",
    claim: "Comprare attenzione senza comprare il vuoto.",
    modes: ["servizi", "ecommerce"],
    terms: ["Meta Ads", "Google Ads", "Facebook", "Instagram Ads", "campagne", "ROAS", "shopping"],
    ops: [
      { t: "Struttura dell'account: quante campagne, quanti gruppi, con che logica", who: "io", r: 2 },
      { t: "Caricamento, collegamento e messa in aria", who: "io", r: 2 },
      { t: "Le prime settantadue ore: non si tocca niente, si guarda", who: "io", r: 2 },
      { t: "Soglie decise a freddo prima di partire: sopra quanto si spegne, sotto quanto si scala", who: "io", r: 1 },
      { t: "Catalogo prodotti collegato e campagne dinamiche", who: "io", r: 2, mode: "ecommerce" },
      { t: "Lettura settimanale e decisioni conseguenti", who: "io", r: 3 },
      { t: "Spinta concentrata sui lanci e sulle stagioni", who: "io", r: 4 },
    ],
    need: "Accesso al business manager e un metodo di pagamento valido. Senza, non si accende niente.",
  },
  {
    id: "pubblici",
    stage: "traffico",
    effort: "operativo",
    title: "Pubblici e budget",
    short: "Pubblici",
    claim: "A chi lo fai vedere, e quanto ci metti sopra.",
    modes: ["servizi", "ecommerce"],
    terms: ["targeting", "pubblici", "lookalike", "retargeting", "budget", "scaling", "remarketing"],
    ops: [
      { t: "Chi vedrà le campagne, e con che ordine di priorità", who: "io", r: 2 },
      { t: "Quali pubblici non usare, perché in questo account hanno già fallito", who: "io", r: 2 },
      { t: "Come è distribuito il budget fra le righe", who: "io", r: 2 },
      { t: "Quando si scala e di quanto, deciso prima di partire e non nell'entusiasmo", who: "io", r: 1 },
      { t: "Il budget totale e il limite che non vuoi superare", who: "tu", r: 1 },
      { t: "Aumenti e tagli sulla base dei numeri, non delle sensazioni", who: "io", r: 3 },
      { t: "Chi ha già interagito o comprato, e cosa gli si mostra dopo", who: "io", r: 3 },
    ],
  },
  {
    id: "creativita",
    stage: "traffico",
    effort: "supporto",
    title: "Creatività e angoli",
    short: "Creatività",
    claim: "Quante storie diverse sappiamo raccontare della stessa cosa.",
    modes: ["servizi", "ecommerce"],
    terms: ["creatività", "copy", "annunci", "hook", "UGC", "banner", "video ads"],
    ops: [
      { t: "Gli angoli: quante letture diverse dello stesso prodotto proviamo", who: "io", r: 3 },
      { t: "Il concept di ogni creatività, una per una", who: "io", r: 3 },
      { t: "I testi degli annunci", who: "io", r: 3 },
      { t: "Realizzazione grafica e montaggio video", who: "fuori", r: 3 },
      { t: "Le riprese in cui compari tu", who: "tu", r: 3 },
      { t: "Scelta di cosa va in aria e cosa si scarta", who: "io", r: 3 },
      { t: "Rinfresco quando la frequenza sale e il costo per risultato si alza", who: "io", r: 3 },
    ],
  },

  /* ══ FUORI ORBITA ══════════════════════════ */
  {
    id: "social",
    stage: "traffico",
    effort: "consulenziale",
    outside: true,
    title: "Gestione social e community",
    short: "Gestione social",
    claim: "Pubblicare, rispondere, moderare. Non sono io: serve una persona dedicata, di solito part-time.",
    modes: ["servizi", "ecommerce"],
    terms: ["gestione social", "community", "commenti", "messaggi diretti", "moderazione", "social media manager"],
    ops: [
      { t: "Cosa esce e in che ordine, agganciato alle campagne", who: "io", r: 3 },
      { t: "Pubblicare i contenuti giorno per giorno", who: "fuori", r: 3 },
      { t: "Rispondere a commenti e messaggi diretti", who: "fuori", r: 3 },
      { t: "Moderare, gestire la community, tenere il tono", who: "fuori", r: 3 },
      { t: "Dirti se quella persona sta lavorando bene, guardando i numeri", who: "io", r: 3 },
    ],
    need: "Una persona dedicata. Può essere chi già ti segue, o il video maker se ha le competenze: l'importante è che ci sia e che sappia cosa deve dire.",
  },
  {
    id: "produzione",
    stage: "traffico",
    effort: "consulenziale",
    outside: true,
    title: "Video, foto e grafica",
    short: "Video e foto",
    claim: "Do la traccia e scelgo cosa tenere. Non giro e non monto.",
    modes: ["servizi", "ecommerce"],
    terms: ["video maker", "montaggio", "fotografo", "packshot", "grafica", "editing"],
    ops: [
      { t: "Il concept e la traccia di cosa deve esistere", who: "io", r: 3 },
      { t: "Riprese, montaggio, fotografia di prodotto, illustrazione", who: "fuori", r: 3 },
      { t: "Scelta di cosa va in aria e cosa si scarta", who: "io", r: 3 },
      { t: "Controllo che quello che è tornato rispetti il brief, prima che lo veda il pubblico", who: "io", r: 3 },
    ],
    need: "Un video maker, che quasi sempre serve a commessa e non tutti i mesi.",
  },
  {
    id: "sviluppo",
    stage: "sito",
    effort: "consulenziale",
    outside: true,
    title: "Sviluppo e infrastruttura",
    short: "Sviluppo",
    claim: "Metto mano al tema quando serve. Il resto lo fa uno sviluppatore.",
    modes: ["servizi", "ecommerce"],
    terms: ["sviluppatore", "migrazione", "hosting", "integrazioni", "gestionale", "API"],
    ops: [
      { t: "Modifiche mirate a template e pagine", who: "io", r: 2 },
      { t: "Migrazioni, rifacimenti, integrazioni, gestionali", who: "fuori", r: 2 },
      { t: "Hosting, domini, certificati, posta", who: "fuori", r: 2 },
      { t: "Scrivere cosa deve fare lo sviluppatore, in modo che non lo interpreti", who: "io", r: 2 },
      { t: "Verificare che quello che è tornato indietro funzioni sul sito vero, non sul file", who: "io", r: 2 },
    ],
  },
];

/* ─────────────────────────────────────────────
   VISTA 2 — IL RITMO
───────────────────────────────────────────── */

export const MONTH_INTRO =
  "Quattro call in un mese normale, una a settimana. Tre quando una salta perché c'è solo da produrre. Cinque nel mese di un lancio. La call è dove si decide, non dove ci si aggiorna.";

export const MONTH_NOTE =
  "La cosa grossa del mese si chiude entro il giorno 14, non l'ultimo giorno. È una scelta: se slitta, ce ne accorgiamo con mezzo mese ancora davanti per rimediare, invece di scoprirlo a mese finito.";

export type WeekIcon = "signpost" | "flag" | "wrench" | "chart-line";

export type Week = {
  n: number;
  label: string;
  icon: WeekIcon;
  call: string;
  callNote: string;
  when: string;
  lands: string;
  landsKind: "consegna" | "milestone" | "nota" | "punto";
};

export const MONTH: Week[] = [
  {
    n: 1,
    icon: "signpost",
    label: "Si decide e si parte",
    call: "Call di apertura, lunedì",
    callNote: "Circa un'ora: cosa dicono i numeri del mese prima, cosa si fa adesso, chi fa cosa.",
    when: "Entro venerdì",
    lands: "Il primo pezzo del mese è online.",
    landsKind: "consegna",
  },
  {
    n: 2,
    icon: "flag",
    label: "Si chiude la cosa grossa",
    call: "Call di verifica",
    callNote: "Si legge il primo dato vero di quello che è partito. Se non va, si corregge adesso.",
    when: "Entro il giorno 14",
    lands: "La cosa grossa del mese è chiusa.",
    landsKind: "milestone",
  },
  {
    n: 3,
    icon: "wrench",
    label: "Si lavora, si parla meno",
    call: "Call solo se serve",
    callNote: "È la settimana del fare. Se non c'è niente da decidere la call salta, e te lo dico prima.",
    lands: "Una nota scritta: cosa è uscito e cosa viene dopo.",
    when: "Al posto della call",
    landsKind: "nota",
  },
  {
    n: 4,
    icon: "chart-line",
    label: "Si tira la riga",
    call: "Call di chiusura",
    callNote: "I numeri del mese in fila: cosa ha funzionato, cosa no, cosa ne consegue.",
    when: "A fine mese",
    lands: "Il punto scritto e la cosa grossa del mese dopo.",
    landsKind: "punto",
  },
];

/* L'avvio: succede una volta sola, ed e' l'unica parte
   del lavoro che non e' ciclica. */
export const OPENING = {
  when: "Giorni 1 · 14",
  badge: "Una volta sola",
  label: "L'avvio",
  claim: "Si guarda prima di toccare. Non produce ancora niente di visibile, e decide tutto il resto.",
  steps: [
    "Giorno 1 e 2: accessi, e censimento di cosa esiste davvero",
    "Settimana 1: lettura dei dati veri, del funnel, dello storico",
    "Settimana 2: call di confronto e obiettivo scritto, se non c'è già",
    "Il piano, con le priorità in ordine e il perché di quell'ordine",
    "Alla fine sai cosa si fa, in che ordine, e cosa non si fa",
  ],
  need: "Le chiavi di casa, due ore della tua testa, i numeri veri.",
  bridge: "Finito l'avvio, si entra nel ciclo. Da lì in poi ogni mese ha la stessa forma.",
};

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */

export const FAQ: { q: string; a: string }[] = [
  {
    q: "Mi conviene un'agenzia, o uno specialist Meta e uno specialist Google?",
    a: "Dipende da quanto spendi in pubblicità. Sotto una certa soglia tre fornitori sulla stessa cosa non aggiungono competenza: aggiungono riunioni, rimpalli e zone grigie in cui nessuno si sente responsabile. Le sovrapposizioni costano più della competenza che manca. Con budget importanti su entrambe le piattaforme uno specialist ha senso, e in quel caso lo cerco io, gli scrivo cosa deve fare e controllo il risultato.",
  },
  {
    q: "Quante persone mi servono in tutto?",
    a: "Il metro non è quanti canali hai aperto, è il peso del team rispetto al fatturato. Sotto i 30-40.000 € di fatturato mensile bastano una o due persone, più qualche commessa esterna quando c'è da produrre. Il team si costruisce passo passo man mano che serve, oppure tutto insieme con agenzia e freelance. Quello che conta di più è che ci sia qualcuno che si responsabilizza sul progetto invece di consegnare il suo pezzo e basta.",
  },
  {
    q: "In quanto tempo si vedono i risultati?",
    a: "Non te lo posso dire prima di aver guardato i tuoi numeri, e chi te lo dice prima sta indovinando. Le prime due settimane servono esattamente a questo: capire cosa è rotto, quanto è rotto e in che ordine si aggiusta. Alla fine di quelle due settimane hai un piano con delle date dentro. Se dopo aver guardato penso che non ci sia abbastanza margine per lavorarci, te lo dico e non partiamo.",
  },
  {
    q: "Di chi sono gli account, i dati e quello che si costruisce?",
    a: "Tuoi, sempre. Gli account si aprono a tuo nome e io entro come collaboratore, mai il contrario. Se un domani ci salutiamo, resta tutto dov'è e funzionante: liste, campagne, pagine, tracciamento, e la documentazione di come è fatto.",
  },
  {
    q: "Come si parte?",
    a: "Dopo una o due chiacchierate ci si dice sì, no o forse. Se è un sì c'è un anticipo, che serve a verificare che l'iniziativa sia reale da entrambe le parti, e si comincia il giorno dopo con la raccolta degli accessi. Ti lascio comunque un documento con quello che ci siamo detti: non è un contratto lungo, è la prova di come ragiono.",
  },
];
