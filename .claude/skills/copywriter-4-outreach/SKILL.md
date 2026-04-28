---
name: copywriter-4-outreach
description: >
  Copywriter 4.0 Outreach — skill verticale per scrivere tutto il copy
  dell'outreach personalizzato di Nicola Serrao. Attivala quando l'utente
  deve generare headline per la landing outreach, copy per la sezione
  prospect-style, mail di primo contatto a un prospect, o sequenza di
  follow-up di nurturing. Chirurgica: non richiede avatar/funnel-brief
  completi come Copywriter 4.0 mainstream — usa solo il brief del
  prospect (output di /outreach-analyze) + i principi in questa skill.
---

# Copywriter 4.0 Outreach

Skill verticale per la produzione di copy dell'outreach 1:1 di Nicola Serrao. Vive dentro il progetto nicolaserrao.com, non ha dipendenze da Layer 0 (avatar/funnel/mechanism) come il Copywriter 4.0 mainstream.

## Filosofia in 2 frasi

1. **Approccio, non soluzione.** MAI svelare il COME. Solo il COSA e l'APPROCCIO. Se il prospect puo "risolvere da solo" dopo aver letto, hai rivelato troppo.
2. **Dottore, non venditore.** Nicola diagnostica, non vende. La call e il valore (un punto di vista onesto, gratuito). La vendita non e nella pagina ne nella mail — e nella call.

Vedi `references/copy-philosophy.md` per i 7 principi completi.

## Quando attivare questa skill

Si attiva automaticamente quando l'utente chiede:
- "scrivi l'headline per [prospect]"
- "scrivi la mail a [prospect]"
- "prepara il follow-up per [prospect]"
- "generami il copy della sezione prospect di [prospect]"
- "copy outreach per [azienda]"
- qualsiasi variante in italiano legata alla produzione copy outreach

**NON si attiva per:**
- Copy per il sito nicolaserrao.com (hero, blog, risorse) → copy inline o skill diversa
- Copy per clienti di Nicola (ads, landing cliente) → Copywriter 4.0 mainstream (livello globale, non qui)
- Analisi del prospect → `/outreach-analyze`
- Generazione della pagina Next.js → `/outreach-generate` o `/outreach-create`

## Input richiesti

Minimo indispensabile per produrre copy:

1. **Brief del prospect** — output di `/outreach-analyze` o equivalente. Include:
   - Nome azienda, settore, dimensione
   - Nome contatto (se disponibile) + ruolo
   - Sito web + osservazioni specifiche
   - Cosa fanno bene / gap / opportunita
   - Angolo consigliato per l'outreach

2. **Tipologia di output richiesto:**
   - `headline` — solo per la landing
   - `page-copy` — completo per la landing (headline + hero copy + sezione prospect-style + CTA)
   - `cold-email` — mail di primo contatto con oggetto
   - `followup` — singolo follow-up, con pattern scelto o auto
   - `sequence` — sequenza completa (cold + N follow-up)

Se il brief non c'e, la skill si ferma e chiede di prepararlo prima. **MAI inventare dati sul prospect.**

## Workflow

### Step 1 — Verifica prerequisiti

- Brief del prospect presente e leggibile?
- Tipologia di output specificata?

Se no a una delle due: ferma il processo e chiedi.

### Step 2 — Seleziona il reference giusto

A seconda del deliverable:

| Deliverable richiesto | Reference da caricare |
|-----------------------|-----------------------|
| Headline            | `references/headline-patterns.md` |
| Copy pagina completo  | `references/headline-patterns.md` + `references/page-copy-structure.md` |
| Mail primo contatto   | `references/email-cold-rules.md` |
| Singolo follow-up     | `references/email-followup-pool.md` |
| Sequenza completa     | `references/email-cold-rules.md` + `references/email-followup-pool.md` |
| Qualunque deliverable | `references/copy-philosophy.md` (SEMPRE) |

### Step 3 — Produci il copy

Applica rigorosamente:
- Formule in `headline-patterns.md` per headline
- Struttura in `page-copy-structure.md` per pagina
- Regole 1-11 in `email-cold-rules.md` per cold email
- Pool di pattern in `email-followup-pool.md` per follow-up
- **Sempre e comunque**: i 7 principi di `copy-philosophy.md`

