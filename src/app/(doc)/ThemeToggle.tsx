"use client";

import { useEffect, useState } from "react";

/* Sistema, chiaro, scuro: come in Basecamp. La scelta sta in localStorage("tema"),
   lo script del layout la applica prima del primo disegno. */
type Tema = "sistema" | "chiaro" | "scuro";
const VOCI: { id: Tema; label: string }[] = [
  { id: "sistema", label: "Sistema" },
  { id: "chiaro", label: "Chiaro" },
  { id: "scuro", label: "Scuro" },
];

export default function ThemeToggle() {
  const [tema, setTema] = useState<Tema>("sistema");

  useEffect(() => {
    let t: string | null = null;
    try {
      t = localStorage.getItem("tema");
    } catch {}
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    if (t === "chiaro" || t === "scuro") setTema(t);
  }, []);

  function scegli(t: Tema) {
    setTema(t);
    try {
      if (t === "sistema") localStorage.removeItem("tema");
      else localStorage.setItem("tema", t);
    } catch {}
    const r = document.documentElement;
    if (t === "sistema") r.removeAttribute("data-theme");
    else r.setAttribute("data-theme", t === "chiaro" ? "light" : "dark");
  }

  return (
    <div className="ns-tema" role="group" aria-label="Tema">
      {VOCI.map((v) => (
        <button key={v.id} type="button" aria-pressed={tema === v.id} onClick={() => scegli(v.id)}>
          {v.label}
        </button>
      ))}
    </div>
  );
}
