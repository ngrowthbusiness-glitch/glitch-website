import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { OutreachConfig } from "@/data/outreach/types";
import { getAllOutreachConfigs } from "@/data/outreach/loader";

const CONFIGS_DIR = path.join(process.cwd(), "src/data/outreach/configs");

/**
 * GET /api/outreach — List all outreach configs
 * Future: used by Notion integration / admin dashboard
 */
export async function GET() {
  const configs = getAllOutreachConfigs();
  return NextResponse.json({
    total: configs.length,
    items: configs.map((c) => ({
      slug: c.slug,
      companyName: c.companyName,
      sector: c.sector,
      status: c.meta?.status || "draft",
      url: `/outreach/${c.slug}`,
    })),
  });
}

/**
 * POST /api/outreach — Create a new outreach landing
 * Body: OutreachConfig JSON
 *
 * Future: will also create/update Notion page in pipeline DB
 */
export async function POST(request: NextRequest) {
  // Basic auth check — in production, use proper auth
  const authHeader = request.headers.get("authorization");
  const expectedToken = process.env.OUTREACH_API_TOKEN;
  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let config: OutreachConfig;
  try {
    config = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!config.slug || !config.companyName) {
    return NextResponse.json(
      { error: "slug and companyName are required" },
      { status: 400 }
    );
  }

  // Sanitize slug
  const slug = config.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-");

  config.slug = slug;
  config.meta = {
    ...config.meta,
    createdAt: config.meta?.createdAt || new Date().toISOString(),
    status: config.meta?.status || "draft",
  };

  const filePath = path.join(CONFIGS_DIR, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2), "utf-8");

  // TODO: Create Notion page in outreach pipeline DB
  // if (process.env.NOTION_API_KEY && process.env.NOTION_OUTREACH_DB_ID) {
  //   await createNotionOutreachPage(config);
  // }

  return NextResponse.json({
    success: true,
    slug,
    url: `/outreach/${slug}`,
    message: `Landing created. Rebuild needed for static generation.`,
  });
}