### Step 4 — Checklist pre-consegna

Prima di restituire il copy all'utente, passa per:

**Se headline:**
- [ ] Formula completa (verbo noi + sistema + beneficio verticale + leva + tempo)?
- [ ] Passa il test "chiunque puo dirlo"?
- [ ] Lunghezza 15-25 parole?

**Se copy pagina:**
- [ ] Hero ha headline + micro-copy (no bullet, no CTA, no logo prospect grande)?
- [ ] Sezione 2 ha UNA sola opportunita (non tre)?
- [ ] Claim "solo se ci sono le condizioni" presente?
- [ ] CTA unica (call 15 minuti primaria, WhatsApp secondario non concorrente)?

**Se cold email:**
- [ ] Body 3-5 righe?
- [ ] Oggetto specifico, non generico?
- [ ] Un solo link?
- [ ] Why chiaro (perche a loro, perche oggi)?
- [ ] Firma sostituisce l'autopresentazione?

**Se follow-up:**
- [ ] Reply sulla thread precedente (non thread nuovo)?
- [ ] Porta valore, non chiede?
- [ ] Zero pressione, zero senso di colpa?
- [ ] Uscita dignitosa in chiusura?

**In tutti i casi:**
- [ ] Passa i 7 principi di `copy-philosophy.md`?
- [ ] Il prospect puo "risolvere da solo" dopo aver letto? (se si, hai rivelato troppo — riscrivi)

### Step 5 — Output

Formato di consegna:

**Per headline:**
```
## Headline proposta
[testo]

## Alternative (2-3 varianti)
1. [variante propositiva]
2. [variante problem-first]
3. [variante corta]

## Note
- Perche questa funziona: [1 frase]
- Settore target: [verticalita]
```

**Per copy pagina:**
```
## Eyebrow
[testo]

## Headline
[testo]

## Micro-copy hero
[testo]

## Sezione 2 — Eyebrow
[testo]

## Sezione 2 — Copy opportunita
### Oggi
[testo 2-4 frasi]

### Domani
[testo 2-4 frasi]

## Claim "solo se ci sono le condizioni"
[testo 2-3 righe]

## CTA
Primaria: [testo bottone]
Secondaria (piccola): [testo WhatsApp]
```

**Per cold email:**
```
## Oggetto
[testo]

## Body
[testo con righe separate]

## Note
- Pattern usato: [A/B/C]
- Aggancio specifico: [cosa hai usato dal brief]
```

**Per follow-up / sequenza:**
```
## Follow-up #N — [giorni dopo]

### Oggetto
Re: [oggetto originale]

### Body
[testo]

### Pattern utilizzato
[numero dal pool + razionale: perche questo adesso]
```

## Integrazioni con altre skill

- **Upstream:** `/outreach-analyze` produce il brief che questa skill consuma
- **Downstream:** `/outreach-generate` e `/outreach-create` consumano l'output di questa skill per generare il file JSON di configurazione e la pagina Next.js

## File di riferimento

- `references/copy-philosophy.md` — 7 principi fondanti (sempre caricato)
- `references/headline-patterns.md` — formula + varianti + esempi settore
- `references/page-copy-structure.md` — struttura hero + sezione prospect + CTA
- `references/email-cold-rules.md` — 11 regole mail primo contatto + template
- `references/email-followup-pool.md` — 18 pattern + filosofia Steli Efti + cadence

## Cosa NON fare

- NON produrre copy se manca il brief del prospect
- NON usare verbi al tu imperativo ("ottimizza", "sfrutta")
- NON inventare numeri o case study
- NON svelare MAI la soluzione — solo l'approccio
- NON usare gergo marketing ("massimizzare ROI", "scalare il funnel")
- NON mettere piu di UNA CTA per pezzo di copy
- NON riutilizzare headline generiche tra prospect — deve essere sempre verticale

## Evoluzione futura

Questa skill evolve con il feedback sulle outreach reali. Quando una sequenza funziona (call prenotata, conversione a cliente), i pattern/frasi che hanno funzionato vanno aggiunti ai reference. Quando una sequenza non funziona, i pattern che hanno fallito vanno annotati come warning nei reference.

Il file `references/copy-philosophy.md` NON si tocca — e il principio, non la tattica. Gli altri reference evolvono.
