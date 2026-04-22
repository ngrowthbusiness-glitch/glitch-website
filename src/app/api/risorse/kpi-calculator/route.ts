import { NextRequest, NextResponse } from "next/server";
import { loadKB, buildStreamResponse } from "@/lib/risorse-agent";

export const runtime = "nodejs";

export interface KPICalculatorInput {
  budgetAds: number;       // € mensili spesi in advertising
  fatturato: number;       // € mensili di fatturato totale
  aov: number;             // € valore medio ordine/cliente
  margineLordo: number;    // % margine lordo (es. 35 = 35%)
  modello: string;         // "ecommerce" | "b2b-leadgen" | "infoproduct" | "servizi"
  costoAcquisizione?: number; // CPA attuale se conosciuto (opzionale)
}

function calcola(input: KPICalculatorInput) {
  const margineDecimale = input.margineLordo / 100;

  const breakEvenROAS = margineDecimale > 0
    ? parseFloat((1 / margineDecimale).toFixed(2))
    : null;

  const cpaMax = input.aov > 0 && margineDecimale > 0
    ? parseFloat((input.aov * margineDecimale).toFixed(2))
    : null;

  const mer = input.budgetAds > 0
    ? parseFloat((input.fatturato / input.budgetAds).toFixed(2))
    : null;

  const roasStimato = input.budgetAds > 0
    ? parseFloat((input.fatturato / input.budgetAds).toFixed(2))
    : null;

  // Scenario B: +30% ROAS, stesso budget
  const fatturatoScenarioB = input.budgetAds > 0 && roasStimato
    ? parseFloat((input.budgetAds * roasStimato * 1.3).toFixed(0))
    : null;

  // Scenario C: +25% budget, ROAS invariato
  const budgetScenarioC = parseFloat((input.budgetAds * 1.25).toFixed(0));
  const fatturatoScenarioC = roasStimato
    ? parseFloat((budgetScenarioC * roasStimato).toFixed(0))
    : null;

  // Margine corrente stimato
  const margineCorrenteAssoluto = input.fatturato > 0
    ? parseFloat((input.fatturato * margineDecimale).toFixed(0))
    : null;

  const margineScenarioB = fatturatoScenarioB
    ? parseFloat((fatturatoScenarioB * margineDecimale).toFixed(0))
    : null;

  const margineScenarioC = fatturatoScenarioC
    ? parseFloat((fatturatoScenarioC * margineDecimale - (budgetScenarioC - input.budgetAds)).toFixed(0))
    : null;

  return {
    breakEvenROAS,
    cpaMax,
    mer,
    roasStimato,
    fatturatoScenarioB,
    fatturatoScenarioC,
    budgetScenarioC,
    margineCorrenteAssoluto,
    margineScenarioB,
    margineScenarioC,
  };
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "API key non configurata" }, { status: 500 });
  }

  let input: KPICalculatorInput;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: "Input non valido" }, { status: 400 });
  }

  // Validazione base
  if (
    input.budgetAds <= 0 ||
    input.fatturato <= 0 ||
    input.aov <= 0 ||
    input.margineLordo <= 0 ||
    input.margineLordo > 100
  ) {
    return NextResponse.json({ error: "Valori numerici non validi" }, { status: 400 });
  }

  const calcolati = calcola(input);
  const kb = loadKB("kb-kpi-calculator.md");

  const systemPrompt = `${kb}

---
ISTRUZIONI OPERATIVE PER QUESTA SESSIONE

Stai analizzando i numeri reali di un'azienda che ha usato il KPI Calculator sul sito nicolaserrao.com.
I calcoli sono già stati eseguiti — usali direttamente senza ricalcolare.

Obiettivo: trasformare questi numeri in insight concreti, non in un elenco di formule. Parla come un collega che guarda i dati insieme a loro.

Formato della risposta:
1. I 3 numeri più importanti con interpretazione in una riga (break-even ROAS, CPA max, MER)
2. La diagnosi principale in 2-3 frasi — cosa sta succedendo davvero
3. I 3 scenari in formato tabella markdown (A: attuale / B: ottimizzato / C: scala)
4. Un grafico SVG inline: 3 barre affiancate (Scenario A, B, C) su fatturato mensile e margine mensile, con colori distinti (grigio / ciano / viola)
5. I primi 3 step concreti per i prossimi 30 giorni
6. CTA verso Nicola se c'è potenziale di ottimizzazione significativo

Usa markdown. Lunghezza: 400-550 parole + SVG.
Lingua: italiano. Tono: diretto, da collega.`;

  const statusROAS = calcolati.roasStimato && calcolati.breakEvenROAS
    ? calcolati.roasStimato > calcolati.breakEvenROAS * 2
      ? "ottimo — ampio margine sopra il break-even"
      : calcolati.roasStimato > calcolati.breakEvenROAS
        ? "positivo ma stretto — ogni oscillazione può portare in rosso"
        : "sotto il break-even — stai perdendo margine su ogni euro speso"
    : "non calcolabile";

  const userMessage = `Numeri inseriti dall'utente:

**Modello di business:** ${input.modello}
**Budget advertising mensile:** €${input.budgetAds.toLocaleString("it-IT")}
**Fatturato mensile totale:** €${input.fatturato.toLocaleString("it-IT")}
**Valore medio ordine/cliente:** €${input.aov}
**Margine lordo:** ${input.margineLordo}%
${input.costoAcquisizione ? `**CPA attuale dichiarato:** €${input.costoAcquisizione}` : ""}

**Calcoli già eseguiti (usa questi):**
- Break-even ROAS: ${calcolati.breakEvenROAS ?? "N/A"}
- CPA massimo sostenibile: €${calcolati.cpaMax ?? "N/A"}
- MER attuale (fatturato/budget): ${calcolati.mer ?? "N/A"}×
- Status ROAS: ${statusROAS}
- Margine lordo corrente (stimato): €${calcolati.margineCorrenteAssoluto?.toLocaleString("it-IT") ?? "N/A"}/mese

**Scenari:**
| | Fatturato/mese | Margine stimato/mese |
|---|---|---|
| A - Attuale | €${input.fatturato.toLocaleString("it-IT")} | €${calcolati.margineCorrenteAssoluto?.toLocaleString("it-IT") ?? "N/A"} |
| B - ROAS +30% (stesso budget) | €${calcolati.fatturatoScenarioB?.toLocaleString("it-IT") ?? "N/A"} | €${calcolati.margineScenarioB?.toLocaleString("it-IT") ?? "N/A"} |
| C - Budget +25% (ROAS invariato) | €${calcolati.fatturatoScenarioC?.toLocaleString("it-IT") ?? "N/A"} | €${calcolati.margineScenarioC?.toLocaleString("it-IT") ?? "N/A"} |

Fornisci l'analisi.`;

  return buildStreamResponse(systemPrompt, userMessage);
}
