"use client";

import { useEffect, useState } from "react";

/* L'ora di Agugliano, che scorre (decisione di aprile: un dato, non un effetto).
   Sul server non c'e' un'ora giusta da scrivere: compare dopo l'idratazione. */
const fmt = new Intl.DateTimeFormat("it-IT", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Europe/Rome" });

export default function Ora() {
  const [ora, setOra] = useState<string | null>(null);
  useEffect(() => {
    const tic = () => setOra(fmt.format(new Date()));
    const id = setInterval(tic, 1000);
    const primo = setTimeout(tic, 0);
    return () => {
      clearInterval(id);
      clearTimeout(primo);
    };
  }, []);
  return (
    <time className="ora" suppressHydrationWarning>
      {ora ?? " "}
    </time>
  );
}
