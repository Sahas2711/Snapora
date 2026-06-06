import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ProfileForm } from "@/components/auth/profile-form";
import { VlogCard } from "@/components/vlogs/vlog-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";
import { StatsCard } from "@/components/ui/stats-card";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.service";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const profile = await authService.getProfile(session.user.id);
  const initials = profile.user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const totalViews = profile.user.vlogs.reduce((sum, v) => sum + v.viewCount, 0);
  const totalLikes = profile.user.vlogs.reduce((sum, v) => sum + v.likeCount, 0);

  return (
    <div className="flex flex-col">
      {/* Banner */}
      <div className="h-40 sm:h-56 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20" />

      {/* Profile header */}
      <Container className="-mt-14 sm:-mt-20 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-8">
          {/* Avatar */}
          <div className="shrink-0">
            {profile.user.image ? (
              <img
                src={profile.user.image}
                alt={profile.user.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-background shadow-xl"
              />
            ) : (
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-primary to-purple-600 text-primary-foreground flex items-center justify-center font-bold text-3xl sm:text-4xl border-4 border-background shadow-xl">
                {initials}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 pb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{profile.user.name}</h1>
            {profile.user.username && (
              <p className="text-muted-foreground text-sm mt-0.5">@{profile.user.username}</p>
            )}
            <p className="text-muted-foreground/60 text-xs mt-0.5">{profile.user.email}</p>
          </div>

          {/* Quick stats */}
          <div className="flex gap-6 sm:gap-8 shrink-0 pb-2">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-foreground">{profile.user.vlogs.length}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Stories</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-foreground">{totalViews.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Views</p>
            </div>
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-primary">{totalLikes.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Likes</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Content grid */}
      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground mb-5">Edit profile</h2>
              <ProfileForm
                defaultValues={{
                  name: profile.user.name,
                  username: profile.user.username,
                  image: profile.user.image,
                }}
              />
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <Link href="/create-vlog">
                <Button className="w-full gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Write a new story
                </Button>
              </Link>
            </div>
          </aside>

          {/* Main — stories */}
          <main>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                Your stories
                {profile.user.vlogs.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({profile.user.vlogs.length})
                  </span>
                )}
              </h2>
            </div>

            {profile.user.vlogs.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-card">
                <EmptyState
                  icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                    </svg>
                  }
                  title="Nothing published yet"
                  description="Your stories will appear here once you publish."
                  action={{ label: "Write your first story", href: "/create-vlog" }}
                  size="sm"
                />
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                {profile.user.vlogs.map((vlog) => (
                  <div key={vlog.id} className="group relative">
                    <VlogCard
                      vlog={{
                        ...vlog,
                        user: {
                          id: profile.user.id,
                          name: profile.user.name,
                          image: profile.user.image ?? null,
                          username: profile.user.username ?? null,
                        },
                      }}
                    />
                    <Link
                      href={`/vlogs/${vlog.id}/edit`}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 backdrop-blur-sm text-xs font-semibold text-foreground px-2.5 py-1 rounded-lg border border-border shadow-sm hover:border-primary/30"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
}
