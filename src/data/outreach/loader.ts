/**
 * Loader degli outreach config.
 * Per aggiungere un nuovo prospect:
 *  1. crea il file JSON in `src/data/outreach/configs/{slug}.json`
 *  2. aggiungi l'import qui sotto e includilo in `configs`
 *  3. la pagina `/outreach/{slug}` diventa disponibile in build
 */

import type { OutreachConfig } from "./types";
import timoneYachts from "./configs/timone-yachts.json";

export const configs: OutreachConfig[] = [
  timoneYachts as unknown as OutreachConfig,
];

export function getConfig(slug: string): OutreachConfig | undefined {
  return configs.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return configs.map((c) => c.slug);
}
