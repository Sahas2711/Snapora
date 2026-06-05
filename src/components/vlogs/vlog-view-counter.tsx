"use client";

import { useEffect, useState } from "react";

type VlogViewCounterProps = {
  vlogId: string;
  initialViewCount: number;
};

const STORAGE_KEY = "snapora_viewed_vlogs";
const VIEW_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function hasViewedRecently(vlogId: string): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const map = JSON.parse(raw) as Record<string, number>;
    const ts = map[vlogId];
    return Boolean(ts && Date.now() - ts < VIEW_TTL_MS);
  } catch {
    return false;
  }
}

function markViewed(vlogId: string) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const map: Record<string, number> = raw ? (JSON.parse(raw) as Record<string, number>) : {};
    map[vlogId] = Date.now();
    // Prune entries older than TTL to avoid unbounded growth
    for (const [id, ts] of Object.entries(map)) {
      if (Date.now() - ts >= VIEW_TTL_MS) delete map[id];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // localStorage unavailable — degrade gracefully
  }
}

export function VlogViewCounter({ vlogId, initialViewCount }: VlogViewCounterProps) {
  const [viewCount, setViewCount] = useState(initialViewCount);

  useEffect(() => {
    if (hasViewedRecently(vlogId)) return; // already counted within 24 h

    let isActive = true;

    fetch(`/api/vlogs/${vlogId}/view`, {
      method: "POST",
      cache: "no-store",
    })
      .then(async (res) => {
        const payload = (await res.json()) as { data?: { viewCount?: number } };
        if (!res.ok || !payload.data?.viewCount || !isActive) return;
        setViewCount(payload.data.viewCount);
        markViewed(vlogId);
      })
      .catch(() => {
        // Keep server-rendered count on failure
      });

    return () => {
      isActive = false;
    };
  }, [vlogId]);

  return <span>{viewCount.toLocaleString()} views</span>;
}
