import { NextRequest, NextResponse } from "next/server";
import { loadKB, buildStreamResponse } from "@/lib/risorse-agent";

export const runtime = "nodejs";

export interface FractionalCMOInput {
  fatturato: string;       // "sotto-100k" | "100k-500k" | "500k-2m" | "oltre-2m"
  teamMarketing: string;   // "nessuno" | "io-stesso" | "1-2-persone" | "agenzia" | "misto"
  problema: string;        // descrizione libera del problema principale
  obiettivo: string;       // obiettivo nei prossimi 12 mesi
  cosaProviato: string;    // cosa hanno già provato
  budget: string;          // "sotto-500" | "500-1500" | "1500-3000" | "oltre-3000"
  settore: string;         // "ecommerce" | "b2b-servizi" | "b2b-manifattura" | "infoproduct" | "altro"
  fase: string;            // "startup" | "crescita" | "consolidamento" | "scala"
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "API key non configurata" }, { status: 500 });
  }

  let input: FractionalCMOInput;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: "Input non valido" }, { status: 400 });
  }

  const kb = loadKB("kb-fractional-cmo.md");

  const systemPrompt = `${kb}

---
ISTRUZIONI OPERATIVE PER QUESTA SESSIONE

Stai analizzando la situazione di un imprenditore o manager che ha compilato un self-assessment sul tuo sito nicolaserrao.com.

Obiettivo: dare una diagnosi personalizzata, diretta e utile. Non una risposta generica — qualcosa che questa persona specifica non avrebbe trovato altrove.

Formato della risposta:
1. Inizia con una frase che specchia la loro situazione — dimostra che hai capito esattamente dove sono
2. Assegna un profilo (A: Fractional CMO / B: Consulente spot / C: Agenzia / D: Early-stage) con la spiegazione del perché
3. Descrivi concretamente cosa cambierebbe per loro nei prossimi 90 giorni
4. Se il profilo è A o D: proponi sempre la call gratuita di 15 minuti come passo successivo
5. Se pertinente, genera un grafico SVG inline (radar chart o barre) che visualizzi il loro profilo su 5 dimensioni: Chiarezza strategica, Struttura operativa, Efficienza budget, Qualità dati, Potenziale crescita — stima i valori su scala 1-10 dagli input forniti

Usa markdown per la formattazione (## per sezioni, **grassetto** per concetti chiave, liste quando utile).
Lunghezza ideale: 400-600 parole + SVG se pertinente.
Lingua: italiano.`;

  const fatturatoLabel: Record<string, string> = {
    "sotto-100k": "sotto €100k annui",
    "100k-500k": "tra €100k e €500k annui",
    "500k-2m": "tra €500k e €2M annui",
    "oltre-2m": "oltre €2M annui",
  };

  const userMessage = `Ecco la situazione dell'imprenditore che ha completato il self-assessment:

**Fatturato attuale:** ${fatturatoLabel[input.fatturato] ?? input.fatturato}
**Settore:** ${input.settore}
**Fase aziendale:** ${input.fase}
**Team marketing attuale:** ${input.teamMarketing}
**Problema principale:** ${input.problema}
**Obiettivo nei prossimi 12 mesi:** ${input.obiettivo}
**Cosa ha già provato:** ${input.cosaProviato}
**Budget disponibile per supporto marketing:** ${input.budget}

Fornisci la tua analisi.`;

  return buildStreamResponse(systemPrompt, userMessage);
}
