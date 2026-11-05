import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import GTMScript, { GTMNoscript } from "@/components/layout/GTMScript";
import { SCRIPT_TEMA } from "@/lib/tema";
import { SITE } from "@/lib/constants";

/* Un font solo, Manrope (Brand Nicola Serrao v2.0). Playfair e DM Mono restano
   soltanto nel layout di /outreach, che non passa dal restyling. */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Nicola Serrao | Fractional CMO Italia",
    template: "%s | Nicola Serrao",
  },
  description:
    "Direttore marketing senior nella tua azienda, senza assumerlo. Strategia, numeri e responsabilità sui risultati a una frazione del costo.",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE.url,
    siteName: "Nicola Serrao",
    title: "Nicola Serrao | Fractional CMO Italia",
    description:
      "Direttore marketing senior nella tua azienda, senza assumerlo. Strategia, numeri e responsabilità sui risultati a una frazione del costo.",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${manrope.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* il tema scelto si applica prima del primo disegno, cosi' la pagina non lampeggia */}
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_TEMA }} />
        <GTMScript />
      </head>
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <GTMNoscript />
        {children}
      </body>
    </html>
  );
}
