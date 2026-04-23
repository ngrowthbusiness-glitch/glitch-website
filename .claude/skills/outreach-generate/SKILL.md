---
name: outreach-generate
description: >
  Genera landing page di outreach personalizzate per prospect. Usa questa skill ogni volta che
  l'utente menziona un nuovo prospect, vuole creare una landing di outreach, dice "nuovo prospect",
  "outreach per [azienda]", "landing per [azienda]", o qualsiasi variante. Anche se l'utente
  fornisce solo un nome azienda o un URL, questa skill va attivata. Copre l'intero flusso:
  ricerca → insight → confronto con l'utente → generazione landing → deploy.
---

# Outreach Generate

Skill per generare landing page di outreach one-screen personalizzate per prospect B2B.
Il proprietario del sito è **Nicola Serrao**, Digital Marketing Strategist (nicolaserrao.com).

## Filosofia

Nicola individua un prospect, lo studia, e gli invia una landing page personalizzata con un video
dove si presenta e spiega perché dovrebbero parlare. La landing deve funzionare in 15-20 secondi:
video in primo piano, pochi blocchi sintetici sotto, CTA diretta.

Non stiamo vendendo un servizio. Stiamo dimostrando competenza attraverso un gesto concreto:
"Ho studiato il tuo business e ho delle idee. Parliamone."

## Workflow completo

Ogni volta che l'utente attiva questa skill, genera SUBITO una TodoList con questi step
e procedi uno alla volta. L'utente deve poter vedere il progresso.

### Step 1: Raccolta info iniziali

Se l'utente ha fornito solo un nome o URL, chiedi:
- Nome azienda e URL del sito
- Come li ha trovati / perché li trova interessanti (opzionale ma utile)
- Ha già un contatto diretto? (nome, ruolo)

Se l'utente ha già fornito un brief dettagliato, salta le domande e vai allo step 2.

### Step 2: Ricerca approfondita

Usa WebSearch e WebFetch per raccogliere informazioni sul prospect:

1. **Sito web**: analizza homepage, pagine servizi/prodotti, about, blog. Nota: design, copy,
   posizionamento, call to action, UX
2. **Presenza digitale**: cerca "[azienda] + recensioni", "[azienda] + linkedin",
   "[azienda] + settore". Guarda se hanno social attivi, Google Ads, campagne in corso
3. **Settore e competitor**: cerca i principali competitor del prospect e come si posizionano online
4. **Pain points potenziali**: basandoti su quello che vedi, identifica 3-5 gap/opportunita
   concrete nel loro marketing digitale

### Step 3: Presentazione insight (MOMENTO CHIAVE)

Presenta a Nicola un riepilogo strutturato:

**Format del riepilogo:**
```
## [Nome Azienda] — Analisi

**Settore**: ...
**Sito**: ...
**Prima impressione**: 2-3 righe su cosa funziona e cosa no

**Insight principali** (questi diventeranno il cuore del video e della landing):

1. [Insight specifico con evidenza concreta]
2. [Insight specifico con evidenza concreta]  
3. [Insight specifico con evidenza concreta]

**Angolo proposto per il video**: in 1-2 frasi, come imposteresti il messaggio
```

Gli insight devono essere SPECIFICI, non generici. Non "il vostro sito potrebbe migliorare"
ma "la vostra pagina servizi ha 6 click per arrivare al form contatto — i competitor diretti
ne hanno 2". Numeri, confronti, dati visibili.

**FERMATI QUI e aspetta il feedback di Nicola.** Gli insight sono il cuore di tutto —
lui deve validarli, modificarli, o aggiungerne prima di proseguire.

### Step 4: Generazione config JSON

Dopo l'approvazione degli insight, genera il file JSON in:
`src/data/outreach/configs/{slug}.json`

Lo slug si ricava dal nome azienda: lowercase, spazi → trattini, no caratteri speciali.

**Struttura del JSON (v4 — template video-first):**

```json
{
  "slug": "nome-azienda",
  "version": "v4",
  "companyName": "Nome Azienda",
  "contactName": "Nome Contatto (se disponibile)",
  "contactRole": "Ruolo (se disponibile)",
  "sector": "Settore dell'azienda",
  "logo": null,

  "videoUrl": null,

  "blocks": [
    {
      "today": "Il problema/situazione attuale — frase secca, specifica",
      "tomorrow": "L'opportunità/soluzione — frase secca, specifica"
    },
    {
      "today": "Secondo problema concreto",
      "tomorrow": "Seconda opportunità concreta"
    }
  ],

  "cta": {
    "text": "Ti va una chiacchierata di 15 minuti?",
    "whatsappText": "Ciao Nicola, ho visto il lavoro che hai fatto per [Azienda]. Parliamone.",
    "emailSubject": "[Azienda] — Parliamone"
  },

  "meta": {
    "createdAt": "2026-04-08",
    "status": "draft",
    "notes": ""
  }
}
```

