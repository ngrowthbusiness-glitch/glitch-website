import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import ChiFaCosa from "./ChiFaCosa";

export const metadata: Metadata = {
  title: "Chi fa cosa",
  description:
    "Le aree di un business online, dove metto le mani e dove no, cosa succede davvero dentro ognuna e con che ritmo. La risposta lunga alla domanda: cosa fai tu, nel concreto?",
  openGraph: {
    title: "Chi fa cosa – Nicola Serrao",
    description:
      "Le aree di un business online, dove metto le mani e dove no, cosa succede davvero dentro ognuna e con che ritmo.",
    url: `${SITE.url}/chi-fa-cosa`,
  },
};

export default function ChiFaCosaPage() {
  return <ChiFaCosa />;
}
