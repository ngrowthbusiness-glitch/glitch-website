"use client";

import { useSyncExternalStore } from "react";
import Icona, { type NomeIcona } from "@/components/Icona";
import { CHIAVE_TEMA } from "@/lib/tema";

/* Sistema, chiaro, scuro: come in Basecamp. La scelta sta in localStorage e la applica
   SCRIPT_TEMA (lib/tema.ts, nel layout radice) prima del primo disegno. */
type Scelta = "sistema" | "chiaro" | "scuro";

const ascolti = new Set<() => void>();
const iscriviti = (f: () => void) => {
  ascolti.add(f);
  return () => ascolti.delete(f);
};
const leggi = (): Scelta => {
  const t = document.documentElement.dataset.theme;
  return t === "light" ? "chiaro" : t === "dark" ? "scuro" : "sistema";
};

function applica(s: Scelta) {
  const r = document.documentElement;
  if (s === "chiaro") r.dataset.theme = "light";
  else if (s === "scuro") r.dataset.theme = "dark";
  else delete r.dataset.theme;
  try {
    if (s === "sistema") localStorage.removeItem(CHIAVE_TEMA);
    else localStorage.setItem(CHIAVE_TEMA, s);
  } catch {}
  ascolti.forEach((f) => f());
}

const VOCI: { s: Scelta; nome: string; icona: NomeIcona }[] = [
  { s: "sistema", nome: "Come il sistema", icona: "monitor" },
  { s: "chiaro", nome: "Chiaro", icona: "sun" },
  { s: "scuro", nome: "Scuro", icona: "moon" },
];

export default function ThemeToggle() {
  const scelta = useSyncExternalStore(iscriviti, leggi, () => "sistema" as Scelta);
  return (
    <span className="ns-tema" role="radiogroup" aria-label="Tema">
      {VOCI.map((v) => (
        <button
          key={v.s}
          type="button"
          role="radio"
          aria-checked={scelta === v.s}
          aria-label={v.nome}
          title={v.nome}
          onClick={() => applica(v.s)}
        >
          <Icona n={v.icona} size={15} stroke={2} />
        </button>
      ))}
    </span>
  );
}
