# Struttura copy della pagina outreach

> La pagina deve funzionare in 20-30 secondi. Scroll totale massimo una volta. Deve lasciare il prospect con un solo pensiero: "voglio quei 15 minuti di call".

---

## Architettura complessiva

```
┌───────────────────────────────────────────────────┐
│ HERO — stile Nicola Serrao (dark, teal, Playfair) │
│                                                   │
│ ┌────────────────────┬─────────────────────────┐  │
│ │                    │                         │  │
│ │   HEADLINE         │      VIDEO LOOM         │  │
│ │   + eyebrow        │      (Nicola parla al   │  │
│ │   + micro-copy     │       prospect)         │  │
│ │                    │                         │  │
│ └────────────────────┴─────────────────────────┘  │
│                                                   │
├───────────────────────────────────────────────────┤
│ SEZIONE PROSPECT — stile del brand del prospect   │
│ (font, colori, spazi copiati dal loro sito)       │
│                                                   │
│   OPPORTUNITA / BENEFICIO / APPROCCIO             │
│   + visual (grafico o illustrazione)              │
│   + CTA (WhatsApp + call booking)                 │
│                                                   │
│   "Solo se ci sono le condizioni" — il claim di   │
│   onesta che rende credibile tutto                │
│                                                   │
└───────────────────────────────────────────────────┘
```

Due sezioni. Niente di piu. Niente blog, niente case study, niente sezione "chi sono". Il video fa quello.

---

## SEZIONE 1 — Hero (stile Nicola)

### Obiettivo
Far capire al prospect in 10 secondi:
1. **Che pagina e questa** (una proposta personale per lui, non una landing generica)
2. **Cosa gli viene proposto** (headline chiara sul beneficio + sistema)
3. **Chi glielo propone** (video — vede la faccia, sente la voce)

### Elementi (sinistra)

Ordine verticale:

