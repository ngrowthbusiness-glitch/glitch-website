# Regole per agenti AI

## Next.js 16
Questa versione ha breaking changes rispetto ai training data. Prima di scrivere codice:
1. Leggi le guide in `node_modules/next/dist/docs/`
2. Rispetta deprecation notices
3. Server Components di default — usa "use client" solo quando serve

## Stile codice
- CSS inline nelle pagine via `<style>{...}</style>` (pattern del progetto)
- Classi globali `s-*` da globals.css quando possibile
- HTML entities per caratteri speciali (&egrave;, &mdash;, etc.)
- SVG inline per icone e grafici (no dipendenze esterne)
- Responsive: breakpoint 900px (tablet), 480px (mobile)

## Cosa NON fare
- Non creare file README.md o documentazione non richiesta
- Non aggiungere dipendenze npm senza chiedere
- Non modificare package.json senza motivo
- Non toccare i file outreach (sistema in sviluppo separato)
- Non usare emoji nei file di codice
- Non creare astrazioni premature — codice inline va bene

## Workflow
1. Leggere il file prima di modificarlo
2. Build check dopo ogni modifica: `npm run build`
3. Commit solo quando richiesto dall'utente
4. Push solo quando richiesto dall'utente
5. Verificare deploy Vercel dopo ogni push
