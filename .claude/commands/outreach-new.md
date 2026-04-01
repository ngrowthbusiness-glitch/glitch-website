# Crea nuova landing outreach

L'utente ti darà un brief su un prospect (analisi Perplexity, insight, note).
Il tuo compito è generare un file JSON di configurazione outreach completo.

## Input atteso

L'utente fornisce:
- Nome azienda e settore
- Analisi/ricerca fatta (Perplexity o simile)
- Insight specifici sul business del prospect
- Eventuali preferenze su palette/font

## Output

1. Genera il file JSON in `src/data/outreach/configs/{slug}.json`
2. Segui la struttura OutreachConfig definita in `src/data/outreach/types.ts`

## Regole per il copy

### Struttura v2 delle sezioni (OBBLIGATORIA):
1. **"insight"** — "Cosa vedo": 2-3 osservazioni specifiche che dimostrano studio del business (dati mercato, gap competitor, opportunità concrete)
2. **"problem"** — Il vero problema: specifico, doloroso, centrato sul prospect. NON generico.
3. **"teaser"** — Teaser strategia: suggerisci COSA faresti senza dire COME. Max 2-3 item brevi e provocatori. Crea curiosità.

### Tone of voice:
- Diretto, rispettoso, competente — mai arrogante
- Usa il linguaggio del settore del prospect
- Centra il PROBLEMA, non le tue competenze
- Mostra insight non ovvi (numeri specifici, trend, competitor analysis)

### DON'T:
- Non svelare la strategia nel dettaglio (il prospect deve voler parlare con te)
- Non usare gergo marketing generico
- Non superare 3 sezioni + CTA
- Non usare "proposta" nell'header

### CTA:
- `title`: una domanda provocatoria legata al business del prospect
- `subtitle`: breve, che abbassa la barriera
- `ctaQuestion`: la domanda forte per la box interattiva (es. "Se potessi cambiare una cosa nel vostro marketing domani, quale sarebbe?")
- `whatsappText` e `emailSubject`: personalizzati

### Palette:
- Scegli colori che richiamano il brand/settore del prospect
- Background scuro = testo chiaro; Background chiaro = testo scuro
- Heading font in base al positioning (serif = premium, sans = tech/modern)

## Dopo la generazione

1. Ricorda all'utente di aggiornare Notion con: company, sector, slug, URL, status "draft", data
2. Per deployare: commit + push (triggera build Vercel)
3. Dopo l'invio: aggiornare status su Notion a "sent"