1. **Eyebrow** (opzionale, piccolo, sopra l'headline)
   - Esempio: "PROPOSTA RISERVATA · [Nome Azienda]"
   - Esempio: "Per [Nome Contatto]"
   - Serve a dire "questa e per te, specifica".
   - Font mono, spaziato, dimensione piccola.

2. **Headline** (il pezzo piu importante)
   - Segui la formula in `headline-patterns.md`
   - 15-25 parole, peer-to-peer, sistema + beneficio + leva + tempo
   - Font Playfair Display, peso bold, 36-48px

3. **Micro-copy sotto headline** (1-2 righe, opzionale)
   - Non ripete l'headline. Aggiunge contesto o umanizza.
   - Esempi:
     - "Ho dato un'occhiata al vostro lavoro. Ne parlo nel video qui a destra."
     - "Due osservazioni concrete — sotto la sezione ti racconto cosa farei."
     - "Prima di proporre niente, guarda il video. 90 secondi."
   - Font DM Mono, dimensione body (16-18px)

4. **Nome + ruolo firmatario** (piccolo, sotto)
   - "Nicola Serrao · Fractional CMO"
   - Serve a dare un volto, connesso con il video

### Elementi (destra)

Solo il **video Loom embed**. Niente altro.
- Aspect ratio 16:9
- Thumbnail personalizzato con nome prospect visibile (se possibile)
- Sotto il video, eventualmente una riga piccola: "Loom · 90 secondi" per gestire le aspettative di durata

### Cosa NON mettere nell'hero
- ❌ Logo prospect grande (rischio di sembrare pagina loro)
- ❌ CTA "prenota ora" (ci arriviamo nella sezione 2)
- ❌ Bullet point con i servizi
- ❌ Testimonial o social proof di altri clienti
- ❌ Barra "come funziona" o numeri di garanzia
- ❌ Logo di tool/partner

---

## SEZIONE 2 — Prospect-style (switch visual)

### Obiettivo
1. Dare al prospect **una** opportunita/beneficio concreto riferito al suo business
2. Mostrare **l'approccio** (non la soluzione)
3. Chiudere con **una sola CTA chiara** che spinga alla call

### Perche cambia lo stile visual

Passare al design del brand prospect nella sezione 2 comunica un messaggio non verbale:
- "Mi sono preso il tempo di capire come vi presentate"
- "Sto parlando nel vostro mondo, non nel mio"
- "Questa parte e per voi, letteralmente"

Questo rafforza la percezione di personalizzazione estrema, che e la leva psicologica piu forte della pagina.

### Elementi

1. **Sezione title / eyebrow**
   - Esempio: "Cosa potrebbe succedere, se ci fossero le condizioni"
   - Esempio: "Quello che ho visto, e quello che farei"
   - Esempio: "Due opportunita che ho notato sul vostro [area]"
   - Tono: osservazione, non dichiarazione.

2. **Copy principale dell'opportunita**
   - **Format consigliato: "Oggi / Domani" o "Osservazione / Proposta"**
   - Oggi = come lavorano ORA (tono neutro, riconoscibile, mai critico)
   - Domani = cosa succederebbe se sistematizzassimo l'area (approccio, non soluzione)
   - Lunghezza: 2-4 frasi per blocco, non di piu
   - Linguaggio: del loro settore, non gergo marketing

3. **Visual**
   - Posizione: affiancato al copy o sotto, dipende dal layout
   - Tipo: **da definire al primo test** (potrebbe essere grafico timeline, illustrazione approccio, schema a tre step)
   - Formato: SVG inline, non immagine caricata — deve adattarsi allo stile prospect
   - Scopo: visualizzare l'approccio senza svelare la soluzione

4. **Micro-paragrafo di onesta ("solo se ci sono le condizioni")**
   - Esempio: "Lavoro con al massimo 3 clienti alla volta. Non e detto che il nostro sia il caso giusto — lo capiamo in 15 minuti, senza impegno per nessuno dei due."
   - Esempio: "Se dopo la call pensiamo entrambi che abbia senso, partiamo. Altrimenti, ti dico cosa farei al posto tuo e ci salutiamo."
   - Questo paragrafo DEVE esserci. E il marchio di onesta della pagina.

5. **CTA unico**
   - **UNA sola CTA.** Mai due opzioni concorrenti ("o call o mail").
   - La CTA primaria e la **chiamata di 15 minuti**, gratuita.
   - Bottone grosso, chiaro: "Parliamone — 15 minuti" / "Prenotiamo una call" / "Sentiamoci"
   - Sotto il bottone, in piccolo: "Oppure scrivimi su WhatsApp: +39 338 5691369"
   - Il WhatsApp come alternativa non come CTA parallela

### Cosa NON mettere nella sezione 2
- ❌ Piu di un'opportunita/angolo (disperde)
- ❌ Un elenco dei servizi ("ecco cosa faccio")
- ❌ Il link al sito nicolaserrao.com come CTA principale
- ❌ Form di contatto con 5 campi
- ❌ Promesse numeriche ("raddoppiamo i vostri lead")
- ❌ Bullet point che dettagliano COSA faremmo step by step

---

## Regole trasversali

### Lunghezza totale
- **Scroll massimo: 1 pagina e mezza** su desktop
- Mobile: 2-3 scroll massimo
- Se il prospect deve scrollare a lungo, abbiamo scritto troppo

### Gerarchia visiva
- 1 elemento dominante per viewport (headline nel hero, opportunita nella sezione 2)
- Molto whitespace. La pagina deve respirare.
- Un solo accento forte per sezione (teal nell'hero, colore brand prospect nella 2)

### Tono trasversale
- Ipotesi, non prescrizioni
- Noi, non io-vs-voi
- Curiosita, non urgenza
- Valore (la call), non vendita

### Cosa deve restare in testa al prospect dopo la chiusura pagina
Una sola frase: **"Questa persona ha studiato il mio business e ha visto qualcosa di specifico per me. Voglio sapere cosa."**

Se la pagina non produce quel pensiero, va riscritta.

---

## Checklist pre-consegna pagina

1. **Headline** passa il test "chiunque puo dirlo"? (se no, ok)
2. **Video** e personalizzato e non un loom template?
3. **Sezione 2** ha una sola opportunita, non tre?
4. **Copy sezione 2** e osservazione + approccio (non soluzione)?
5. **Visual** supporta l'approccio senza svelarlo?
6. **Claim "solo se ci sono le condizioni"** e presente ed esplicito?
7. **CTA** e una sola, chiara, con WhatsApp come alternativa non concorrente?
8. **Stile visual** switcha correttamente nella sezione 2 al brand prospect?
9. **Scroll totale** sta sotto 1.5 schermate desktop?
10. **Test finale:** il prospect puo "risolvere da solo" dopo aver letto? (se si, hai rivelato troppo)
