"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

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
      <button
        type="button"
        onClick={handleToggle}
        disabled={isPending}
        aria-label={liked ? "Unlike this vlog" : "Like this vlog"}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
          liked
            ? "bg-pink-50 text-pink-600 border border-pink-200 hover:bg-pink-100 focus:ring-pink-400"
            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 focus:ring-gray-300"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform duration-150 ${isPending ? "scale-90" : liked ? "scale-110" : "scale-100"}`}
          viewBox="0 0 20 20"
          fill={liked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={liked ? 0 : 1.5}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
        {isPending
          ? "···"
          : liked
            ? `Liked · ${likeCount.toLocaleString()}`
            : `Like · ${likeCount.toLocaleString()}`}
      </button>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
