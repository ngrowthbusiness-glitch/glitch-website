import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/index.php",
        destination: "/?utm_source=biglietto&utm_medium=offline&utm_campaign=business_card",
        permanent: true,
      },
      // Restyling 2026-11 (ticket 11): le pagine che escono rimandano alla loro casa nuova
      { source: "/metodo-glitch", destination: "/il-metodo", permanent: true },
      { source: "/cosa-posso-fare", destination: "/il-metodo", permanent: true },
      { source: "/risorse/fractional-cmo", destination: "/fractional-cmo", permanent: true },
      { source: "/risorse/domande-consulente", destination: "/blog/domande-consulente-marketing", permanent: true },
      { source: "/risorse/:path*", destination: "/", permanent: true },
      { source: "/risorse", destination: "/", permanent: true },
      // I casi vecchi escono il 2026-11-05 (non reggevano sulle fonti). Temporanei: quando c'e' /clienti, puntano li' in 301
      { source: "/cosa-ho-fatto/:path*", destination: "/il-metodo", permanent: false },
      { source: "/cosa-ho-fatto", destination: "/il-metodo", permanent: false },
      // Redirect old .php outreach URLs to new Next.js routes
      {
        source: "/outreach/:slug.php",
        destination: "/outreach/:slug",
        permanent: true,
      },
      // Redirect short outreach URLs (/:slug → /outreach/:slug)
      { source: "/cascioli-rent", destination: "/outreach/cascioli-rent", permanent: true },
      { source: "/casciolirent", destination: "/outreach/cascioli-rent", permanent: true },
      { source: "/dea-group", destination: "/outreach/dea-group", permanent: true },
      { source: "/geco-geologia", destination: "/outreach/geco-geologia", permanent: true },
      { source: "/piante-stabilizzate", destination: "/outreach/piante-stabilizzate", permanent: true },
      { source: "/linfadecor", destination: "/outreach/piante-stabilizzate", permanent: true },
      { source: "/von-schnauzer", destination: "/outreach/von-schnauzer", permanent: true },
      { source: "/lm-legnami", destination: "/outreach/lm-legnami", permanent: true },
      { source: "/ulisse", destination: "/outreach/ulisse", permanent: true },
      { source: "/net-impianti", destination: "/outreach/net-impianti", permanent: true },
      { source: "/unibag", destination: "/outreach/unibag", permanent: true },
      { source: "/blulogistic", destination: "/outreach/blulogistic", permanent: true },
      { source: "/la-femme", destination: "/outreach/la-femme", permanent: true },
      { source: "/t33", destination: "/outreach/t33", permanent: true },
      { source: "/tecnografting", destination: "/outreach/tecnografting", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
