# nicolaserrao.com — Progetto principale

## Chi è Nicola
Nicola Serrao — Fractional CMO & AI-Powered Strategist. P.IVA italiana, basato ad Agugliano (AN).
Lavora con PMI e e-commerce italiani. Pochi clienti (max 3), massima responsabilità.
Prezzo: da €1.500/mese. Engagement minimo 3 mesi.

## Stack tecnico
- **Framework**: Next.js 16.2.1 (Turbopack) — ATTENZIONE: breaking changes vs training data. Leggere docs in node_modules/next/dist/docs/
- **Deploy**: Vercel (auto-deploy da git push origin main)
- **Repo**: github.com/ngrowthbusiness-glitch/glitch-website
- **Styling**: CSS inline in page components + globals.css (design system s-*)
- **AI**: Anthropic Claude SDK (@anthropic-ai/sdk) per risorse streaming
- **Font**: Playfair Display (heading) + DM Mono (body/mono)
- **Palette**: teal #00fffc, bg #0a0e0d, text #e8f5f2

## Design system
Classi globali in `src/app/globals.css` con prefisso `s-`:
- Layout: s-wrap (1400px), s-page (padding 80px 60px 120px)
- Typography: s-h1, s-h2, s-h3, s-eyebrow, s-subtitle, s-body
- Components: s-btn-primary, s-btn-secondary, s-card, s-card-teal, s-badge, s-pill
- Blocks: s-divider, s-quote, s-cta, s-metric-value, s-metric-label, s-link

## Struttura sito
```
/ (homepage) — 7 sezioni: hero, FCMO, ticker, timeline, brain company, case studies, CTA
/cosa-posso-fare — "Perché conoscerci" (approccio dottore, non venditore)
/cosa-ho-fatto — Case study + link a pagine verticali
/cosa-ho-fatto/{slug} — 4 case study verticali con SVG
/metodo-glitch — Framework 6 fasi
/blog — 4 articoli (Analytics, Metodo, Strategia)
/risorse — 3 tool AI-powered (Audit, KPI Calculator, Fractional CMO Check)
/risorse/{slug} — Singole risorse con form + streaming AI
```

## Convenzioni
- Lingua comunicazione: italiano
- Lingua codice: inglese
- Commit: conventional commits (feat/fix/refactor/chore)
- Non aggiungere file che non servono
- Non toccare outreach (sistema separato, in sviluppo)
- Build check obbligatorio prima di ogni push: `npm run build`
- Mai pushare codice che non compila

## Contatti sito
- WhatsApp: https://wa.me/393385691369
- Email: marketing@nicolaserrao.com
- LinkedIn: linkedin.com/in/nicola-serrao/

@AGENTS.md
