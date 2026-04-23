# Revisiona landing outreach

Analizza una landing outreach v4 esistente e suggerisci miglioramenti.

## Come funziona

L'utente specifica uno slug (es. "nome-azienda").
Leggi il config JSON in `src/data/outreach/configs/{slug}.json` e verifica:

1. **Blocchi oggi/domani**: Sono specifici e basati su dati reali? O sono generici?
2. **Sinteticita**: Ogni blocco e comprensibile in 3 secondi di lettura?
3. **CTA**: Il testo della CTA abbassa la barriera d'ingresso?
4. **Video**: Il videoUrl e impostato? Se si, e in formato embed corretto?
5. **Tono**: Diretto, rispettoso, nel linguaggio del settore del prospect?

## Output

- Lista di problemi con severita (critico / migliorabile / ok)
- Suggerimenti concreti di riscrittura
- Se richiesto, applica le modifiche direttamente al JSON

## Per landing legacy (v3)

Le landing v3 gia inviate non vanno modificate. Se l'utente chiede di
revisionare una landing v3, segnala che e nel formato legacy.
