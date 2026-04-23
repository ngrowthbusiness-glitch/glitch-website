# /site-check — QA completo del sito

Esegue un controllo qualita completo su nicolaserrao.com. Da usare prima di ogni deploy importante o dopo sessioni di lavoro intensive.

## Trigger
`/site-check` (nessun argomento richiesto)

## Checklist

### 1. Build
```bash
cd nicolaserrao.com && npm run build
```
- Zero errori TypeScript
- Zero errori di compilazione
- Tutte le pagine generate correttamente

### 2. Pagine
Verifica che tutte queste route esistano nel build output:
- `/` (homepage)
- `/cosa-posso-fare`
- `/cosa-ho-fatto` + 4 case study verticali
- `/metodo-glitch`
- `/blog` + articoli individuali
- `/risorse` + 3 risorse AI
- `/privacy-policy`
- `/sitemap.xml`, `/robots.txt`

### 3. Deploy Vercel
Usa MCP Vercel per verificare:
- Ultimo deployment: stato READY
- Nessun deployment in ERROR
- Commit SHA corrisponde all'ultimo push

### 4. Responsive
Per ogni pagina, verifica che gli stili abbiano breakpoint:
- 1400px (max-width container)
- 900px (tablet)
- 480px (mobile)

### 5. Link
Verifica che tutti i link interni funzionino:
- Navbar links (Home, Perche conoscerci, Cosa ho fatto, Metodo, Blog, Risorse)
- CTA WhatsApp (wa.me/393385691369)
- CTA Email (marketing@nicolaserrao.com)
- Link case study dalle card
- Link risorse dalla homepage
- Bubble WhatsApp e Risorse nel layout

### 6. Risorse AI
Per ogni risorsa, verifica:
- La pagina carica senza errori
- Il form e interattivo
- L'API route esiste (`/api/risorse/marketing-audit`, `/api/risorse/kpi-calculator`, `/api/risorse/fractional-cmo`)
- `ANTHROPIC_API_KEY` e configurata in .env.local

### 7. SEO
- Ogni pagina ha metadata (title + description)
- Homepage ha JSON-LD (Person + Organization)
- Articoli blog hanno JSON-LD Article
- sitemap.xml include tutte le pagine

### 8. Output
Produci un report:
```
SITE CHECK — nicolaserrao.com
Data: [data]

Build:        [PASS/FAIL]
Pagine:       [X/Y] route OK
Deploy:       [READY/ERROR] — commit [SHA]
Responsive:   [PASS/nota]
Link:         [X/Y] funzionanti
Risorse AI:   [X/3] endpoint attivi
SEO:          [PASS/nota]

Issues trovati:
- [lista]
```
