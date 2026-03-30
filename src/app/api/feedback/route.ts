import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CSV_PATH = path.join(process.cwd(), "feedback_log.csv");

const VALID_CHOICES = ["non_sicuro", "prezzo", "tempo", "fiducia", "altro"] as const;

const LABELS: Record<string, string> = {
  non_sicuro: "Non sono sicuro che faccia per me",
  prezzo: "Non conosco ancora i prezzi",
  tempo: "Non ho tempo adesso",
  fiducia: "Voglio sapere di più prima di parlare",
  altro: "Altro",
};

export async function POST(request: NextRequest) {
  let data: {
    choice?: string;
    text?: string;
    page?: string;
    ts?: string;
  };

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const choice = data.choice?.replace(/[^a-z_]/g, "") || "";
  if (!VALID_CHOICES.includes(choice as (typeof VALID_CHOICES)[number])) {
    return NextResponse.json({ error: "Invalid choice" }, { status: 400 });
  }

  const text = (data.text || "").slice(0, 1000).replace(/[\r\n]+/g, " ");
  const page = (data.page || "").slice(0, 200);
  const ts = data.ts || new Date().toISOString();
  const label = LABELS[choice] || choice;

  // Create CSV if it doesn't exist
  const isNew = !fs.existsSync(CSV_PATH);

  const row = [ts, page, choice, label, text]
    .map((v) => `"${v.replace(/"/g, '""')}"`)
    .join(",");

  const content = isNew
    ? `"timestamp","pagina","scelta_chiave","scelta_label","testo_libero"\n${row}\n`
    : `${row}\n`;

  fs.appendFileSync(CSV_PATH, content, "utf-8");

  return NextResponse.json({ ok: true });
}
