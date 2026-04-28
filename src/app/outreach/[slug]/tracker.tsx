"use client";

import { useEffect } from "react";

export function Tracker({ slug }: { slug: string }) {
  useEffect(() => {
    const startedAt = Date.now();

    // Track view (fire-and-forget)
    fetch("/api/outreach/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        event: "view",
        timestamp: startedAt,
        referrer: document.referrer || null,
      }),
      keepalive: true,
    }).catch(() => {});

    const handleUnload = () => {
      const duration = Date.now() - startedAt;
      const payload = JSON.stringify({
        slug,
        event: "unload",
        duration,
        timestamp: Date.now(),
      });
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon("/api/outreach/track", blob);
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [slug]);

  return null;
}
