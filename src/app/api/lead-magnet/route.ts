import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID) || 6;
const NOTIFY_EMAIL = process.env.BREVO_NOTIFY_EMAIL || "n.growth.business@gmail.com";
const SENDER_NAME = "Nicola Serrao — GLITCH";
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || "noreply@nicolaserrao.com";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ─────────────────────────────────────────────
   AUDIT SCORE — email content generator
───────────────────────────────────────────── */
type AuditProfile = {
  label: string;
  tagline: string;
  color: string;
  summary: string;
  items: string[];
  nextStep: string;
};

function getAuditProfile(score: number): AuditProfile {
  if (score <= 3) return {
    label: "Fase iniziale",
    tagline: "Il tuo marketing sta operando quasi alla cieca.",
    color: "#ff6b6b",
    summary: "Hai pochi dati strutturati. Le decisioni si basano principalmente sull'intuizione e sulle metriche di piattaforma (ROAS, CPM, CPC) — non su dati di business reali. Questo non significa che stai sprecando tutto, ma significa che non sai cosa funziona davvero e cosa no.",
    items: [
      "Configura gli eventi di conversione in GA4 (acquisti, lead, checkout completati)",
      "Imposta il tracciamento del funnel step-by-step: sessioni → aggiunte al carrello → checkout → acquisto",
      "Calcola il tuo CPA reale per canale — non il ROAS medio aggregato",
      "Prima di fare nuove campagne, capisci dove si rompe il funnel esistente",
    ],
    nextStep: "Prima priorità: audit analytics. Prima di spendere un euro in più, capisci cosa stai misurando.",
  };
  if (score <= 6) return {
    label: "In costruzione",
    tagline: "Hai delle basi. Mancano ancora i collegamenti critici.",
    color: "#ffd93d",
    summary: "Hai alcune metriche attive e un'idea dei tuoi numeri principali. Il problema è che i dati che guardi non sono ancora connessi agli obiettivi di business reali. Stai probabilmente ottimizzando le metriche di piattaforma, non i risultati.",
    items: [
      "Collega le metriche di campagna ai KPI di business (CPA reale, LTV, margine)",
      "Segmenta le performance per canale — smetti di guardare le medie aggregate",
      "Analizza il LTV dei clienti esistenti per capire dove acquisire davvero valore",
      "Costruisci un cruscotto con massimo 5 metriche — quelle che decidi prima di aprire il laptop",
    ],
    nextStep: "Priorità: allineamento KPI. Ridefinisci cosa misuri prima di ottimizzare le campagne.",
  };
  if (score <= 9) return {
    label: "Quasi solido",
    tagline: "Buona struttura. Ci sono alcune lacune specifiche da chiudere.",
    color: "#00ffb3",
    summary: "Hai un'infrastruttura dati discreta. Misuri le cose giuste nella maggior parte dei casi. Le opportunità di miglioramento sono ora specifiche — non sistemiche. Un lavoro mirato sulle aree deboli porterebbe un salto di efficienza misurabile.",
    items: [
      "Identifica i 2-3 touchpoint del funnel dove hai ancora dati incompleti",
      "Verifica che le esclusioni di targeting (clienti esistenti, retargeting) siano configurate correttamente",
      "Implementa test A/B sistematici — non occasionali — almeno su una variabile per mese",
      "Controlla l'attribuzione: il modello che usi riflette il percorso reale del tuo cliente?",
    ],
    nextStep: "Priorità: chiudere le lacune specifiche. Non serve una ristrutturazione — serve un'ottimizzazione mirata.",
  };
  return {
    label: "Data-driven",
    tagline: "Sei tra il 5% delle aziende che misura davvero.",
    color: "#00fffc",
    summary: "Hai una struttura dati solida. Misuri i KPI giusti, segmenti le performance per canale, e prendi decisioni basate su dati di business reali. Il lavoro ora è mantenere questa disciplina mentre scala il business — e trovare i margini di ottimizzazione più sottili.",
    items: [
      "Focalizzati sui test incrementali: ogni test dovrebbe migliorare un numero specifico",
      "Analizza la coorte: i clienti acquisiti in periodi diversi si comportano diversamente?",
      "Valuta se la tua struttura di attribuzione regge quando aumenta il budget e i canali",
      "Costruisci un sistema di forecasting: dai dati storici, cosa ti aspetti il prossimo trimestre?",
    ],
    nextStep: "Sei in una buona posizione. Il valore ora è nel dettaglio e nel mantenere la disciplina di misurazione.",
  };
}

