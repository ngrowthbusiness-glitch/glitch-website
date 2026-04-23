export const SITE = {
  name: "Nicola Serrao",
  title: "Fractional CMO & AI-Powered Strategist",
  tagline: "La mente di un ufficio marketing. In una sola persona.",
  liveStatus: { current: 2, max: 3 },
  url: "https://nicolaserrao.com",
  email: "marketing@nicolaserrao.com",
  whatsapp: "https://wa.me/393385691369",
  phone: "+39 338 5691369",
  linkedin: "https://www.linkedin.com/in/nicola-serrao/",
  address: {
    street: "Via Oberdan 25",
    city: "Agugliano",
    province: "AN",
    cap: "60020",
    country: "Italia",
  },
  piva: "02703360426",
  cf: "SRRNCL93T31B963M",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-KJ66N7ZM",
  glitchEconomicsUrl: "https://glitch-economics.vercel.app",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/cosa-posso-fare", label: "Perché conoscerci" },
  { href: "/cosa-ho-fatto", label: "Cosa ho fatto" },
  { href: "/metodo-glitch", label: "Metodo GLITCH" },
  { href: "/blog", label: "Blog" },
  { href: "/risorse", label: "Risorse" },
] as const;

export const SERVICES = [
  {
    id: "strategia",
    title: "Strategia & Consulenza",
    description: "Analisi, posizionamento, roadmap operativa. Partiamo dai numeri, non dalle opinioni.",
    icon: "strategy",
  },
  {
    id: "adv",
    title: "Digital Marketing & ADV",
    description: "Meta Ads, Google Ads, campagne performance. Budget ottimizzato, risultati tracciabili.",
    icon: "adv",
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    description: "Shopify, WooCommerce, marketplace. Dall'analisi alla crescita delle vendite online.",
    icon: "ecommerce",
  },
  {
    id: "cro",
    title: "CRO",
    description: "Conversion Rate Optimization. A/B test, UX analysis, checkout optimization.",
    icon: "cro",
  },
  {
    id: "leadgen",
    title: "Lead Generation",
    description: "Funnel, landing page, nurturing. Prospect qualificati, non vanity metrics.",
    icon: "leadgen",
  },
  {
    id: "glitch",
    title: "Metodo GLITCH",
    description: "Il framework proprietario: Grounding, Loops, Insight, Testing, Calibration, Harvest.",
    icon: "glitch",
  },
] as const;

export const GLITCH_PHASES = [
  { letter: "G", name: "Grounding", subtitle: "Piedi a terra", description: "Analisi dello stato attuale, dati reali, nessuna illusione. Capiamo dove sei davvero." },
  { letter: "L", name: "Loops", subtitle: "Feedback", description: "Cicli di feedback continui. Ogni azione genera dati, ogni dato genera decisioni." },
  { letter: "I", name: "Insight", subtitle: "Strategia", description: "Dai dati all'intuizione strategica. Identifichiamo le leve che muovono i numeri." },
  { letter: "T", name: "Testing", subtitle: "Validazione", description: "Test rapidi, budget controllato. Validiamo prima di scalare." },
  { letter: "C", name: "Calibration", subtitle: "Correzione", description: "Ottimizzazione continua. Correggiamo la rotta in base ai risultati." },
  { letter: "H", name: "Harvest", subtitle: "Il raccolto", description: "Scala ciò che funziona. I risultati arrivano quando il sistema è rodato." },
] as const;
