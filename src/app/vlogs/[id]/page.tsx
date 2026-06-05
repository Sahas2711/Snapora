import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { VlogLikeButton } from "@/components/vlogs/vlog-like-button";
import { VlogViewCounter } from "@/components/vlogs/vlog-view-counter";
import { NotFoundError } from "@/lib/errors/auth.error";
import { vlogService } from "@/services/vlog.service";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function VlogDetailPage({ params }: PageProps) {
  const session = await auth();
  const { id } = await params;
  let vlog;

  try {
    vlog = await vlogService.getVlogById(id);
  } catch (error) {
    if (error instanceof NotFoundError) notFound();
    throw error;
  }

  const likedByCurrentUser = session?.user?.id
    ? await vlogService.hasUserLikedVlog(vlog.id, session.user.id)
    : false;

  const authorInitials = vlog.user.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        {/* Media — video autoplay if present, else cover image */}
        {vlog.videoUrl ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            src={vlog.videoUrl}
            poster={vlog.imageUrl}
            className="w-full h-[280px] sm:h-[420px] object-cover bg-black"
            autoPlay
            controls
            playsInline
            loop={false}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={vlog.imageUrl}
            alt={vlog.title}
            className="h-[280px] w-full object-cover sm:h-[400px]"
          />
        )}

        <div className="p-6 sm:p-8">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
            {vlog.title}
          </h1>

          {/* Author + meta */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold shrink-0">
                {authorInitials}
              </div>
              <div className="text-sm">
                <Link
                  href={`/users/${vlog.user.id}`}
                  className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {vlog.user.name}
                </Link>
                {vlog.user.username ? (
                  <span className="text-gray-400 ml-1">@{vlog.user.username}</span>
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <VlogViewCounter vlogId={vlog.id} initialViewCount={vlog.viewCount} />
              </span>
              <span className="flex items-center gap-1 text-pink-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                {vlog.likeCount.toLocaleString()}
              </span>
              <span className="text-gray-400">
                {new Date(vlog.createdAt).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-7 text-gray-700 leading-7 text-[0.9375rem]">
            {vlog.description ? (
              <p>{vlog.description}</p>
            ) : (
              <p className="text-gray-400 italic">No description provided for this vlog.</p>
            )}
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <VlogLikeButton
              vlogId={vlog.id}
              initialLikeCount={vlog.likeCount}
              initialLiked={likedByCurrentUser}
              isAuthenticated={Boolean(session?.user?.id)}
            />
            {session?.user?.id === vlog.user.id ? (
              <Link href={`/vlogs/${vlog.id}/edit`}>
                <Button variant="secondary" className="text-sm py-2 px-4 rounded-full">
                  Edit vlog
                </Button>
              </Link>
            ) : null}
          </div>
        </div>
      </article>
    </div>
  );
}
