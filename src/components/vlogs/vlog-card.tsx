import Link from "next/link";

import type { PublicVlog } from "@/types/vlog.types";

type VlogCardProps = {
  vlog: PublicVlog;
};

export function VlogCard({ vlog }: VlogCardProps) {
  return (
    <Link
      href={`/vlogs/${vlog.id}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-gray-300"
    >
      {/* Cover image */}
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={vlog.imageUrl}
          alt={vlog.title}
          className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-base font-semibold text-gray-900 line-clamp-1 leading-snug">
          {vlog.title}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {vlog.user.name}
          {vlog.user.username ? (
            <span className="text-gray-400"> · @{vlog.user.username}</span>
          ) : null}
        </p>

        {vlog.description ? (
          <p className="mt-2.5 text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {vlog.description}
          </p>
        ) : null}

        {/* Stats row */}
        <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            {/* Eye icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            {vlog.viewCount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1 text-pink-500">
            {/* Heart icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            {vlog.likeCount.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
