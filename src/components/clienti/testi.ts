/* La pagina Clienti (concept «La regia», scelto da Nicola il 2026-11-05). Testi dalla ricerca del ticket 13
   (`_work/restyling-sito/ricerca/prima-e-dopo/`), anonimi. Regole di Nicola: niente crescita economica e niente
   numeri, solo i clienti seguiti adesso da Fractional CMO, il nome solo con il loro sì.
   La frase sulle vendite della scuola online e' di Nicola (chat del 2026-11-05), non dei file. */

export type Esito = "regia" | "blocco";
export type Icona =
  | "persona" | "gruppo" | "megafono" | "modulo" | "fogli" | "ingranaggio" | "pagina"
  | "ripeti" | "pacco" | "video" | "busta" | "chat" | "negozio" | "sconto" | "conti";

/* p: come sta il nodo prima («spento» = fermo, «collo» = dove si perde la gente) */
export type Nodo = { t: string; ico: Icona; p?: "spento" | "collo" };

export type Cliente = {
  id: string;
  tab: string;
  chi: string;
  da: string;
  esito: Esito;
  prima: string;
  mancava: string;
  fatto: string;
  adesso: string;
  nodi: Nodo[];
  fili: [number, number][];
  freno?: { i: number; t: string };
  dPrima: string;
  dAdesso: string;
};

export const TESTA = {
  k: "Clienti",
  titolo: "Prima di crescere, si mette ordine.",
  sotto:
    "I clienti che seguo adesso, senza nomi. Ognuno è arrivato con un problema diverso. Quello che mancava, quasi sempre, era qualcuno che tenesse il filo. E quando si mette ordine si capisce cosa frena davvero: spesso non è il marketing.",
  nota: "Il nome di un'azienda compare solo quando è lei a dire di sì.",
};

export const ESITI: Record<Esito, { t: string; b: string }> = {
  regia: { t: "Regia in piedi", b: "Chi fa cosa è scritto, le decisioni si prendono e restano." },
  blocco: { t: "Blocco trovato", b: "Si sa cosa frena la crescita, e se è dentro l'azienda o nel marketing." },
};

