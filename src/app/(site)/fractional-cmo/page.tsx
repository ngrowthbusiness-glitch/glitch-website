import type { Metadata } from "next";
import Fcmo from "@/components/fcmo/Fcmo";
import { FCMO } from "@/components/fcmo/testi";
import { SITE } from "@/lib/constants";

/* La pagina madre (alberatura e copy approvati il 2026-11-04): cos'e' un Fractional CMO,
   cosa fa, quando serve, come si confronta, quanto costa. Le domande escono anche come
   dati strutturati FAQ, perche' Google e le chat AI le leggono cosi'. */
export const metadata: Metadata = {
  title: { absolute: FCMO.seoTitolo },
  description: FCMO.seoDescrizione,
  alternates: { canonical: "/fractional-cmo" },
  openGraph: {
    title: FCMO.seoTitolo,
    description: FCMO.seoDescrizione,
    url: `${SITE.url}/fractional-cmo`,
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FCMO.faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FractionalCmoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Fcmo />
    </>
  );
}
