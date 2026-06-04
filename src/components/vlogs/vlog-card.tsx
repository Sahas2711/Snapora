import Link from "next/link";

import type { PublicVlog } from "@/types/vlog.types";

type VlogCardProps = {
  vlog: PublicVlog;
};

export function VlogCard({ vlog }: VlogCardProps) {
  return (
    <Link
      href={`/vlogs/${vlog.id}`}
      className="block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={vlog.imageUrl}
        alt={vlog.title}
        className="h-52 w-full object-cover"
      />
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {vlog.title}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          By {vlog.user.name}
          {vlog.user.username ? ` · @${vlog.user.username}` : ""}
        </p>
        {vlog.description ? (
          <p className="mt-3 text-sm text-gray-600 line-clamp-3">
            {vlog.description}
          </p>
        ) : null}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>{vlog.viewCount} views</span>
          <span>{vlog.likeCount} likes</span>
        </div>
      </div>
    </Link>
  );
}
