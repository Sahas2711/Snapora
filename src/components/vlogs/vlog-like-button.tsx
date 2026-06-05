"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type VlogLikeButtonProps = {
  vlogId: string;
  initialLikeCount: number;
  initialLiked: boolean;
  isAuthenticated: boolean;
};

export function VlogLikeButton({
  vlogId,
  initialLikeCount,
  initialLiked,
  isAuthenticated,
}: VlogLikeButtonProps) {
  const router = useRouter();
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    if (!isAuthenticated) {
      router.push(`/login?callbackUrl=${encodeURIComponent(`/vlogs/${vlogId}`)}`);
      return;
    }

    setError(undefined);

    startTransition(async () => {
      const response = await fetch(`/api/vlogs/${vlogId}/like`, {
        method: liked ? "DELETE" : "POST",
        credentials: "include",
      });

      const payload = (await response.json()) as {
        data?: { liked?: boolean; likeCount?: number };
        message?: string;
      };

      if (!response.ok || !payload.data) {
        setError(payload.message ?? "Unable to update like");
        return;
      }

      setLiked(payload.data.liked ?? liked);
      setLikeCount(payload.data.likeCount ?? likeCount);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant={liked ? "danger" : "secondary"}
        onClick={handleToggle}
        disabled={isPending}
      >
        {isPending ? "Updating..." : liked ? `Unlike (${likeCount})` : `Like (${likeCount})`}
      </Button>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
