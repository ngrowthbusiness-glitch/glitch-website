import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlowBackground from "@/components/layout/GlowBackground";
import CookieBanner from "@/components/layout/CookieBanner";
import FeedbackPopup from "@/components/layout/FeedbackPopup";
import { getPersonSchema, getOrganizationSchema } from "@/lib/structured-data";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPersonSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getOrganizationSchema()),
        }}
      />
      <GlowBackground />
      <Navbar />
      <main className="relative z-1 pt-[var(--nav-h)] flex-1">
        {children}
      </main>
      <Footer />
      <CookieBanner />
      <FeedbackPopup />
    </>
  );
}
