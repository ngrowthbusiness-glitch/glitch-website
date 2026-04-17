"use client";

import { useState } from "react";
import Link from "next/link";

const GROUPS = [
  {
    category: "Prima del contratto",
    intro: "Le domande da fare prima di firmare qualsiasi accordo.",
    questions: [
      {
        q: "Quante settimane prevede per la fase di analisi prima di proporre una strategia?",
        why: "Un consulente serio impiega 2-4 settimane solo per capire la situazione. Se risponde 'iniziamo subito', stai ricevendo una strategia template.",
      },
      {
        q: "Chiederà accesso ai miei analytics esistenti prima di presentare qualsiasi piano?",
        why: "Senza guardare i dati storici, qualsiasi strategia proposta si basa sulle sue ipotesi, non sulla tua realtà.",
      },
      {
        q: "Può mostrarmi risultati concreti — numeri, non solo testimonial — di progetti simili?",
        why: "I numeri contano. Un CPA migliorato del X%, un CPL ridotto di Y€. Se non ha dati, ha solo storie.",
      },
      {
        q: "Cosa succede se i risultati non arrivano entro i tempi previsti?",
        why: "La risposta rivela quanto il consulente si sente responsabile dei risultati — non solo delle attività svolte.",
      },
    ],
  },
  {
    category: "Metodo di lavoro",
    intro: "Come lavora davvero, non come lo descrive nella presentazione.",
    questions: [
      {
        q: "Come viene condotta la fase di analisi dati? Quali strumenti usa e cosa cerca per prima cosa?",
        why: "La risposta deve essere specifica: funnel per step, CPA per canale, drop-off, LTV. Se è vaga, il metodo non c'è.",
      },
      {
        q: "Intervisterà anche il team interno — commerciale, operativo, customer care — oltre a me?",
        why: "Le informazioni più utili sul cliente reale non stanno nell'imprenditore. Stanno nelle persone che parlano con i clienti ogni giorno.",
      },
      {
        q: "Con quale frequenza e in quale formato riceverò aggiornamenti sulle performance?",
        why: "Report mensili con dati di piattaforma non bastano. Deve essere chiaro cosa viene misurato, ogni quanto, e come viene presentato.",
      },
      {
        q: "Chi decide quali KPI usiamo per misurare il successo — e quando vengono stabiliti?",
        why: "I KPI devono essere decisi all'inizio, non scelti a posteriori in base a cosa è andato bene.",
      },
    ],
  },
  {
    category: "Struttura e responsabilità",
    intro: "Chi lavora davvero sul tuo progetto — e chi risponde quando qualcosa non funziona.",
    questions: [
      {
        q: "Chi lavora concretamente sul mio progetto? Il consulente con cui parlo o un team junior?",
        why: "Spesso il senior vende, il junior esegue. Non è necessariamente un problema — ma devi saperlo prima.",
      },
      {
        q: "Se le campagne non performano, come viene gestita la revisione della strategia?",
        why: "La risposta dice tutto sulla cultura di accountability. 'Ottimizziamo' è diverso da 'ri-analizziamo le premesse'.",
      },
      {
        q: "Qual è il processo decisionale per modificare il budget o fermare una campagna che non funziona?",
        why: "Deve esserci un processo chiaro. Budget bruciato senza trigger di stop è un problema di governance, non di creatività.",
      },
      {
        q: "Come distingue tra risultati non raggiunti per colpa della strategia e risultati non raggiunti per fattori esterni?",
        why: "Un consulente maturo sa distinguere cosa dipende da lui e cosa no. E sa documentarlo.",
      },
    ],
  },
  {
    category: "Segnali d'allarme (red flag)",
    intro: "Le risposte che devono farti alzare la mano.",
    questions: [
      {
        q: "Garantisce risultati specifici — un ROAS minimo, un numero di lead garantiti?",
        why: "Nessun consulente onesto garantisce risultati in advertising. Il marketing opera su variabili che nessuno controlla completamente.",
      },
      {
        q: "Propone una strategia completa già al secondo incontro, senza aver visto i tuoi dati?",
        why: "Impossibile fare una strategia fondata in meno di 2-3 settimane di analisi. Se arriva subito, è un template con il tuo nome.",
      },
      {
        q: "Non ha mai chiesto accesso agli analytics o agli account pubblicitari esistenti?",
        why: "Lavorare senza guardare i dati storici significa iniziare da zero ogni volta. È inefficiente e costoso.",
      },
      {
        q: "Parla solo di metriche di piattaforma (ROAS, CPM, CTR) e mai di KPI di business?",
        why: "Le metriche di piattaforma misurano azioni, non risultati. Se il consulente non distingue, c'è un problema di comprensione del business.",
      },
    ],
  },
];

