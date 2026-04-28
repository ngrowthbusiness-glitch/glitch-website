import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Endpoint POST per loggare le visite alle pagine outreach.
 * Per ora logga su console del server (visibile in Vercel logs).
 * Estensione futura: integrazione Notion / database.
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const log = {
      ...data,
      ua: request.headers.get("user-agent") ?? null,
      ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
      country: request.headers.get("x-vercel-ip-country") ?? null,
      city: request.headers.get("x-vercel-ip-city") ?? null,
      receivedAt: new Date().toISOString(),
    };

    console.log("[outreach-track]", JSON.stringify(log));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