function buildAuditEmail(nome: string, score: number, total: number, answers: Record<string, boolean>): string {
  const profile = getAuditProfile(score);
  const pct = Math.round((score / total) * 100);
  const barWidth = Math.max(4, pct);

  const answersHtml = Object.entries(answers).map(([q, a]) => `
    <tr>
      <td style="padding:8px 0;font-size:12px;color:rgba(232,240,255,0.6);line-height:1.5;border-bottom:1px solid rgba(255,255,255,0.04);vertical-align:top;padding-right:12px">${escapeHtml(q)}</td>
      <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);white-space:nowrap;vertical-align:top">
        <span style="font-size:10px;letter-spacing:1px;font-weight:600;color:${a ? '#00fffc' : '#ff6b6b'}">${a ? "✓ SÌ" : "✗ NO"}</span>
      </td>
    </tr>
  `).join("");

  const itemsHtml = profile.items.map((item, i) => `
    <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.04)">
      <span style="color:#00fffc;font-size:11px;font-family:monospace;flex-shrink:0;padding-top:2px">0${i + 1}</span>
      <span style="font-size:13px;color:rgba(232,240,255,0.75);line-height:1.6">${escapeHtml(item)}</span>
    </div>
  `).join("");

  return `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0a0e13;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="max-width:600px;margin:0 auto;padding:40px 24px">

  <!-- Header -->
  <div style="margin-bottom:32px">
    <p style="font-size:9px;letter-spacing:4px;text-transform:uppercase;color:#00fffc;margin:0 0 8px">nicolaserrao.com</p>
    <h1 style="font-size:22px;font-weight:700;color:#e8f0ff;margin:0;line-height:1.3">Il tuo Audit Score</h1>
  </div>

  <!-- Score block -->
  <div style="background:rgba(0,255,252,0.05);border:1px solid rgba(0,255,252,0.2);border-radius:10px;padding:28px;margin-bottom:28px">
    <p style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(232,240,255,0.4);margin:0 0 10px">Ciao ${escapeHtml(nome)} — il tuo risultato</p>
    <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:6px">
      <span style="font-size:48px;font-weight:700;font-family:monospace;color:${profile.color};line-height:1">${score}</span>
      <span style="font-size:18px;color:rgba(232,240,255,0.3);font-family:monospace">/ ${total}</span>
    </div>
    <!-- Bar -->
    <div style="height:4px;background:rgba(255,255,255,0.08);border-radius:2px;margin:12px 0 16px;overflow:hidden">
      <div style="height:100%;width:${barWidth}%;background:${profile.color};border-radius:2px"></div>
    </div>
    <p style="font-size:16px;font-weight:700;color:${profile.color};margin:0 0 6px">${escapeHtml(profile.label)}</p>
    <p style="font-size:13px;color:rgba(232,240,255,0.6);margin:0;line-height:1.6">${escapeHtml(profile.tagline)}</p>
  </div>

  <!-- Summary -->
  <div style="margin-bottom:28px">
    <p style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(232,240,255,0.3);margin:0 0 12px">Cosa significa</p>
    <p style="font-size:13px;color:rgba(232,240,255,0.7);line-height:1.8;margin:0">${escapeHtml(profile.summary)}</p>
  </div>

  <!-- Actions -->
  <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:24px;margin-bottom:28px">
    <p style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(232,240,255,0.3);margin:0 0 16px">Prossimi passi consigliati</p>
    ${itemsHtml}
    <div style="margin-top:16px;padding:14px;background:rgba(0,255,252,0.06);border-left:3px solid #00fffc;border-radius:0 4px 4px 0">
      <p style="font-size:12px;color:rgba(232,240,255,0.6);margin:0;line-height:1.6"><strong style="color:#00fffc">Next step:</strong> ${escapeHtml(profile.nextStep)}</p>
    </div>
  </div>

  <!-- Answers recap -->
  <div style="margin-bottom:36px">
    <p style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(232,240,255,0.3);margin:0 0 12px">Le tue risposte</p>
    <table style="width:100%;border-collapse:collapse">${answersHtml}</table>
  </div>

  <!-- CTA -->
  <div style="text-align:center;padding:28px;background:rgba(0,255,252,0.04);border:1px solid rgba(0,255,252,0.15);border-radius:8px;margin-bottom:36px">
    <p style="font-size:13px;color:rgba(232,240,255,0.6);margin:0 0 16px;line-height:1.7">
      Vuoi analizzare questi risultati nel contesto specifico del tuo business?<br>
      <strong style="color:#e8f0ff">Una chiamata di 20 minuti, senza impegno.</strong>
    </p>
    <a href="https://nicolaserrao.com/#contatti" style="display:inline-block;background:#00fffc;color:#0a0e13;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:13px 28px;border-radius:5px;text-decoration:none">Parliamoci</a>
  </div>

  <!-- Footer -->
  <p style="font-size:11px;color:rgba(232,240,255,0.2);text-align:center;line-height:1.7;margin:0">
    Nicola Serrao — GLITCH<br>
    <a href="https://nicolaserrao.com" style="color:rgba(232,240,255,0.2);text-decoration:underline">nicolaserrao.com</a>
  </p>
</div>
</body></html>`;
}

