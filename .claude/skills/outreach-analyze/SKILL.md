# /outreach-analyze — Analisi completa prospect

Analizza un prospect per preparare un outreach personalizzato. Prende come input il nome dell'azienda e/o URL del sito web.

## Trigger
Quando l'utente chiede di analizzare un prospect, usa `/outreach-analyze [nome azienda]` o `/outreach-analyze [URL]`.

## Workflow

### 1. Raccolta informazioni
Usa WebSearch e WebFetch per raccogliere:
- **Sito web**: struttura, UX, velocita, CTA, tracking (cerca pixel Meta, GA4 nel source)
- **Social**: LinkedIn aziendale, Instagram, Facebook — frequenza post, engagement, tono
- **Competitor**: identifica 2-3 competitor diretti nel settore
- **Ads**: cerca su Meta Ad Library (facebook.com/ads/library) e Google Ads Transparency
- **Team**: chi e il decisore (CEO, marketing manager, founder)

### 2. Analisi
Per ogni area, valuta:
- Cosa fanno bene (punti di forza da riconoscere)
- Dove stanno perdendo opportunita (gap concreti)
- Cosa potremmo fare di diverso (insight per l'outreach)

### 3. Output
Produci un report markdown strutturato:

```markdown
# Analisi Prospect: [Nome Azienda]
Data: [data]

## Overview
- Settore: ...
- Fatturato stimato: ...
- Dimensione team: ...
- Decisore: [nome], [ruolo]

## Sito Web
- URL: ...
- Punti di forza: ...
- Gap: ...
- Tracking: GA4 [si/no], Pixel Meta [si/no], Consent Mode [si/no]

## Social
- Canali attivi: ...
- Frequenza: ...
- Engagement: ...
- Tono: ...

## Competitor
- [Competitor 1]: punti di forza vs prospect
- [Competitor 2]: punti di forza vs prospect

## Ads Attive
- Meta: [si/no] — descrizione
- Google: [si/no] — descrizione
- Budget stimato: ...

## Gap & Opportunita
1. [Gap principale con impatto stimato]
2. [Gap secondario]
3. [Opportunita non sfruttata]

## Insight per Outreach
- Angolo consigliato: ...
- Tono suggerito: ...
- Leva emotiva: ...
- Cosa NON dire: ...
```

## Strumenti disponibili

### Scraping & Data
- **Apify**: per scraping profondo di siti web, social, ads. Usa gli actor disponibili:
  - `apify/web-scraper` — scraping generico pagine web
  - `apify/instagram-scraper` — profilo IG, post, engagement
  - `apify/facebook-ads-scraper` — ads attive da Meta Ad Library
  - `apify/google-ads-scraper` — ads Google Ads Transparency
- **WebFetch**: per pagine singole e source code
- **WebSearch**: per ricerca competitor e informazioni pubbliche

### Copy & Content
- **Skill Copywriter 4**: se disponibile, usala per analizzare il copy del prospect e generare angoli di outreach efficaci
- **Perplexity** (via Nicola): per ricerca approfondita settore/competitor

### Integrations
- **Notion**: per salvare il brief nella pipeline outreach (se configurato)
- **Gmail**: per verificare eventuali contatti precedenti con il prospect

## Regole
- Non inventare dati — se non trovi qualcosa, scrivi "non disponibile"
- Sii specifico: "il sito non ha tracking server-side" non "il sito potrebbe migliorare"
- Tono professionale, non critico. "Ho notato che..." non "State sbagliando..."
- L'output deve essere utilizzabile direttamente per creare la pagina outreach
