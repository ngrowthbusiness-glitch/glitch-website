import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Mono } from "next/font/google";

/* Outreach e' escluso dal restyling (2026-11-04): tiene il vecchio sistema.
   .v1 (in globals.css) rimette scuro fisso e teal acceso; i font li carica solo lui. */
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

const inter = Inter({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Analisi privata",
  description: "Pagina riservata.",
};

export default function OutreachLayout({ children }: { children: ReactNode }) {
  return <div className={`v1 ${playfair.variable} ${dmMono.variable} ${inter.variable}`}>{children}</div>;
}
