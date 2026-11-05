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
    <div className="ck" role="region" aria-label="Cookie e privacy" data-esce={hiding ? "1" : "0"}>
      <style>{`
        .ck{position:fixed;left:24px;bottom:24px;z-index:9999;width:min(440px,calc(100vw - 48px));padding:20px 20px 18px;border-radius:18px;background:var(--surface);box-shadow:inset 0 0 0 1px var(--line),0 24px 60px -24px rgba(0,0,0,.35);font-family:var(--font-manrope),sans-serif;animation:ck-su .45s cubic-bezier(.2,.7,.2,1) both}
        .ck[data-esce="1"]{animation:ck-giu .3s ease forwards}
        @keyframes ck-su{from{transform:translateY(16px);opacity:0}to{transform:none;opacity:1}}
        @keyframes ck-giu{to{transform:translateY(16px);opacity:0}}
        .ck b{display:block;font-size:15px;font-weight:800;color:var(--ink);margin-bottom:6px}
        .ck p{font-size:13.5px;line-height:1.6;color:var(--body);margin:0}
        .ck p a{color:var(--accent);font-weight:700;text-decoration:none}
        .ck p a:hover{text-decoration:underline}
        .ck-az{display:flex;gap:8px;margin-top:14px}
        .ck-az button{flex:1;font:700 14px/1 var(--font-manrope),sans-serif;padding:12px 14px;border-radius:10px;cursor:pointer;transition:border-color .2s,color .2s,transform .25s cubic-bezier(.2,.7,.2,1)}
        .ck-no{background:var(--surface);color:var(--ink);border:1px solid var(--line)}
        .ck-no:hover{border-color:var(--accent);color:var(--accent)}
        .ck-si{background:var(--accent);color:var(--accent-ink);border:1px solid var(--accent)}
        .ck-si:hover{transform:translateY(-1px)}
        @media (max-width:480px){.ck{left:12px;right:12px;bottom:12px;width:auto}}
        @media (prefers-reduced-motion:reduce){.ck,.ck[data-esce="1"]{animation:none}}
        .v1 .ck{background:rgba(10,14,19,0.97);box-shadow:inset 0 0 0 1px rgba(0,255,252,0.22)}
      `}</style>
      <b>Cookie e privacy</b>
      <p>
        Uso cookie tecnici (necessari) e cookie di profilazione (Meta Pixel via GTM) per analizzare il traffico e
        migliorare la tua esperienza. Puoi accettare tutto o continuare solo con i necessari.{" "}
        <Link href="/privacy-policy">Leggi la policy completa</Link>
      </p>
      <div className="ck-az">
        <button type="button" className="ck-no" onClick={() => handleChoice(false)}>
          Solo necessari
        </button>
        <button type="button" className="ck-si" onClick={() => handleChoice(true)}>
          Accetta tutto
        </button>
      </div>
    </div>
  );
}