export const CLIENTI: Cliente[] = [
  {
    id: "formazione",
    tab: "Formazione",
    chi: "Piccola azienda di formazione, costruita sul volto della fondatrice",
    da: "con me da ottobre 2026",
    esito: "regia",
    prima: "Quando la fondatrice ha dovuto fermarsi, le vendite hanno rallentato e la cassa si è fatta stretta.",
    mancava:
      "Una squadra di persone brave, ognuna con il suo pezzo, e nessuno che tenesse il filo. Ferma lei, ferma la macchina: pubblicità spenta, contatti sparsi in decine di fogli.",
    fatto:
      "Prima di spendere ho messo ordine: un incontro a settimana con la squadra, una persona di riferimento, un solo posto per i contatti, le cose da fare in fila.",
    adesso: "La regia c'è: chi fa cosa è scritto, le decisioni si prendono e restano. Per dire se si vende di più è presto.",
    nodi: [
      { t: "La fondatrice", ico: "persona", p: "spento" },
      { t: "La squadra", ico: "gruppo" },
      { t: "La pubblicità", ico: "megafono", p: "spento" },
      { t: "Le iscrizioni", ico: "modulo" },
      { t: "I contatti", ico: "fogli" },
    ],
    fili: [[0, 1], [1, 3], [3, 4]],
    dPrima: "Persone brave, ognuna con il suo pezzo. Nessuno teneva il filo.",
    dAdesso: "Un incontro a settimana, un posto solo per i contatti, le cose in fila.",
  },
  {
    id: "scuola",
    tab: "Scuola online",
    chi: "Piccola scuola online in abbonamento",
    da: "con me da marzo 2026",
    esito: "regia",
    prima: "Raccoglieva iscritti ogni anno con una campagna gratuita. Un anno ha speso di più e ha raccolto meno.",
    mancava:
      "Le persone brave c'erano, chi insegna e chi segue la tecnica. Mancava chi guardasse tutta la strada, dalla pubblicità all'abbonamento.",
    fatto:
      "Ho riletto i numeri degli anni prima: la pubblicità funzionava, era la pagina d'iscrizione a perdere metà della gente. Pagina rifatta, e deciso prima quando spingere e quando fermarsi.",
    adesso: "C'è un obiettivo scritto, un calendario dei lanci e chi fa cosa. E le vendite stanno crescendo.",
    nodi: [
      { t: "Chi insegna", ico: "persona" },
      { t: "La tecnica", ico: "ingranaggio" },
      { t: "La pubblicità", ico: "megafono" },
      { t: "La pagina|d'iscrizione", ico: "pagina", p: "collo" },
      { t: "L'abbonamento", ico: "ripeti" },
    ],
    fili: [[2, 3], [0, 1]],
    dPrima: "La pubblicità tirava. Era la pagina d'iscrizione a perdere metà della gente.",
    dAdesso: "Pagina rifatta, obiettivo e calendario scritti, regole decise prima di spendere.",
  },
  {
    id: "integratori",
    tab: "Integratori naturali",
    chi: "Piccolo produttore di integratori naturali, online e nei negozi",
    da: "con me da settembre 2026",
    esito: "blocco",
    prima: "Vendeva online da anni e pagava un'agenzia per post e inserzioni. Sentiva che la vendita non era mai partita davvero.",
    mancava:
      "Tante persone, ognuna con un pezzo, e nessuno che decidesse cosa serviva per vendere. E un conto mai fatto: quello che restava su un barattolo era meno di quanto costava trovare un cliente.",
    fatto:
      "Prima i conti, poi il messaggio, poi le pagine. Chiusi i lavori che non servivano a vendere, costruita un'offerta da più pezzi e una spesa di prova decisa prima di partire.",
    adesso:
      "Si sa cosa frenava: non chi faceva le inserzioni, ma un'offerta da un pezzo solo. Il primo test è partito; i numeri si leggono a fine prova.",
    nodi: [
      { t: "Il titolare", ico: "persona" },
      { t: "L'agenzia", ico: "gruppo" },
      { t: "Le inserzioni", ico: "megafono" },
      { t: "Le pagine", ico: "pagina" },
      { t: "L'offerta", ico: "pacco" },
    ],
    fili: [[1, 2], [2, 3], [0, 1]],
    freno: { i: 4, t: "Un pezzo solo non si ripaga" },
    dPrima: "Tante persone, ognuna con un pezzo. Il conto dell'offerta non l'aveva fatto nessuno.",
    dAdesso: "Il freno era l'offerta, non le inserzioni. Il primo test è partito.",
  },
  {
    id: "abbigliamento",
    tab: "Abbigliamento uomo",
    chi: "Piccolo negozio di abbigliamento da uomo, con il titolare nei video",
    da: "con me da settembre 2026",
    esito: "blocco",
    prima: "Vendeva grazie ai video del titolare. Da mesi i video giravano sempre meno, e il mese con più visite era quello che rendeva meno.",
    mancava:
      "Il titolare faceva tutto da solo, piano compreso. Mancava chi leggesse i numeri fino in fondo: una parte delle vendite passava dalla chat senza lasciare traccia.",
    fatto:
      "Ho tolto metà dei cantieri, rifatto il sito perché lui possa cambiarlo da solo, fatto ripartire le mail ai suoi iscritti, cercato nei video quello che li faceva girare.",
    adesso:
      "Il freno è chiaro: i video avevano smesso di girare quando era stato lasciato il formato che funzionava. I numeri si leggono a fine percorso.",
    nodi: [
      { t: "Il titolare", ico: "persona" },
      { t: "I video", ico: "video" },
      { t: "Il sito", ico: "pagina" },
      { t: "Le mail", ico: "busta" },
      { t: "La chat", ico: "chat", p: "spento" },
    ],
    fili: [[0, 1], [0, 2], [0, 3], [0, 4]],
    freno: { i: 1, t: "Il formato lasciato" },
    dPrima: "Il titolare faceva tutto da solo. Le vendite in chat non lasciavano traccia.",
    dAdesso: "Metà dei cantieri chiusi, sito e mail ripartiti. Il freno è nei video.",
  },
  {
    id: "benessere",
    tab: "Benessere online",
    chi: "Negozio online di prodotti per il benessere",
    da: "con me da aprile 2026",
    esito: "blocco",
    prima:
      "Era cresciuto in fretta vendendo a sconto e comprando clienti con la pubblicità. Quando la pubblicità si è fermata, i clienti nuovi sono quasi spariti.",
    mancava:
      "Una lettura onesta dei conti. Il primo piano, anche il mio, aveva messo il crollo nel mese sbagliato: mancavano dati nel foglio, non vendite.",
    fatto:
      "Ho rifatto i conti su tutti gli anni, contro il mio stesso piano. Si è deciso di smettere di vendere a sconto e di dire prima, in chiaro, quello che la cliente scopriva dopo.",
    adesso: "Il blocco è chiaro e non si risolve con più pubblicità. Il negozio nuovo non è ancora acceso: è presto per dire se funziona.",
    nodi: [
      { t: "Il negozio", ico: "negozio" },
      { t: "La pubblicità", ico: "megafono" },
      { t: "Lo sconto", ico: "sconto" },
      { t: "I clienti nuovi", ico: "gruppo" },
      { t: "I conti", ico: "conti", p: "spento" },
    ],
    fili: [[1, 3], [2, 0], [3, 0]],
    freno: { i: 2, t: "Si cresceva solo a sconto" },
    dPrima: "Si cresceva comprando clienti e vendendo a sconto. I conti non li leggeva nessuno fino in fondo.",
    dAdesso: "Conti rifatti su tutti gli anni: il blocco non si risolve con più pubblicità.",
  },
];

export const TORNA = {
  titolo: "In tutti e cinque, le stesse tre cose.",
  voci: [
    {
      b: "Mancava qualcuno che tenesse il filo.",
      t: "Persone brave, ognuna con il suo pezzo: il titolare, l'agenzia, chi segue la tecnica. Nessuno guardava tutta la strada, dalla pubblicità al cliente che torna.",
    },
    {
      b: "Il freno, spesso, era dentro l'azienda.",
      t: "Un'offerta che nessuna pubblicità poteva ripagare, uno sconto diventato abitudine, un formato lasciato per strada. Si vede solo quando i conti si leggono fino in fondo.",
    },
    {
      b: "Prima l'ordine, poi la crescita.",
      t: "Prima di spingere si mette in fila quello che conta, si decide chi fa cosa e quando si guarda il risultato. Poi si spinge, con una misura che regge.",
    },
  ],
};
