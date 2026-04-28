/**
 * Outreach v5 — schema TypeScript del config personalizzato per ogni prospect.
 * Ogni prospect ha un file JSON in `src/data/outreach/configs/{slug}.json`.
 */

export type OutreachStatus = "draft" | "ready" | "sent" | "viewed" | "converted" | "no";

export type ObservationBlock = {
  /** Etichetta breve (es. "01 · POSIZIONAMENTO") */
  label: string;
  /** Titolo dell'osservazione — frase secca, claim */
  title: string;
  /** Body dell'osservazione — usa "\n\n" per i paragrafi */
  body: string;
};

export type ProspectStyle = {
  bgPrimary: string;
  bgSecondary: string;
  textPrimary: string;
  textSecondary: string;
  textMuted?: string;
  accent: string;
  accentSecondary?: string;
  border: string;
  /** Nome font heading (esposto via CSS variable o fallback web-safe) */
  fontHeading: string;
  fontBody: string;
  /** Peso titoli (100 = ultra-light, 700 = bold) */
  headingWeight: number;
  bodyWeight: number;
  /** Letter-spacing dei titoli (es. "-0.04em") */
  headingLetterSpacing: string;
  /** Trasformazione titoli ("uppercase" | "none") */
  headingTransform?: "uppercase" | "none";
  /** Border radius bottoni (es. "30px") */
  buttonRadius: string;
  /** Padding bottoni (es. "12px 48px") */
  buttonPadding: string;
};

export type OutreachConfig = {
  slug: string;
  version: "v5";

  prospect: {
    companyName: string;
    contactName?: string;
    contactRole?: string;
    sector: string;
  };

  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    /** Testo firma sotto il subheadline (es. "Nicola Serrao · Fractional CMO") */
    signature: string;
    /** URL embed (Loom: "https://www.loom.com/embed/...", YouTube: "https://www.youtube.com/embed/...") oppure null */
    videoUrl: string | null;
    /** Aspect ratio del frame video. Default "16/9". "4/5" e "9/16" per video verticali. */
    videoAspect?: "16/9" | "4/5" | "9/16" | "1/1";
  };

  closing: {
    /** Eyebrow della sezione 2 (es. "QUELLO CHE HO VISTO") */
    title: string;
    /** Riga di apertura — "Sono ipotesi, non sentenze..." */
    introNote: string;
  };

  observations: ObservationBlock[];

  /** Claim "solo se ci sono le condizioni" — il marchio di onesta */
  conditions: string;

  cta: {
    primaryText: string;
    primaryHref: string;
    secondaryText: string;
    whatsappHref: string;
  };

  prospectStyle: ProspectStyle;

  meta: {
    createdAt: string;
    sentAt?: string;
    status: OutreachStatus;
    notes?: string;
  };
};
