# Revisiona landing outreach

Analizza una landing outreach esistente e suggerisci miglioramenti.

## Come funziona

L'utente specifica uno slug (es. "von-schnauzer").
Tu leggi il config JSON corrispondente e analizzi:

1. **Copy** — Il problema è centrato sul prospect o è generico? Gli insight sono specifici? La strategia svela troppo o crea curiosità?
2. **Struttura** — Segue la struttura v2 (insight → problem → teaser → box)? O è ancora v1 (problem → method → strategy → CTA)?
3. **CTA** — Ha la ctaQuestion per la box interattiva? La domanda è forte abbastanza?
4. **Palette/Font** — I colori richiamano il brand del prospect? Il font è coerente col positioning?
5. **Tono** — È diretto e rispettoso? Usa il linguaggio del settore?

## Output

Fornisci:
- Lista di problemi trovati con severità (critico/migliorabile/ok)
- Suggerimenti concreti di riscrittura per ogni problema
- Se richiesto, applica le modifiche direttamente al JSON

## Regole

Fai riferimento alle regole di copywriting nella memoria outreach:
- Centrare il problema del prospect
- Non svelare la strategia completa
- Insight specifici, non generici
- CTA come domanda provocatoria
- Max 3 sezioni + CTA
