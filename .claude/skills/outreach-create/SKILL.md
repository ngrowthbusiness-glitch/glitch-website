# /outreach-create — Crea pagina outreach + email

Genera una pagina custom per il prospect e la sequenza email completa. Richiede che esista gia un brief/analisi (output di /outreach-analyze).

## Trigger
`/outreach-create [slug]` — dove slug e il nome del prospect in kebab-case.

## Prerequisiti
- Brief del prospect completato (output di /outreach-analyze)
- Approvazione dell'utente sull'angolo/insight da usare

## Workflow

### 1. Pagina Custom
Crea `src/app/outreach/[slug]/page.tsx` con:

**Struttura pagina:**
```
- Topbar minimale (logo Nicola + nome prospect)
- Video Loom embed (placeholder se URL non fornito)
- 2-3 blocchi "Oggi / Domani" (insight specifici dal brief)
- CTA: WhatsApp + email
- Footer discreto
```

**Design system:**
- Sfondo: #0a0e0d (dark) per sezione Nicola
- Sfondo prospect: palette custom (derivata dal brand del prospect)
- Font: Playfair Display + DM Mono
- Accent: teal #00fffc per elementi Nicola
- Max-width: 1400px, responsive 900px/480px

**Contenuto:**
- NON svelare la strategia completa — crea curiosita
- Mostra che hai studiato il loro business (citare dati specifici dal brief)
- Massimo 3 insight, ognuno con "oggi" (come fanno) e "domani" (cosa potrebbe cambiare)
- Tono: peer-to-peer, non consulente-a-PMI

### 2. Email
Genera 3 email:

**Email 1 — Primo contatto:**
- Oggetto: personalizzato, curioso, non spam. Pattern:
  - "[Nome], ho dato un'occhiata a [sito]"
  - "Un'idea per [azienda] — 2 minuti"
  - "[Nome], una cosa che ho notato su [tema specifico]"
- Body: max 5 righe. Mostra che hai studiato. Link alla pagina. Nessun pitch.
- Firma: Nicola Serrao, Fractional CMO

**Email 2 — Follow-up (3 giorni):**
- Oggetto: "Re: [oggetto originale]" o variante breve
- Body: 2-3 righe. Riferimento alla prima email. Un insight aggiuntivo. Link.

**Email 3 — Ultimo follow-up (7 giorni):**
- Oggetto: breve, diretto
- Body: 2 righe. "Capisco se non e il momento. La pagina resta online se vuoi darci un'occhiata."
- Nessun push, nessuna urgenza artificiale.

### 3. Output
- File pagina Next.js pronto per il deploy
- 3 email in formato testo (pronte per copia-incolla)
- Redirect rule per `next.config.ts` (es. /[slug] → /outreach/[slug])

## Regole copy
- MAI svelare la strategia completa — la strategia si discute in call
- MAI criticare apertamente — "ho notato" non "state sbagliando"
- MAI mentire sui dati — se non hai un dato, non inventarlo
- Tono: curioso, competente, non disperato
- L'obiettivo e ottenere una call di 15 minuti, non vendere
