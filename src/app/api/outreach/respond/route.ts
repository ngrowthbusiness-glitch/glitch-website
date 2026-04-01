import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const NOTIFY_EMAIL = process.env.BREVO_NOTIFY_EMAIL || "n.growth.business@gmail.com";
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || "noreply@nicolaserrao.com";

/**
 * POST /api/outreach/respond
 * Handles the interactive CTA box response from outreach landing pages.
 * Sends notification email to Nicola with prospect's answer + adds to Brevo list.
 */
export async function POST(request: NextRequest) {
  if (!BREVO_API_KEY) {
    return NextResponse.json(
      { success: false, message: "Configurazione email mancante." },
      { status: 500 },
    );
  }

  let body: {
    risposta: string;
    email: string;
    companyName: string;
    slug: string;
    domanda: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Dati non validi." },
      { status: 400 },
    );
  }

  const { risposta, email, companyName, slug, domanda } = body;

  if (!risposta?.trim() || !email?.trim()) {
    return NextResponse.json(
      { success: false, message: "Risposta e email sono obbligatori." },
      { status: 400 },
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { success: false, message: "Email non valida." },
      { status: 400 },
    );
  }

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
    "api-key": BREVO_API_KEY,
  };

  // Add contact to Brevo (non-blocking)
  try {
    await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers,
      body: JSON.stringify({
        email: email.trim(),
        attributes: { COMPANY: companyName },
        listIds: [Number(process.env.BREVO_LIST_ID) || 6],
        updateEnabled: true,
      }),
    });
  } catch {
    // Non-blocking
  }

  // Send notification email
  const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers,
    body: JSON.stringify({
      sender: { name: "Outreach nicolaserrao.com", email: SENDER_EMAIL },
      to: [{ email: NOTIFY_EMAIL, name: "Nicola Serrao" }],
      replyTo: { email: email.trim(), name: companyName },
      subject: `Risposta outreach — ${companyName}`,
      htmlContent: `
        <div style="font-family:monospace;background:#0a0e13;color:#e8f0ff;padding:32px;border-radius:8px;max-width:600px">
          <h2 style="color:#00fffc;margin-bottom:4px">Nuova risposta outreach</h2>
          <p style="font-size:11px;color:rgba(232,240,255,0.4);margin-bottom:24px;letter-spacing:1px">
            Landing: nicolaserrao.com/outreach/${escapeHtml(slug)}
          </p>
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:10px 0;color:rgba(232,240,255,0.4);font-size:11px;letter-spacing:1px;text-transform:uppercase;width:110px;border-bottom:1px solid rgba(255,255,255,0.05)">Azienda</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)"><strong>${escapeHtml(companyName)}</strong></td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:rgba(232,240,255,0.4);font-size:11px;letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.05)">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
                <a href="mailto:${escapeHtml(email.trim())}" style="color:#00fffc;text-decoration:none">${escapeHtml(email.trim())}</a>
              </td>
            </tr>
          </table>
          <div style="margin-top:24px;padding:20px;background:rgba(0,255,252,0.06);border-left:3px solid #00fffc;border-radius:0 6px 6px 0">
            <p style="color:rgba(232,240,255,0.4);font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px">Domanda</p>
            <p style="margin-bottom:16px;font-style:italic;color:rgba(232,240,255,0.6)">${escapeHtml(domanda)}</p>
            <p style="color:rgba(232,240,255,0.4);font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px">Risposta</p>
            <p style="line-height:1.7">${escapeHtml(risposta.trim()).replace(/\n/g, "<br>")}</p>
          </div>
          <p style="margin-top:24px;font-size:11px;color:rgba(232,240,255,0.3)">
            Rispondi direttamente a questa email per contattare il prospect.
          </p>
        </div>
      `,
    }),
  });

  if (emailRes.status === 201) {
    return NextResponse.json({
      success: true,
      message: "Risposta inviata con successo.",
    });
  }

  return NextResponse.json(
    { success: false, message: "Errore nell'invio. Riprova." },
    { status: 500 },
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
