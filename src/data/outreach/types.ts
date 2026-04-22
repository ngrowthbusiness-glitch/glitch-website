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

/* ── v4 types — video-first one-screen landing ── */

export interface OutreachBlock {
  today: string;
  tomorrow: string;
}

export interface OutreachV4Cta {
  text: string;
  whatsappText?: string;
  emailSubject?: string;
}

/* ── Main config — supports both legacy (v3) and new (v4) formats ── */

export interface OutreachConfig {
  slug: string;
  companyName: string;
  contactName?: string;
  contactRole?: string;
  logo?: string;
  sector: string;

  /** v4 — version discriminator */
  version?: "v4";

  /** v4 — Loom embed URL */
  videoUrl?: string | null;

  /** v4 — today/tomorrow blocks (max 3) */
  blocks?: OutreachBlock[];

  /* ── Legacy v3 fields (kept for backward compat with sent pages) ── */

  palette?: {
    primary: string;
    primaryDim: string;
    background: string;
    text: string;
    textDim: string;
    border: string;
  };

  headingFont?: string;
  bodyFont?: string;

  heroTitle?: string;
  heroSubtitle?: string;
  heroTagline?: string;

  pitch?: string;
  boxes?: OutreachBox[];

  timeline?: {
    before: { label: string; points: string[] };
    after: { label: string; points: string[] };
  };

  valueRows?: Array<{
    title: string;
    mine: { headline: string; points: string[] };
    theirs: { headline: string; points: string[] };
  }>;

  takeaways?: string[];
  urgencyText?: string;

  /** Legacy v1 sections */
  sections?: OutreachSection[];

  cta: OutreachV4Cta & {
    title?: string;
    subtitle?: string;
    ctaQuestion?: string;
    showGlitchEconomics?: boolean;
  };

  meta?: {
    createdAt?: string;
    status?: "draft" | "ready" | "sent" | "viewed" | "converted";
    notionPageId?: string;
    notes?: string;
  };
}
