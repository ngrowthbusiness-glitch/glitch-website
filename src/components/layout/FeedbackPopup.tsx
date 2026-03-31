"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

const DELAY_MS = 60000;
const STORAGE_KEY = "ns_feedback_given";

const CHOICES = [
  { key: "non_sicuro", label: "Non sono sicuro che faccia per me" },
  { key: "prezzo", label: "Non conosco ancora i prezzi" },
  { key: "tempo", label: "Non ho tempo adesso" },
  { key: "fiducia", label: "Voglio sapere di più prima di parlare" },
  { key: "altro", label: "Altro" },
] as const;

type Step = "choice" | "text" | "thanks";

export default function FeedbackPopup() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<Step>("choice");
  const [choice, setChoice] = useState("");
  const [text, setText] = useState("");
  const pathname = usePathname();

  const show = useCallback(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setVisible(true);
  }, []);

  useEffect(() => {
    // Only show on homepage
    if (pathname !== "/") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(show, DELAY_MS);

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) show();
    }
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [show, pathname]);

  function close() {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }

  async function submit() {
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          choice,
          text,
          page: window.location.pathname,
          ts: new Date().toISOString(),
        }),
      });
    } catch {
      // silently fail
    }
    setStep("thanks");
    sessionStorage.setItem(STORAGE_KEY, "1");
    setTimeout(close, 2500);
  }

  if (!visible) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        padding: "24px",
        animation: "fadeIn 0.3s ease both",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popUp { from { opacity: 0; transform: translateY(16px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          position: "relative",
          background: "rgba(10,14,19,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--teal-border)",
          borderRadius: "12px",
          padding: "36px 32px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          animation: "popUp 0.4s ease both 0.05s",
        }}
      >
        {/* Close button */}
        <button
          onClick={close}
          aria-label="Chiudi"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "transparent",
            border: "1px solid rgba(232,245,242,0.1)",
            color: "var(--text-faint)",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--teal)";
            e.currentTarget.style.borderColor = "var(--teal-border)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-faint)";
            e.currentTarget.style.borderColor = "rgba(232,245,242,0.1)";
          }}
        >
          &times;
        </button>

        {step === "choice" && (
          <>
            <div
              style={{
                fontSize: "8px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--teal)",
                marginBottom: "12px",
              }}
            >
              Feedback veloce
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-dim)",
                marginBottom: "24px",
                lineHeight: 1.7,
              }}
            >
              Cosa ti frena dal fare il prossimo passo?
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {CHOICES.map((c) => (
                <button
                  key={c.key}
                  onClick={() => {
                    setChoice(c.key);
                    setStep("text");
                  }}
                  style={{
                    textAlign: "left",
                    fontSize: "11px",
                    color: "var(--text-dim)",
                    border: "1px solid rgba(232,245,242,0.08)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    background: "rgba(232,245,242,0.02)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "inherit",
                    lineHeight: 1.5,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--teal-border)";
                    e.currentTarget.style.color = "var(--teal)";
                    e.currentTarget.style.background = "rgba(0,255,252,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(232,245,242,0.08)";
                    e.currentTarget.style.color = "var(--text-dim)";
                    e.currentTarget.style.background = "rgba(232,245,242,0.02)";
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </>
        )}

        {step === "text" && (
          <>
            <div
              style={{
                fontSize: "8px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--teal)",
                marginBottom: "14px",
              }}
            >
              Vuoi aggiungere qualcosa?
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Facoltativo — scrivi pure liberamente"
              maxLength={1000}
              style={{
                width: "100%",
                height: "100px",
                background: "rgba(232,245,242,0.02)",
                border: "1px solid rgba(232,245,242,0.08)",
                borderRadius: "8px",
                padding: "12px 14px",
                fontSize: "11px",
                color: "var(--text)",
                resize: "none",
                outline: "none",
                fontFamily: "inherit",
                lineHeight: 1.7,
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--teal-border)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(232,245,242,0.08)";
              }}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
              <button
                onClick={submit}
                style={{
                  flex: 1,
                  fontSize: "9px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  background: "var(--teal)",
                  color: "var(--bg)",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: 500,
                  fontFamily: "inherit",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                Invia
              </button>
              <button
                onClick={() => {
                  setText("");
                  submit();
                }}
                style={{
                  fontSize: "9px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--text-faint)",
                  background: "transparent",
                  border: "1px solid rgba(232,245,242,0.1)",
                  padding: "12px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--teal)";
                  e.currentTarget.style.borderColor = "var(--teal-border)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-faint)";
                  e.currentTarget.style.borderColor = "rgba(232,245,242,0.1)";
                }}
              >
                Salta
              </button>
            </div>
          </>
        )}

        {step === "thanks" && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: "22px", color: "var(--teal)", marginBottom: "12px" }}>&#10003;</div>
            <p style={{ fontSize: "12px", color: "var(--teal)", letterSpacing: "1px" }}>
              Grazie per il feedback!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
