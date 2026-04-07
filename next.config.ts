import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/index.php",
        destination: "/?utm_source=biglietto&utm_medium=offline&utm_campaign=business_card",
        permanent: true,
      },
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
