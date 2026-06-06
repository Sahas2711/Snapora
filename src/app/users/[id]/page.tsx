import { notFound } from "next/navigation";
import { VlogCard } from "@/components/vlogs/vlog-card";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { NotFoundError } from "@/lib/errors/auth.error";
import { authService } from "@/services/auth.service";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PublicProfilePage({ params }: PageProps) {
  const { id } = await params;
  let profile;

  try {
    profile = await authService.getUserPublicProfile(id);
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    }
    throw error;
  }

  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const totalViews = profile.vlogs.reduce((sum, v) => sum + v.viewCount, 0);
  const totalLikes = profile.vlogs.reduce((sum, v) => sum + v.likeCount, 0);

  return (
    <div className="flex flex-col">
      {/* Banner */}
      <div className="h-32 sm:h-48 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20" />

      {/* Header */}
      <Container className="-mt-12 sm:-mt-16 relative z-10">
        <div className="flex items-end gap-5 sm:gap-6 pb-6">
          <div className="shrink-0">
            {profile.image ? (
              <img
                src={profile.image}
                alt={profile.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-background shadow-xl"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-primary to-purple-600 text-primary-foreground flex items-center justify-center font-bold text-2xl sm:text-3xl border-4 border-background shadow-xl">
                {initials}
              </div>
            )}
          </div>
          <div className="pb-1">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">{profile.name}</h1>
            {profile.username && (
              <p className="text-sm text-muted-foreground">@{profile.username}</p>
            )}
            <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
              <span>{profile.vlogs.length} {profile.vlogs.length === 1 ? "story" : "stories"}</span>
              <span>{totalViews.toLocaleString()} views</span>
              <span className="text-primary">{totalLikes.toLocaleString()} likes</span>
            </div>
          </div>
        </div>
      </Container>

      {/* Stories */}
      <Container className="pb-12">
        {profile.vlogs.length === 0 ? (
          <EmptyState
            title="No vlogs yet"
            description={`${profile.name} hasn't published any vlogs yet.`}
            size="sm"
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {profile.vlogs.map((vlog) => (
              <VlogCard key={vlog.id} vlog={vlog} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
