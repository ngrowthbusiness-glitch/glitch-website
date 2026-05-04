import type { Metadata } from "next";
import { Playfair_Display, DM_Mono } from "next/font/google";
import "./globals.css";
import GTMScript, { GTMNoscript } from "@/components/layout/GTMScript";

const playfair = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nicolaserrao.com"),
  title: {
    default: "Nicola Serrao | Fractional CMO Italia",
    template: "%s | Nicola Serrao",
  },
  description:
    "Direttore marketing senior nella tua azienda, senza assumerlo. Strategia, numeri e responsabilità sui risultati a una frazione del costo.",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://nicolaserrao.com",
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
    <html
      lang="it"
      className={`${playfair.variable} ${dmMono.variable} h-full antialiased`}
    >
      <head>
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
