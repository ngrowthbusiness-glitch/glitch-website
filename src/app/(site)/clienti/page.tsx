import type { Metadata } from "next";
import Clienti from "@/components/clienti/Clienti";
import { SITE } from "@/lib/constants";

/* Clienti: il prima e l'adesso dei clienti che Nicola segue adesso, anonimi (concept «La regia», 2026-11-05).
   Sostituisce i casi vecchi di /cosa-ho-fatto, che rimandano qui. */
export const metadata: Metadata = {
  title: "Clienti: prima di crescere, si mette ordine",
  description:
    "I clienti che seguo adesso da Fractional CMO, senza nomi: perché sono arrivati, cosa mancava, cosa ho fatto e come vanno adesso.",
  alternates: { canonical: "/clienti" },
  openGraph: {
    title: "Clienti · Nicola Serrao, Fractional CMO",
    description: "Prima di crescere, si mette ordine: il prima e l'adesso dei clienti che seguo.",
    url: `${SITE.url}/clienti`,
  },
};

export default function ClientiPage() {
  return <Clienti />;
}
