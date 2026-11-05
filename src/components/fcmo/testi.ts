/* I testi della pagina Fractional CMO: copy approvato da Nicola il 2026-11-04 (lavagna del copy,
   varianti A), con le correzioni di Nicola del 2026-11-05: niente cifra nel prezzo (deve far capire che non
   costa poco senza dirlo), aziende di tutta Italia per cui il digitale conta, le soluzioni su misura con l'AI,
   e le mani come mock up e linee guida per un piccolo team, non operativita' al 100%.
   Servono anche ai dati strutturati FAQ in app/(site)/fractional-cmo/page.tsx. */

export const FCMO = {
  seoTitolo: "Fractional CMO: cos'è, cosa fa e quanto costa · Nicola Serrao",
  seoDescrizione:
    "Un direttore marketing esterno, per il tempo che serve: decide le priorità, coordina agenzia e fornitori, risponde dei risultati.",
  titolo: "Fractional CMO: un direttore marketing, per il tempo che serve.",
  sotto:
    "In italiano si dice anche direttore marketing esterno. È la persona che decide dove va il marketing della tua azienda, tiene insieme chi ci lavora e risponde dei risultati. Senza essere assunta.",
  cosa: [
    { b: "Capisce dove sei.", t: "Prima di toccare qualcosa guarda i numeri veri: cosa porta soldi, cosa ne costa, dove si perde la gente." },
    { b: "Decide la cosa che conta adesso.", t: "Le priorità scritte, in ordine. Una cosa grossa al mese, chiusa." },
    { b: "Dice cosa non si fa.", t: "Anche quando è la cosa su cui ti eri intestardito." },
    { b: "Tiene tutti sulla stessa rotta.", t: "Tu, chi lavora con te, l'agenzia, i fornitori." },
    {
      b: "Quando serve, mette le mani.",
      t: "Mock up, linee guida, i pezzi che sbloccano il resto. Con un piccolo team sotto si va meglio: lo guida e lo segue da vicino.",
    },
  ],
  serve: [
    "Funziona tutto, ma nessuno tiene la regia",
    "Spendi in pubblicità e non sai cosa rende davvero",
    "Agenzia, sviluppatore e fornitori lavorano ognuno per conto suo",
    "Vuoi crescere e non sai da dove cominciare",
  ],
  nonServe: [
    "Ti manca solo chi esegue un compito preciso: ti serve uno specialista",
    "Il prodotto non vende ancora: prima va sistemato quello",
    "Cerchi qualcuno che ti dica sempre di sì",
  ],
  colonne: [{ t: "Agenzia" }, { t: "Fractional CMO" }, { t: "Dipendente" }],
  righe: [
    {
      r: "Chi decide cosa si fa",
      c: ["Il senior vende, il junior esegue.", "Lui, con te, priorità scritte.", "Aspetta che gli dici cosa fare."],
    },
    {
      r: "Cosa guarda",
      c: ["Il rendimento delle sue campagne.", "I tuoi margini, non solo le metriche.", "La sua area."],
    },
    {
      r: "Quanto del percorso copre",
      c: ["Quello che vende.", "Tutto, dal traffico al cliente che torna.", "Di solito una competenza sola."],
    },
  ],
  prezzoTitolo: "Una fee fissa, mese per mese.",
  /* i segnali che non e' un fornitore a basso costo, senza dire la cifra: tutti veri */
  prezzoSegni: [
    "Poche aziende alla volta, seguite in profondità: è il prezzo di una regia senior, non di un fornitore",
    "La cifra te la dico dopo la prima chiacchierata, quando ho visto i numeri e so quanto lavoro c'è",
    "Se dopo aver guardato i numeri penso che non ci sia margine, te lo dico e non partiamo",
  ],
  /* il testo approvato, senza ripetere il titolo della scheda */
  costoTesto: "Senza vincoli. Non vendo ore e non le conto: conterebbero la cosa sbagliata.",
  incluso: [
    "La direzione: priorità, piano, lettura dei numeri",
    "Il coordinamento di chi lavora con te",
    "Mock up e linee guida: come va fatto il lavoro, e il controllo che sia fatto così",
  ],
  escluso: [
    "Il budget della pubblicità",
    "I fornitori esterni quando servono: video, foto, sviluppo pesante",
    "L'esecuzione di tutti i giorni: con un piccolo team sotto si va meglio, e lo guido io",
  ],
  passi: [
    "Una o due chiacchierate, poi un sì, un no o un forse",
    "Se è sì, i primi due giorni raccolgo gli accessi e guardo tutto",
    "Poi il piano: le priorità in ordine, con il perché",
    "Da lì, il ciclo di ogni mese: si prova, si guarda, si decide",
  ],
  faq: [
    {
      q: "Quanto costa un Fractional CMO?",
      a: "Una fee mensile fissa, senza vincoli: il prezzo di una regia senior, per il tempo che serve. La cifra dipende da quanto lavoro c'è e da chi lavora già con te, e la dico dopo la prima chiacchierata, quando ho visto i numeri.",
    },
    {
      q: "Che differenza c'è con un temporary manager?",
      a: "Il temporary manager entra a tempo pieno per un periodo e una fase precisa. Il Fractional CMO segue più aziende, una parte del tempo ciascuna, e resta finché serve.",
    },
    {
      q: "E con un consulente marketing?",
      a: "Il consulente dice cosa fare. Il Fractional CMO lo decide con te, lo fa succedere e ne risponde.",
    },
    {
      q: "Lavori solo nelle Marche?",
      a: "Sono ad Agugliano, vicino Ancona. Lavoro con aziende di tutta Italia per cui il digitale conta: marketing e vendita online. Con chi è vicino ci si vede anche di persona.",
    },
    {
      q: "Usi l'intelligenza artificiale?",
      a: "Molto: mi rende più veloce, e il tempo che risparmio va sulle decisioni. E se in azienda c'è un processo che si può alleggerire, posso costruire una soluzione su misura con l'AI.",
    },
  ],
  ioTesto: "Prima la direzione, poi le mani: come lo faccio io, con che ritmo e chi fa cosa, è scritto in Il metodo.",
};
