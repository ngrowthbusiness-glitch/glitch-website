export interface OutreachSection {
  type: "hero" | "problem" | "method" | "strategy" | "metrics" | "insight" | "teaser" | "cta" | "custom";
  title?: string;
  subtitle?: string;
  content?: string;
  items?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  metrics?: Array<{
    label: string;
    value: string;
  }>;
}

export interface OutreachBox {
  title: string;
  description: string;
  image?: string;
}

export interface OutreachConfig {
  slug: string;
  companyName: string;
  contactName?: string;
  contactRole?: string;
  logo?: string;
  sector: string;

  palette: {
    primary: string;
    primaryDim: string;
    background: string;
    text: string;
    textDim: string;
    border: string;
  };

  headingFont?: string;
  bodyFont?: string;

  heroTitle: string;
  heroSubtitle: string;
  heroTagline?: string;

  /** v3 — Pitch: expanded concept in entrepreneurial language */
  pitch?: string;

  /** v3 — 3 boxes: Nicola's skill → prospect's benefit */
  boxes?: OutreachBox[];

  /** v3 — Custom urgency text */
  urgencyText?: string;

  /** Legacy v1 sections (backward compat) */
  sections: OutreachSection[];

  cta: {
    title: string;
    subtitle?: string;
    ctaQuestion?: string;
    whatsappText?: string;
    emailSubject?: string;
    showGlitchEconomics?: boolean;
  };

  meta?: {
    createdAt?: string;
    status?: "draft" | "sent" | "viewed" | "converted";
    notionPageId?: string;
    notes?: string;
  };
}
