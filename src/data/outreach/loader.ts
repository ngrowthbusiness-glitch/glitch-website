import type { OutreachConfig } from "./types";
import fs from "fs";
import path from "path";

const CONFIGS_DIR = path.join(process.cwd(), "src/data/outreach/configs");

export function getAllOutreachSlugs(): string[] {
  const files = fs.readdirSync(CONFIGS_DIR).filter((f) => f.endsWith(".json"));
  return files.map((f) => f.replace(".json", ""));
}

export function getOutreachConfig(slug: string): OutreachConfig | null {
  const filePath = path.join(CONFIGS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as OutreachConfig;
}

export function getAllOutreachConfigs(): OutreachConfig[] {
  return getAllOutreachSlugs()
    .map(getOutreachConfig)
    .filter((c): c is OutreachConfig => c !== null);
}
