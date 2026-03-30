"use client";

import { useEffect } from "react";

/**
 * Tracks outreach page visit in sessionStorage.
 * When the user navigates to the main site, the navbar can show
 * a "return to your strategy" bubble.
 *
 * Future: this can also ping an API to update Notion status.
 */
export default function OutreachTracker({ slug }: { slug: string }) {
  useEffect(() => {
    sessionStorage.setItem(`ns_outreach_${slug}`, "1");
    sessionStorage.setItem("ns_outreach_url", `/outreach/${slug}`);
    sessionStorage.setItem("ns_outreach_active", slug);
  }, [slug]);

  return null;
}
