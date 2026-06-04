"use client";

import { useEffect, useState } from "react";

type VlogViewCounterProps = {
  vlogId: string;
  initialViewCount: number;
};

export function VlogViewCounter({
  vlogId,
  initialViewCount,
}: VlogViewCounterProps) {
  const [viewCount, setViewCount] = useState(initialViewCount);

  useEffect(() => {
    let isActive = true;

    fetch(`/api/vlogs/${vlogId}/view`, {
      method: "POST",
      cache: "no-store",
    })
      .then(async (response) => {
        const payload = (await response.json()) as {
          data?: { viewCount?: number };
        };

        if (!response.ok || !payload.data?.viewCount || !isActive) {
          return;
        }

        setViewCount(payload.data.viewCount);
      })
      .catch(() => {
        // Keep the server-rendered count if the increment call fails.
      });

    return () => {
      isActive = false;
    };
  }, [vlogId]);

  return <span>{viewCount} views</span>;
}
