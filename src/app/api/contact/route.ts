import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID) || 6;
const NOTIFY_EMAIL = process.env.BREVO_NOTIFY_EMAIL || "n.growth.business@gmail.com";
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || "noreply@nicolaserrao.com";

export async function POST(request: NextRequest) {
  if (!BREVO_API_KEY) {
    return NextResponse.json(
      { success: false, message: "Configurazione email mancante." },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const nome = (formData.get("nome") as string)?.trim() || "";
  const azienda = (formData.get("azienda") as string)?.trim() || "";
  const email = (formData.get("email") as string)?.trim() || "";
  const telefono = (formData.get("telefono") as string)?.trim() || "";
  const messaggio = (formData.get("messaggio") as string)?.trim() || "";

  if (!nome || !email || !messaggio) {
    return NextResponse.json(
      { success: false, message: "Compila tutti i campi obbligatori." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { success: false, message: "Email non valida." },
      { status: 400 }
    );
  }

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
    "api-key": BREVO_API_KEY,
  };

  // 1. Add contact to Brevo list
  try {
    await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: nome, COMPANY: azienda },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });
  } catch {
    // Non-blocking: contact creation failure shouldn't stop notification
  }

  // 2. Send notification email
  const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers,
    body: JSON.stringify({
      sender: { name: "Sito nicolaserrao.com", email: SENDER_EMAIL },
      to: [{ email: NOTIFY_EMAIL, name: "Nicola Serrao" }],
      replyTo: { email, name: nome },
      subject: `Nuova richiesta — ${nome}`,
      htmlContent: `
        <div style="font-family:monospace;background:#0a0e13;color:#e8f0ff;padding:32px;border-radius:8px;max-width:600px">
          <h2 style="color:#00fffc;margin-bottom:8px">Nuova richiesta dal sito</h2>
          <p style="font-size:11px;color:rgba(232,240,255,0.4);margin-bottom:24px;letter-spacing:1px">nicolaserrao.com</p>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;color:rgba(232,240,255,0.4);font-size:11px;letter-spacing:1px;text-transform:uppercase;width:110px;border-bottom:1px solid rgba(255,255,255,0.05)">Nome</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)"><strong>${escapeHtml(nome)}</strong></td></tr>
            <tr><td style="padding:10px 0;color:rgba(232,240,255,0.4);font-size:11px;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.05)">Azienda</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)">${azienda ? escapeHtml(azienda) : '<span style="color:rgba(232,240,255,0.3)">non indicata</span>'}</td></tr>
            <tr><td style="padding:10px 0;color:rgba(232,240,255,0.4);font-size:11px;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.05)">Email</td><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)"><a href="mailto:${escapeHtml(email)}" style="color:#00fffc;text-decoration:none">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:10px 0;color:rgba(232,240,255,0.4);font-size:11px;letter-spacing:1px;text-transform:uppercase">Telefono</td><td style="padding:10px 0">${telefono ? escapeHtml(telefono) : '<span style="color:rgba(232,240,255,0.3)">non indicato</span>'}</td></tr>
          </table>
          <div style="margin-top:24px;padding:20px;background:rgba(0,255,252,0.06);border-left:3px solid #00fffc;border-radius:0 6px 6px 0">
            <p style="color:rgba(232,240,255,0.4);font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px">Messaggio</p>
            <p style="line-height:1.7">${escapeHtml(messaggio).replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `,
    }),
  });

  if (emailRes.status === 201) {
    return NextResponse.json({
      success: true,
      message: "Messaggio inviato con successo.",
    });
  }

  return NextResponse.json(
    { success: false, message: "Errore nell'invio. Riprova o scrivimi direttamente." },
    { status: 500 }
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
