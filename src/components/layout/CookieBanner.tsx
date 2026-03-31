"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_NAME = "ns_cookie_consent";
const COOKIE_DAYS = 365;

function getConsent(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`));
  return match ? match[2] : null;
}

function setConsent(value: string) {
  const expires = new Date();
  expires.setDate(expires.getDate() + COOKIE_DAYS);
  document.cookie = `${COOKIE_NAME}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

function updateGTMConsent(granted: boolean) {
  window.dataLayer = window.dataLayer || [];
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  }

  if (granted) {
    gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
    window.dataLayer.push({ event: "cookie_consent_granted" });
  } else {
    gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
    window.dataLayer.push({ event: "cookie_consent_denied" });
  }
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent === "granted") {
      updateGTMConsent(true);
    } else if (consent === "denied") {
      updateGTMConsent(false);
    } else {
      setVisible(true);
    }
  }, []);

  function handleChoice(granted: boolean) {
    setConsent(granted ? "granted" : "denied");
    updateGTMConsent(granted);
    setHiding(true);
    setTimeout(() => setVisible(false), 300);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] backdrop-blur-[16px]"
      style={{
        background: "rgba(10,14,19,0.97)",
        borderTop: "1px solid var(--teal-border)",
        padding: "28px 60px",
        animation: hiding
          ? "slideDown 0.3s ease forwards"
          : "slideUp 0.4s ease both",
      }}
    >
      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(0); opacity: 1; } to { transform: translateY(100%); opacity: 0; } }
        @media (max-width: 768px) {
          .cookie-banner-inner { padding: 24px 24px !important; }
        }
        @media (max-width: 480px) {
          .cookie-banner-inner { padding: 20px 20px !important; }
        }
      `}</style>
      <div
        className="cookie-banner-inner"
        style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: "48px" }}
      >
        <div style={{ flex: 1 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "8px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--teal)",
              marginBottom: "10px",
            }}
          >
            Cookie & Privacy
          </span>
          <p
            style={{
              fontSize: "11px",
              lineHeight: 1.8,
              color: "var(--text-dim)",
              margin: 0,
            }}
          >
            Uso cookie tecnici (necessari) e cookie di profilazione (Meta Pixel
            via GTM) per analizzare il traffico e migliorare la tua esperienza.
            Puoi accettare tutto o continuare solo con i necessari.{" "}
            <Link
              href="/privacy-policy"
              className="no-underline hover:opacity-70 transition-opacity"
              style={{ color: "var(--teal)" }}
            >
              Leggi la policy completa &rarr;
            </Link>
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
          <button
            onClick={() => handleChoice(false)}
            className="hover:-translate-y-px transition-all duration-200"
            style={{
              fontSize: "9px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--teal)",
              background: "transparent",
              border: "1px solid var(--teal-border)",
              padding: "11px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,255,252,0.08)";
              e.currentTarget.style.borderColor = "var(--teal)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "var(--teal-border)";
            }}
          >
            Solo necessari
          </button>
          <button
            onClick={() => handleChoice(true)}
            className="hover:opacity-85 hover:-translate-y-px transition-all duration-200"
            style={{
              fontSize: "9px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              background: "var(--teal)",
              color: "var(--bg)",
              border: "none",
              padding: "11px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: 500,
              whiteSpace: "nowrap",
              fontFamily: "inherit",
            }}
          >
            Accetta tutto
          </button>
        </div>
      </div>
    </div>
  );
}