**Regole per i blocchi oggi/domani:**
- Massimo 3 blocchi. Ideale: 2.
- Ogni frase deve essere comprensibile in 3 secondi di lettura
- Devono derivare direttamente dagli insight approvati
- Linguaggio del settore del prospect, non gergo marketing
- Il "today" descrive un ostacolo reale e specifico
- Il "tomorrow" descrive un risultato concreto e raggiungibile

**Regole per videoUrl:**
- Lascialo `null` alla creazione. Nicola registrerà il video Loom dopo
- Quando Nicola fornisce il link Loom, aggiorna il campo e fai deploy
- Formato atteso: URL embed Loom (es. "https://www.loom.com/embed/abc123")

### Step 5: Recap e prossimi passi

Dopo aver generato il config, presenta a Nicola:

```
## Landing pronta (draft)

**URL**: nicolaserrao.com/outreach/{slug}
**File**: src/data/outreach/configs/{slug}.json

### Blocchi:
- Oggi: [blocco 1 today] → Domani: [blocco 1 tomorrow]
- Oggi: [blocco 2 today] → Domani: [blocco 2 tomorrow]

### Prossimi passi:
1. Registra il video Loom (~90 secondi) basandoti sugli insight
2. Dammi il link Loom e aggiorno la landing
3. Commit + push per deployare su Vercel
4. Invia il link al prospect
```

### Step 6: Aggiornamento video e deploy

Quando Nicola fornisce il link Loom:
1. Aggiorna il campo `videoUrl` nel JSON config
2. Se il link è un URL Loom standard (loom.com/share/xxx), convertilo in embed:
   `https://www.loom.com/embed/xxx`
3. Aggiorna `meta.status` da "draft" a "ready"
4. Comunica che è pronto per commit + push

## Design System della landing

La landing riprende il design system del sito nicolaserrao.com:

- **Background**: #0a0e0d (quasi nero)
- **Testo principale**: #e8f5f2
- **Testo secondario**: rgba(232,245,242,0.50)
- **Accento**: #00fffc (teal)
- **Accento dim**: rgba(0,255,252,0.10)
- **Border teal**: rgba(0,255,252,0.22)
- **Font heading**: Playfair Display (serif)
- **Font body**: DM Mono (monospace)
- **Font UI/labels**: Inter o sistema

Non si usano i colori del brand del prospect. La landing è una proposta di Nicola,
quindi usa il suo design system. Il brand del prospect compare solo nel nome.

## Struttura della landing (one-screen)

```
┌─────────────────────────────────────┐
│ topbar: Nicola.Serrao · proposta    │
│         riservata · [NomeAzienda]   │
├─────────────────────────────────────┤
│                                     │
│         [VIDEO LOOM EMBED]          │
│         (aspect ratio 16:9)         │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────┐    ┌──────────────┐   │
│  │  OGGI    │ →  │   DOMANI     │   │
│  │ blocco 1 │    │   blocco 1   │   │
│  └──────────┘    └──────────────┘   │
│                                     │
│  ┌──────────┐    ┌──────────────┐   │
│  │  OGGI    │ →  │   DOMANI     │   │
│  │ blocco 2 │    │   blocco 2   │   │
│  └──────────┘    └──────────────┘   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  "Ti va una chiacchierata di 15m?"  │
│  [WhatsApp]  [Email]                │
│                                     │
└─────────────────────────────────────┘
```

## File di riferimento nel progetto

- **Config JSON**: `src/data/outreach/configs/{slug}.json`
- **Tipi TypeScript**: `src/data/outreach/types.ts`
- **Loader**: `src/data/outreach/loader.ts`
- **Template pagina**: `src/app/outreach/[slug]/page.tsx`
- **Tracker visite**: `src/app/outreach/[slug]/tracker.tsx`
- **Design references**: `.claude/outreach-references.md`
- **Costanti sito**: `src/lib/constants.ts`
- **CSS globale**: `src/app/globals.css`

## Errori da evitare

- **Copy generico**: "Migliorate la vostra presenza online" non dice niente. Servono dati specifici.
- **Troppo testo**: La landing deve funzionare in una schermata. Se devi scrollare, hai scritto troppo.
- **Svelare la strategia**: I blocchi oggi/domani mostrano il COSA, non il COME. Il prospect deve
  voler parlare con Nicola per sapere il come.
- **Tono arrogante**: Non "ho trovato 10 errori nel vostro sito". Ma "vedo opportunità concrete
  che vale la pena esplorare insieme".
- **Ignorare il settore**: Usa il linguaggio dell'imprenditore, non del marketer.