/* ─────────────────────────────────────────────
   DOMANDE CONSULENTE — email content
───────────────────────────────────────────── */
function buildDomandeEmail(nome: string): string {
  const groups = [
    {
      title: "Prima del contratto",
      questions: [
        "Quante settimane prevede per la fase di analisi prima di proporre una strategia?",
        "Chiederà accesso ai miei analytics esistenti prima di presentare qualsiasi piano?",
        "Come ha gestito progetti simili al mio in passato? Può mostrarmi risultati concreti?",
        "Cosa succede se i risultati non arrivano entro i tempi previsti?",
      ],
    },
    {
      title: "Metodo di lavoro",
      questions: [
        "Come viene fatta la fase di analisi dati? Quali strumenti usa?",
        "Intervisterà il team interno (commerciale, operativo) oltre a me?",
        "Quanto spesso e in quale formato riceverò aggiornamenti?",
        "Quali KPI useremo per misurare il successo — e chi li decide?",
      ],
    },
    {
      title: "Struttura e responsabilità",
      questions: [
        "Chi lavora concretamente sul mio progetto? Il consulente senior o un junior/team?",
        "Se le campagne non performano, come viene gestita la revisione della strategia?",
        "Qual è il processo decisionale per spendere o fermare il budget?",
        "Come gestisce i periodi di bassa performance o i test che non danno risultati?",
      ],
    },
    {
      title: "Segnali di allarme (red flag)",
      questions: [
        "Garantisce risultati specifici? (Attenzione: nessun consulente onesto lo fa)",
        "Propone una strategia completa entro la prima settimana? (Impossibile senza analisi)",
        "Non ha mai chiesto accesso ai dati prima di fare proposte?",
        "Parla solo di metriche di piattaforma (ROAS, CPM) e mai di KPI di business?",
      ],
    },
  ];

  const groupsHtml = groups.map(g => `
    <div style="margin-bottom:24px">
      <p style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#00fffc;margin:0 0 12px;font-weight:600">${escapeHtml(g.title)}</p>
      ${g.questions.map((q, i) => `
        <div style="display:flex;gap:12px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
          <span style="color:rgba(232,240,255,0.2);font-size:10px;font-family:monospace;flex-shrink:0;padding-top:3px">0${i + 1}</span>
          <span style="font-size:12px;color:rgba(232,240,255,0.75);line-height:1.6">${escapeHtml(q)}</span>
        </div>
      `).join("")}
    </div>
  `).join("");

  return `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0a0e13;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="max-width:600px;margin:0 auto;padding:40px 24px">

  <div style="margin-bottom:32px">
    <p style="font-size:9px;letter-spacing:4px;text-transform:uppercase;color:#00fffc;margin:0 0 8px">nicolaserrao.com</p>
    <h1 style="font-size:22px;font-weight:700;color:#e8f0ff;margin:0 0 8px;line-height:1.3">Le domande da fare al tuo consulente</h1>
    <p style="font-size:13px;color:rgba(232,240,255,0.5);margin:0">Ciao ${escapeHtml(nome)} — ecco la lista completa.</p>
  </div>

  <div style="background:rgba(0,255,252,0.04);border:1px solid rgba(0,255,252,0.15);border-radius:10px;padding:24px 28px;margin-bottom:28px">
    <p style="font-size:13px;color:rgba(232,240,255,0.65);margin:0;line-height:1.8">
      Queste domande servono a capire se il consulente che stai valutando lavora con metodo o a intuito.
      Non si tratta di mettere alla prova nessuno — si tratta di capire cosa aspettarti
      prima di firmare qualcosa.
    </p>
  </div>

  <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:24px 28px;margin-bottom:28px">
    ${groupsHtml}
  </div>

  <div style="background:rgba(255,255,255,0.03);border-left:3px solid rgba(0,255,252,0.4);padding:18px 20px;margin-bottom:36px;border-radius:0 6px 6px 0">
    <p style="font-size:12px;color:rgba(232,240,255,0.5);margin:0;line-height:1.7">
      <strong style="color:#e8f0ff">Nota:</strong> Se un consulente si innervosisce per queste domande,
      o cerca di evitare risposte concrete, è già una risposta.
    </p>
  </div>

  <div style="text-align:center;padding:28px;background:rgba(0,255,252,0.04);border:1px solid rgba(0,255,252,0.15);border-radius:8px;margin-bottom:36px">
    <p style="font-size:13px;color:rgba(232,240,255,0.6);margin:0 0 16px;line-height:1.7">
      Hai già un consulente e vuoi capire se sta lavorando bene?<br>
      <strong style="color:#e8f0ff">Possiamo farci una chiamata di 20 minuti.</strong>
    </p>
    <a href="https://nicolaserrao.com/#contatti" style="display:inline-block;background:#00fffc;color:#0a0e13;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:13px 28px;border-radius:5px;text-decoration:none">Parliamoci</a>
  </div>

  <p style="font-size:11px;color:rgba(232,240,255,0.2);text-align:center;line-height:1.7;margin:0">
    Nicola Serrao — GLITCH<br>
    <a href="https://nicolaserrao.com" style="color:rgba(232,240,255,0.2);text-decoration:underline">nicolaserrao.com</a>
  </p>
</div>
</body></html>`;
}

