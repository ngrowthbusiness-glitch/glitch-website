/* eslint-disable */
/**
 * Script di trasformazione prospect-pool → payload notion-create-pages.
 * Legge i 2 JSON degli agenti, li normalizza, dedupe, salva il payload pronto.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ECOMMERCE_PATH = path.join(ROOT, "docs", "prospect-pool-ecommerce.json");
const B2B_PATH = path.join(ROOT, "docs", "prospect-pool-b2b.json");
const OUT_PATH = path.join(ROOT, "docs", "prospect-pool-notion-payload.json");
const COMBINED_PATH = path.join(ROOT, "docs", "prospect-pool-combined.json");

const VALID_REGIONS = new Set([
  "Marche","Abruzzo","Molise","Lazio","Umbria","Toscana","Campania","Puglia","Basilicata","Calabria","Sicilia","Sardegna","Lombardia","Veneto","Emilia-Romagna","Piemonte","Liguria","FVG","Trentino-AA","Valle d'Aosta",
]);
const VALID_SETTORI = new Set([
  "Pulizie & Servizi","Retail","Hospitality","Food & Beverage","Industria","Professionale B2B","E-commerce","Altro",
]);
const VALID_VERTICALI = new Set(["E-commerce","B2B","Ibrido"]);
const VALID_FATTURATO = new Set(["<500K","500K-1M","1-3M","3-7M","7-15M",">15M","Sconosciuto"]);

function normalizePriority(p) {
  if (!p) return "🔍 Da validare";
  const s = String(p).trim();
  if (s.includes("Sognato")) return "🔥 Sognato";
  if (s.includes("Praticabile")) return "⚡ Praticabile";
  if (s.includes("Da validare") || s.includes("validare")) return "🔍 Da validare";
  return "🔍 Da validare";
}

function clamp(s, n) {
  if (!s) return "";
  if (s.length <= n) return s;
  return s.slice(0, n - 1) + "…";
}

function toPropertiesMap(p) {
  const settore = VALID_SETTORI.has(p.settore) ? p.settore : "Altro";
  const verticale = VALID_VERTICALI.has(p.verticale) ? p.verticale : "Ibrido";
  const fatturato = VALID_FATTURATO.has(p.fatturato_stimato) ? p.fatturato_stimato : "Sconosciuto";
  const regione = VALID_REGIONS.has(p.regione) ? p.regione : null;
  const properties = {
    "Nome Azienda": p.nome_azienda || "(senza nome)",
    "URL Sito": p.url_sito || null,
    "Verticale": verticale,
    "Settore": settore,
    "Sotto-settore": clamp(p.sotto_settore || "", 220),
    "Fatturato Stimato": fatturato,
    "Localita HQ": clamp(p.localita_hq || "", 80),
    "Decisore Probabile": clamp(p.decisore_probabile || "", 200),
    "LinkedIn Azienda": p.linkedin_azienda || null,
    "Razionale": clamp(p.razionale || "", 280),
    "Angolo Iniziale": clamp(p.angolo_iniziale || "", 320),
    "Priority Score": normalizePriority(p.priority_score),
    "Status": "📋 Da analizzare",
    "Note": clamp(p.note || "", 500),
  };
  if (regione) properties["Regione"] = regione;
  return properties;
}

function dedupeKey(p) {
  const url = (p.url_sito || "").toLowerCase().replace(/^https?:\/\/(www\.)?/, "").replace(/\/+$/, "");
  if (url) return url;
  return (p.nome_azienda || "").toLowerCase().trim();
}

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function main() {
  const ec = loadJson(ECOMMERCE_PATH);
  const b2b = loadJson(B2B_PATH);

  const all = [];
  const seen = new Set();
  const dups = [];

  for (const p of ec.prospects || []) {
    const k = dedupeKey(p);
    if (!k) continue;
    if (seen.has(k)) { dups.push({ source: "ec", key: k, name: p.nome_azienda }); continue; }
    seen.add(k);
    all.push({ ...p, _source: "ec" });
  }
  for (const p of b2b.prospects || []) {
    const k = dedupeKey(p);
    if (!k) continue;
    if (seen.has(k)) { dups.push({ source: "b2b", key: k, name: p.nome_azienda }); continue; }
    seen.add(k);
    all.push({ ...p, _source: "b2b" });
  }

  // Notion payload
  const pages = all.map((p) => ({ properties: toPropertiesMap(p) }));

  fs.writeFileSync(OUT_PATH, JSON.stringify({ pages }, null, 2), "utf8");

  // Split in batch da 20 per essere leggibili da Read tool (~25k tokens limit)
  const BATCH_SIZE = 20;
  const batches = [];
  for (let i = 0; i < pages.length; i += BATCH_SIZE) {
    batches.push(pages.slice(i, i + BATCH_SIZE));
  }
  batches.forEach((b, i) => {
    const p = path.join(ROOT, "docs", `prospect-pool-notion-batch-${i + 1}.json`);
    fs.writeFileSync(p, JSON.stringify({ pages: b }, null, 2), "utf8");
  });
  console.log(`✓ Split in ${batches.length} batch da max ${BATCH_SIZE}`);

  // Combined raw view (for repo persistence)
  fs.writeFileSync(
    COMBINED_PATH,
    JSON.stringify(
      {
        metadata: {
          generato_il: new Date().toISOString().slice(0, 10),
          totale: all.length,
          ecommerce: ec.prospects?.length || 0,
          b2b: b2b.prospects?.length || 0,
          dedup_rimossi: dups.length,
        },
        prospects: all,
      },
      null,
      2
    ),
    "utf8"
  );

  // Stats
  const byPriority = {};
  const byRegione = {};
  const byVerticale = {};
  for (const p of all) {
    const pri = normalizePriority(p.priority_score);
    byPriority[pri] = (byPriority[pri] || 0) + 1;
    const reg = p.regione || "?";
    byRegione[reg] = (byRegione[reg] || 0) + 1;
    byVerticale[p.verticale] = (byVerticale[p.verticale] || 0) + 1;
  }

  console.log("✓ Payload Notion scritto in:", OUT_PATH);
  console.log("✓ Combined raw scritto in:", COMBINED_PATH);
  console.log("");
  console.log("Totale prospect dopo dedupe:", all.length);
  console.log("Duplicati rimossi:", dups.length);
  if (dups.length) console.log("  →", dups.map(d => d.name).join(", "));
  console.log("");
  console.log("Per priority:");
  for (const [k, v] of Object.entries(byPriority)) console.log("  ", k, ":", v);
  console.log("");
  console.log("Per verticale:");
  for (const [k, v] of Object.entries(byVerticale)) console.log("  ", k, ":", v);
  console.log("");
  console.log("Per regione (top 8):");
  for (const [k, v] of Object.entries(byRegione).sort((a, b) => b[1] - a[1]).slice(0, 8)) {
    console.log("  ", k, ":", v);
  }
}

main();
