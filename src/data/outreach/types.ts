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

export interface OutreachConfig {
  slug: string;
  companyName: string;
  contactName?: string;
  contactRole?: string;
  logo?: string;
  sector: string;

  /** Custom palette overrides — falls back to site defaults */
  palette: {
    primary: string;
    primaryDim: string;
    background: string;
    text: string;
    textDim: string;
    border: string;
  };

  /** Custom font override (Google Fonts name) */
  headingFont?: string;
  bodyFont?: string;

  /** Hero section */
  heroTitle: string;
  heroSubtitle: string;
  heroTagline?: string;

  /** Main content sections */
  sections: OutreachSection[];

  /** CTA config */
  cta: {
    title: string;
    subtitle?: string;
    /** Strong question for the interactive response box */
    ctaQuestion?: string;
    whatsappText?: string;
    emailSubject?: string;
    showGlitchEconomics?: boolean;
  };

  /** Metadata for Notion integration */
  meta?: {
    createdAt?: string;
    status?: "draft" | "sent" | "viewed" | "converted";
    notionPageId?: string;
    notes?: string;
  };
}
