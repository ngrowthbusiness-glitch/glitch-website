import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
  return <div className={inter.variable}>{children}</div>;
}