export default function DomandeConsulentePage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim() || !email.trim()) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, type: "domande-consulente" }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setError(data.message || "Errore nell'invio. Riprova.");
      }
    } catch {
      setError("Errore di rete. Riprova.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <style>{`
        .dc-wrap {
          max-width: 800px;
          margin: 0 auto;
          padding: 120px 60px 100px;
        }
        .dc-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--text-dim); margin-bottom: 48px;
        }
        .dc-breadcrumb a { color: var(--teal); text-decoration: none; }
        .dc-breadcrumb a:hover { opacity: .7; }
        .dc-breadcrumb-sep { color: var(--text-faint); }

        .dc-eyebrow { font-size: 9px; letter-spacing: 4px; text-transform: uppercase; color: var(--teal); margin-bottom: 20px; }
        .dc-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(24px, 3.5vw, 40px); font-weight: 700;
          color: var(--text); line-height: 1.2; margin-bottom: 20px;
        }
        .dc-title em { font-style: italic; color: var(--teal); }
        .dc-lead { font-size: 13px; color: var(--text-dim); line-height: 1.9; margin-bottom: 56px; }
        .dc-lead strong { color: var(--text); }

        .dc-divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, var(--teal-border), transparent);
          margin: 48px 0;
        }

        .dc-group { margin-bottom: 48px; }
        .dc-group-header { margin-bottom: 20px; }
        .dc-group-cat {
          font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--teal); margin-bottom: 6px;
        }
        .dc-group-intro { font-size: 12px; color: var(--text-dim); line-height: 1.6; }

        .dc-q-item {
          border: 1px solid rgba(232,245,242,0.07);
          border-radius: 6px; padding: 20px 24px; margin-bottom: 10px;
          background: rgba(232,245,242,0.02);
        }
        .dc-q-text {
          font-size: 13px; font-weight: 600; color: var(--text);
          line-height: 1.5; margin-bottom: 10px;
        }
        .dc-q-why {
          font-size: 11px; color: var(--text-dim); line-height: 1.7;
          padding-left: 12px;
          border-left: 2px solid rgba(0,255,252,0.2);
        }
        .dc-q-why-label {
          font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--text-faint); margin-bottom: 4px;
        }

        .dc-redflag .dc-q-item {
          border-color: rgba(255,100,100,0.12);
          background: rgba(255,80,80,0.03);
        }
        .dc-redflag .dc-q-why {
          border-left-color: rgba(255,100,100,0.3);
        }

        /* EMAIL FORM */
        .dc-form-section {
          border: 1px solid var(--teal-border); border-radius: 10px;
          padding: 36px 40px; background: var(--teal-dim); margin-top: 56px;
        }
        .dc-form-eyebrow {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--teal); margin-bottom: 14px;
        }
        .dc-form-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 20px; font-weight: 700; color: var(--text);
          margin-bottom: 10px; line-height: 1.3;
        }
        .dc-form-sub { font-size: 12px; color: var(--text-dim); line-height: 1.7; margin-bottom: 24px; }
        .dc-form-row { display: flex; gap: 12px; }
        .dc-field { flex: 1; margin-bottom: 14px; }
        .dc-label {
          display: block; font-size: 10px; letter-spacing: 1.5px;
          text-transform: uppercase; color: var(--text-dim); margin-bottom: 7px;
        }
        .dc-input {
          width: 100%; padding: 12px 16px;
          background: rgba(232,245,242,0.05);
          border: 1px solid rgba(232,245,242,0.12);
          border-radius: 5px; color: var(--text); font-size: 13px;
          box-sizing: border-box; outline: none; transition: border-color .2s;
        }
        .dc-input:focus { border-color: var(--teal); }
        .dc-input::placeholder { color: var(--text-faint); }
        .dc-submit {
          width: 100%; padding: 14px;
          background: var(--teal); color: var(--bg);
          font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          border: none; border-radius: 5px; cursor: pointer;
          transition: opacity .2s; margin-top: 6px;
        }
        .dc-submit:hover:not(:disabled) { opacity: .85; }
        .dc-submit:disabled { opacity: .5; cursor: default; }
        .dc-error { font-size: 12px; color: #ff6b6b; margin-top: 10px; }
        .dc-privacy { font-size: 10px; color: var(--text-faint); margin-top: 12px; text-align: center; line-height: 1.6; }

        .dc-sent {
          text-align: center; padding: 32px 20px;
        }
        .dc-sent-icon { font-size: 36px; margin-bottom: 14px; }
        .dc-sent-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 22px; font-weight: 700; color: var(--text); margin-bottom: 10px;
        }
        .dc-sent-sub { font-size: 13px; color: var(--text-dim); line-height: 1.8; }

        @media (max-width: 768px) {
          .dc-wrap { padding: 100px 24px 80px; }
          .dc-form-section { padding: 24px 20px; }
          .dc-form-row { flex-direction: column; gap: 0; }
        }
        @media (max-width: 480px) {
          .dc-wrap { padding: 90px 16px 64px; }
        }
      `}</style>

      <div className="dc-wrap">
        <nav className="dc-breadcrumb">
          <Link href="/">Home</Link>
          <span className="dc-breadcrumb-sep">/</span>
          <Link href="/blog">Blog</Link>
          <span className="dc-breadcrumb-sep">/</span>
          <Link href="/blog/prime-settimane-consulente-marketing">Prime settimane consulente</Link>
          <span className="dc-breadcrumb-sep">/</span>
          <span>Lista domande</span>
        </nav>

        <div className="dc-eyebrow">Risorsa gratuita</div>
        <h1 className="dc-title">
          Le domande da fare<br />
          al tuo consulente<br />
          <em>prima di firmare.</em>
        </h1>
        <p className="dc-lead">
          <strong>16 domande concrete</strong> divise per area — prima del contratto, metodo di lavoro,
          struttura e responsabilità, e i segnali di allarme da riconoscere subito.
          Non serve metterlo alla prova: serve capire cosa aspettarti prima di iniziare.
        </p>

        {/* GROUPS */}
        {GROUPS.map((group, gi) => (
          <div key={gi} className={`dc-group${gi === 3 ? " dc-redflag" : ""}`}>
            <div className="dc-divider" />
            <div className="dc-group-header">
              <div className="dc-group-cat">{group.category}</div>
              <div className="dc-group-intro">{group.intro}</div>
            </div>
            {group.questions.map((item, qi) => (
              <div key={qi} className="dc-q-item">
                <div className="dc-q-text">{item.q}</div>
                <div className="dc-q-why">
                  <div className="dc-q-why-label">Perché chiederla</div>
                  {item.why}
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* EMAIL FORM */}
        <div className="dc-form-section">
          {sent ? (
            <div className="dc-sent">
              <div className="dc-sent-icon">✓</div>
              <div className="dc-sent-title">Lista inviata.</div>
              <div className="dc-sent-sub">
                Controlla la tua inbox — trovi la lista completa con tutte le domande
                e il perché di ognuna, pronta da usare.<br />
                Se non arriva, controlla lo spam.
              </div>
            </div>
          ) : (
            <>
              <div className="dc-form-eyebrow">Ricevila via email</div>
              <div className="dc-form-title">
                Vuoi la lista da portare alla prossima riunione?
              </div>
              <div className="dc-form-sub">
                Ti mandiamo la versione completa con tutte le domande e le spiegazioni
                — pronta da usare, stampare, o condividere col tuo team.
              </div>
              <form onSubmit={handleSubmit}>
                <div className="dc-form-row">
                  <div className="dc-field">
                    <label className="dc-label" htmlFor="dc-nome">Nome</label>
                    <input
                      id="dc-nome"
                      className="dc-input"
                      type="text"
                      placeholder="Il tuo nome"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                      required
                    />
                  </div>
                  <div className="dc-field">
                    <label className="dc-label" htmlFor="dc-email">Email</label>
                    <input
                      id="dc-email"
                      className="dc-input"
                      type="email"
                      placeholder="la.tua@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button className="dc-submit" type="submit" disabled={sending}>
                  {sending ? "Invio in corso…" : "Inviami la lista"}
                </button>
                {error && <div className="dc-error">{error}</div>}
                <div className="dc-privacy">
                  Nessuno spam. Solo questa lista. Puoi cancellarti in qualsiasi momento.
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
