# /brain-setup — Setup Brain Company per cliente

Configura un progetto AI completo (Brain Company) per un nuovo cliente di Nicola. Include interviste, struttura Claude Project, Notion workspace e integrazioni.

## Trigger
`/brain-setup [nome azienda]`

## Workflow

### 1. Intervista strutturata
Raccogli queste informazioni dal cliente (o dai dati disponibili):

**Business:**
- Nome azienda, settore, anno fondazione
- Fatturato annuale, margini, trend crescita
- Prodotti/servizi principali, pricing
- Target cliente ideale (B2B: dimensione, settore, ruolo decisore / B2C: demografia, comportamento)

**Team:**
- Organigramma essenziale (chi fa cosa)
- Chi si occupa di marketing attualmente
- Tool gia in uso (CRM, email, analytics, ads)

**Storico marketing:**
- Cosa hanno fatto finora (agenzie, campagne, budget)
- Cosa ha funzionato, cosa no
- Dati disponibili (GA4, pixel, CRM data)

**Obiettivi:**
- Obiettivo 12 mesi (numero specifico)
- KPI prioritari
- Vincoli (budget, tempo, risorse)

### 2. Claude Project
Crea la struttura del progetto Claude:

```
Progetto: [Nome Azienda] — Brain Company
├── Contesto aziendale (da intervista)
├── Unit economics (calcolati)
├── Competitor analysis
├── Piano strategico (aggiornato mensilmente)
├── Backlog azioni (prioritizzato)
├── Report mensili
└── Decisioni prese (log)
```

**System prompt del progetto:**
- Chi e l'azienda, cosa fa, chi sono i clienti
- KPI target e vincoli
- Tono: diretto, basato su dati, niente fuffa
- Accesso a: [lista tool collegati]

### 3. Notion Workspace
Struttura suggerita:
```
[Nome Azienda] — Playbook
├── Dashboard (KPI live)
├── Strategia
│   ├── Piano trimestrale
│   ├── Budget allocation
│   └── Competitor watch
├── Esecuzione
│   ├── Campagne attive
│   ├── Contenuti calendario
│   └── A/B test log
├── Dati
│   ├── Report settimanali
│   ├── Unit economics
│   └── Forecasting
└── Decisioni
    ├── Log decisioni
    └── Retrospettive
```

### 4. Integrazioni
Checklist tool da collegare:
- [ ] Gmail — comunicazione cliente
- [ ] Slack/WhatsApp — canale diretto
- [ ] Notion — playbook operativo
- [ ] Google Analytics 4 — dati traffico
- [ ] Meta Ads Manager — campagne
- [ ] Google Ads — campagne search
- [ ] CRM (quale?) — pipeline vendita
- [ ] Fatturazione (quale?) — dati finanziari
- [ ] Shopify/WooCommerce (se e-commerce) — dati vendite

### 5. Skills personalizzate
Definisci 3-5 skill per il progetto:
- `/report` — genera report settimanale dai dati
- `/forecast` — proiezione revenue su X mesi
- `/campaign` — analizza performance campagna specifica
- `/competitor` — aggiornamento competitor
- `/brief` — genera brief per nuova campagna/contenuto

### 6. Automazioni
Identifica automazioni possibili:
- Report automatico settimanale (N8N → Claude → Notion → Email)
- Alert su KPI fuori range
- Risposta automatica a domande frequenti del team
- Generazione bozze contenuti da calendario editoriale

## Output
- Documento struttura Brain Company (markdown)
- Template Notion (link o export)
- Lista integrazioni con stato (attivo/da configurare)
- 3-5 skill definitions
- Piano automazioni con priorita

## Nota proprietà
Il Brain Company e di proprieta del cliente. Costo infrastruttura: ~€90/mese (abbonamento Anthropic Claude Pro). La proprieta intellettuale (contesto, skill, automazioni) e interamente del cliente. Puo essere trasferito in qualsiasi momento.
