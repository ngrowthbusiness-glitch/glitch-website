import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import ChiFaCosa from "./ChiFaCosa";

export const metadata: Metadata = {
  alternates: { canonical: "/il-metodo" },
  title: "Come lavoro: prima la direzione, poi le mani",
  description:
    "Come lavoro da direttore marketing esterno: capire dove sei dai numeri veri, decidere la cosa che conta adesso, dire cosa non si fa, tenere tutti sulla stessa rotta. Poi il ritmo, mese per mese.",
  openGraph: {
    title: "Come lavoro · Nicola Serrao, Fractional CMO",
    description:
      "Prima la direzione, poi le mani: come lavoro da direttore marketing esterno, e con che ritmo.",
    url: `${SITE.url}/chi-fa-cosa`,
  },
};

export default function ChiFaCosaPage() {
  return <ChiFaCosa />;
}
