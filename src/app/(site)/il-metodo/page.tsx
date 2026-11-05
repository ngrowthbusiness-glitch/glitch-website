import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import ChiFaCosa from "../../(doc)/chi-fa-cosa/ChiFaCosa";

/* Il metodo: lo stesso contenuto di /chi-fa-cosa, dentro il sito e col menu
   (alberatura del 2026-11-04). /chi-fa-cosa resta la versione da mandare ai prospect. */
export const metadata: Metadata = {
  title: "Il metodo: prima la direzione, poi le mani",
  description:
    "Come lavoro da Fractional CMO: capire dove sei dai numeri veri, decidere la cosa che conta adesso, dire cosa non si fa, tenere tutti sulla stessa rotta. Poi il ritmo, mese per mese.",
  alternates: { canonical: "/il-metodo" },
  openGraph: {
    title: "Il metodo · Nicola Serrao, Fractional CMO",
    description: "Prima la direzione, poi le mani: come lavoro da direttore marketing esterno, e con che ritmo.",
    url: `${SITE.url}/il-metodo`,
  },
};

export default function IlMetodoPage() {
  return <ChiFaCosa etichetta="Il metodo" />;
}