/* ─────────────────────────────────────────────
   HANDLER
───────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  if (!BREVO_API_KEY) {
    return NextResponse.json({ success: false, message: "Configurazione email mancante." }, { status: 500 });
  }

  const body = await request.json();
  const { nome, email, type, score, total, answers } = body as {
    nome: string;
    email: string;
    type: "audit-score" | "domande-consulente";
    score?: number;
    total?: number;
    answers?: Record<string, boolean>;
  };

  if (!nome?.trim() || !email?.trim() || !type) {
    return NextResponse.json({ success: false, message: "Dati mancanti." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, message: "Email non valida." }, { status: 400 });
  }

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
    "api-key": BREVO_API_KEY,
  };

  const tagAttr = type === "audit-score" ? "AUDIT_SCORE" : "DOMANDE_CONSULENTE";

  // 1. Add to Brevo
  try {
    await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: nome.trim(), [tagAttr]: true },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });
  } catch { /* non-blocking */ }

  // 2. Build user email
  let subject = "";
  let htmlContent = "";

  if (type === "audit-score" && score !== undefined && total !== undefined && answers) {
    const profile = getAuditProfile(score);
    subject = `Il tuo Audit Score: ${score}/${total} — ${profile.label}`;
    htmlContent = buildAuditEmail(nome.trim(), score, total, answers);
  } else if (type === "domande-consulente") {
    subject = "Le domande da fare al tuo consulente — lista completa";
    htmlContent = buildDomandeEmail(nome.trim());
  } else {
    return NextResponse.json({ success: false, message: "Tipo non valido." }, { status: 400 });
  }

  // 3. Send to user
  const userRes = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers,
    body: JSON.stringify({
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email, name: nome.trim() }],
      subject,
      htmlContent,
    }),
  });

  // 4. Notify Nicola
  const notifySubject = type === "audit-score"
    ? `Lead Magnet — Audit Score: ${nome} (${score}/${total})`
    : `Lead Magnet — Domande Consulente: ${nome}`;

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers,
    body: JSON.stringify({
      sender: { name: "Lead Magnet — nicolaserrao.com", email: SENDER_EMAIL },
      to: [{ email: NOTIFY_EMAIL, name: "Nicola Serrao" }],
      subject: notifySubject,
      htmlContent: `<div style="font-family:monospace;background:#0a0e13;color:#e8f0ff;padding:24px;border-radius:8px">
        <h3 style="color:#00fffc;margin:0 0 16px">Nuovo lead magnet richiesto</h3>
        <p><strong>Tipo:</strong> ${escapeHtml(type)}</p>
        <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color:#00fffc">${escapeHtml(email)}</a></p>
        ${type === "audit-score" ? `<p><strong>Score:</strong> ${score}/${total} — ${escapeHtml(getAuditProfile(score!).label)}</p>` : ""}
      </div>`,
    }),
  });

  if (userRes.status === 201) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, message: "Errore nell'invio email." }, { status: 500 });
}
