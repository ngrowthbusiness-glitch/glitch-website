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
      className="fixed bottom-0 left-0 right-0 z-[9999] backdrop-blur-[16px] px-[60px] py-5 max-md:px-6 max-[480px]:px-5"
      style={{
        background: "rgba(10,14,19,0.97)",
        borderTop: "1px solid var(--teal-border)",
        animation: hiding
          ? "slideDown 0.3s ease forwards"
          : "slideUp 0.4s ease both",
      }}
    >
      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(0); opacity: 1; } to { transform: translateY(100%); opacity: 0; } }
      `}</style>
      <div className="max-w-[1100px] mx-auto flex items-center gap-10 max-md:flex-col max-md:items-start max-md:gap-5">
        <div className="flex-1">
          <span
            className="inline-block text-[9px] tracking-[3px] uppercase mb-2"
            style={{ color: "var(--teal)" }}
          >
            Cookie & Privacy
          </span>
          <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-dim)" }}>
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
        <div className="flex gap-3 shrink-0 max-md:w-full max-[480px]:flex-col">
          <button
            onClick={() => handleChoice(false)}
            className="text-[10px] tracking-[2px] uppercase bg-transparent px-5 py-3 rounded cursor-pointer hover:-translate-y-px transition-all duration-200 max-md:flex-1 text-center whitespace-nowrap font-[inherit]"
            style={{
              color: "var(--teal)",
              border: "1px solid var(--teal-border)",
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
            className="text-[10px] tracking-[2px] uppercase border-none px-5 py-3 rounded cursor-pointer font-medium hover:opacity-85 hover:-translate-y-px transition-all duration-200 max-md:flex-1 text-center whitespace-nowrap font-[inherit]"
            style={{
              background: "var(--teal)",
              color: "var(--bg)",
            }}
          >
            Accetta tutto
          </button>
        </div>
      </div>
    </div>
  );
}
