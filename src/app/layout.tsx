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
    default: "Nicola Serrao — Digital Marketing Strategist",
    template: "%s | Nicola Serrao",
  },
  description:
    "Strategia, digital marketing, e-commerce, CRO e lead generation per imprese italiane. Metodo GLITCH.",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://nicolaserrao.com",
    siteName: "Nicola Serrao",
    title: "Nicola Serrao — Digital Marketing Strategist",
    description:
      "Strategia, digital marketing, e-commerce, CRO e lead generation per imprese italiane.",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
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
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <GTMNoscript />
        {children}
      </body>
    </html>
  );
}
