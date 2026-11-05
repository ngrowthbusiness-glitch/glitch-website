import type { Metadata } from "next";
import Home from "@/components/home/Home";

/* La home (restyling 2026-11, copy approvato con le varianti A). Il contenuto sta in components/home. */
export const metadata: Metadata = {
  title: { absolute: "Nicola Serrao · Fractional CMO, direttore marketing esterno" },
  description:
    "Un direttore marketing nella tua azienda, senza assumerlo. Decide le priorità, tiene insieme chi lavora con te e risponde dei risultati.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Nicola Serrao · Fractional CMO, direttore marketing esterno",
    description:
      "Un direttore marketing nella tua azienda, senza assumerlo. Decide le priorità, tiene insieme chi lavora con te e risponde dei risultati.",
    url: "/",
  },
};

export default function HomePage() {
  return <Home />;
}
