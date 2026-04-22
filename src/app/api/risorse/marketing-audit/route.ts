import { NextRequest, NextResponse } from "next/server";
import { loadKB, buildStreamResponse } from "@/lib/risorse-agent";

export const runtime = "nodejs";

const QUESTIONS = [
  { id: "ga4",         label: "GA4 con eventi di conversione configurati" },
  { id: "funnel",      label: "Funnel di conversione step-by-step visibile" },
  { id: "cpa",         label: "CPA reale per canale (non ROAS aggregato)" },
  { id: "dropoff",     label: "Identificazione step rotto nel funnel" },
  { id: "ltv",         label: "LTV medio e canale con LTV più alto" },
  { id: "exclusions",  label: "Esclusione clienti esistenti dalle campagne acquisizione" },
  { id: "abtesting",   label: "A/B test sistematici con metrica predefinita" },
  { id: "attribution", label: "Modello di attribuzione calibrato sul ciclo reale" },
  { id: "dashboard",   label: "Dashboard con 5-6 metriche chiave settimanali" },
  { id: "reporting",   label: "Report con KPI di business (non solo metriche piattaforma)" },
] as const;

export interface MarketingAuditInput {
  risposte: Record<string, boolean>;
  settore: string;   // "ecommerce" | "b2b" | "servizi" | "altro"
  budget: string;    // budget mensile stimato in advertising
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "API key non configurata" }, { status: 500 });
  }

  let input: MarketingAuditInput;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: "Input non valido" }, { status: 400 });
  }

  const kb = loadKB("kb-marketing-audit.md");

  // Calcola score e identifica gap
  const positivi = QUESTIONS.filter((q) => input.risposte[q.id] === true);
  const negativi = QUESTIONS.filter((q) => input.risposte[q.id] !== true);
  const score = positivi.length;

  const systemPrompt = `${kb}

---
ISTRUZIONI OPERATIVE PER QUESTA SESSIONE

Stai analizzando i risultati di un audit marketing di 10 domande. L'utente ha risposto dal sito nicolaserrao.com.

Obiettivo: diagnosi precisa dei gap più critici, non un elenco di tutti i problemi. Seleziona i 2-3 gap con impatto maggiore e spiega esattamente perché costano soldi.

Formato della risposta:
1. Una frase di apertura che specchia la loro situazione in modo diretto (no rassicurazioni generiche)
2. Profilo di maturità assegnato (0-3: buio totale / 4-6: misuri ma non interpreti / 7-9: ottimizzazione / 10: scala)
3. I 2-3 gap più critici con spiegazione concreta del costo invisibile di ciascuno
4. Le prime 3 azioni prioritarie ordinate per impatto — specifiche, non generiche
5. Un grafico SVG inline: barre orizzontali con le 10 dimensioni, verde = OK, rosso = mancante
6. CTA: se score ≤ 6, proponi la call con Nicola; se score ≥ 7, suggerisci il KPI Calculator come passo successivo

Usa markdown. Lunghezza: 350-500 parole + SVG.
Lingua: italiano.`;

  const risposteDettagliate = QUESTIONS.map(
    (q) => `- ${q.label}: ${input.risposte[q.id] ? "✅ Sì" : "❌ No"}`
  ).join("\n");

  const userMessage = `Risultati dell'audit marketing:

**Score:** ${score}/10
**Settore:** ${input.settore}
**Budget advertising mensile:** ${input.budget}

**Dettaglio risposte:**
${risposteDettagliate}

**Dimensioni carenti (${negativi.length}):**
${negativi.map((q) => `- ${q.label}`).join("\n")}

**Dimensioni presenti (${positivi.length}):**
${positivi.map((q) => `- ${q.label}`).join("\n")}

Fornisci la diagnosi.`;

  return buildStreamResponse(systemPrompt, userMessage);
}
