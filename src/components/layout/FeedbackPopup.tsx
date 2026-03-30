"use client";

import { useState, useEffect, useCallback } from "react";

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

  const show = useCallback(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setVisible(true);
  }, []);

  useEffect(() => {
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
  }, [show]);

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
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[rgba(0,0,0,0.6)] backdrop-blur-sm p-5"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="glass w-full max-w-md p-8 relative animate-fade-up">
        <button
          onClick={close}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-transparent border border-[rgba(255,255,255,0.12)] text-dimmed text-sm flex items-center justify-center cursor-pointer hover:text-primary hover:border-primary transition-colors font-[inherit]"
          aria-label="Chiudi"
        >
          &times;
        </button>

        {step === "choice" && (
          <>
            <div className="text-[9px] tracking-[3px] uppercase text-primary mb-3">
              Feedback veloce
            </div>
            <p className="text-sm text-dimmed mb-6 leading-relaxed">
              Cosa ti frena dal fare il prossimo passo?
            </p>
            <div className="flex flex-col gap-2.5">
              {CHOICES.map((c) => (
                <button
                  key={c.key}
                  onClick={() => {
                    setChoice(c.key);
                    setStep("text");
                  }}
                  className="text-left text-xs text-dimmed border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 bg-[rgba(255,255,255,0.03)] hover:border-primary hover:text-primary cursor-pointer transition-all duration-200 font-[inherit]"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </>
        )}

        {step === "text" && (
          <>
            <div className="text-[9px] tracking-[3px] uppercase text-primary mb-3">
              Vuoi aggiungere qualcosa?
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Facoltativo — scrivi pure liberamente"
              maxLength={1000}
              className="w-full h-28 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg p-3 text-xs text-foreground placeholder:text-faint resize-none focus:outline-none focus:border-primary transition-colors font-[inherit]"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={submit}
                className="flex-1 text-[10px] tracking-[2px] uppercase text-primary-fg bg-primary border-none px-5 py-3 rounded cursor-pointer font-medium hover:opacity-85 transition-opacity font-[inherit]"
              >
                Invia
              </button>
              <button
                onClick={() => {
                  setText("");
                  submit();
                }}
                className="text-[10px] tracking-[2px] uppercase text-dimmed bg-transparent border border-border px-5 py-3 rounded cursor-pointer hover:text-primary transition-colors font-[inherit]"
              >
                Salta
              </button>
            </div>
          </>
        )}

        {step === "thanks" && (
          <div className="text-center py-6">
            <div className="text-2xl mb-3">&#10003;</div>
            <p className="text-sm text-primary">
              Grazie per il feedback!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
