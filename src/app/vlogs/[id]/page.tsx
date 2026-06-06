import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
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

  const readingTime = vlog.description
    ? Math.max(1, Math.ceil(vlog.description.split(" ").length / 200))
    : 1;

  return (
    <Container size="full" className="max-w-4xl mx-auto py-8 sm:py-12">
      <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Media */}
        {vlog.videoUrl ? (
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
          <img
            src={vlog.imageUrl}
            alt={vlog.title}
            className="h-[280px] w-full object-cover sm:h-[400px]"
          />
        )}

        <div className="p-6 sm:p-10">
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              Story
            </span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-xs text-muted-foreground">
              {new Date(vlog.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-xs text-muted-foreground">{readingTime} min read</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground leading-tight tracking-tight">
            {vlog.title}
          </h1>

          {/* Author bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 py-5 border-y border-border">
            <div className="flex items-center gap-3">
              <Link href={`/users/${vlog.user.id}`}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 text-primary-foreground flex items-center justify-center text-sm font-semibold shrink-0 hover:shadow-md transition-shadow">
                  {authorInitials}
                </div>
              </Link>
              <div>
                <Link
                  href={`/users/${vlog.user.id}`}
                  className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {vlog.user.name}
                </Link>
                {vlog.user.username && (
                  <p className="text-xs text-muted-foreground">@{vlog.user.username}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <VlogViewCounter vlogId={vlog.id} initialViewCount={vlog.viewCount} />
              </span>
              <span className="flex items-center gap-1.5 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                {vlog.likeCount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 text-foreground/80 leading-8 text-base sm:text-lg">
            {vlog.description ? (
              <p className="leading-relaxed">{vlog.description}</p>
            ) : (
              <p className="text-muted-foreground italic">No description provided for this vlog.</p>
            )}
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <VlogLikeButton
              vlogId={vlog.id}
              initialLikeCount={vlog.likeCount}
              initialLiked={likedByCurrentUser}
              isAuthenticated={Boolean(session?.user?.id)}
            />
            {session?.user?.id === vlog.user.id && (
              <Link href={`/vlogs/${vlog.id}/edit`}>
                <Button variant="secondary" className="rounded-full">
                  Edit story
                </Button>
              </Link>
            )}
          </div>
        </div>
      </article>
    </Container>
  );
}
