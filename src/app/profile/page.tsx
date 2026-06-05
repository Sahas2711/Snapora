import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { ProfileForm } from "@/components/auth/profile-form";
import { VlogCard } from "@/components/vlogs/vlog-card";
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
    <div className="min-h-screen bg-gray-50">
      {/* Profile hero banner */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              {profile.user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.user.image}
                  alt={profile.user.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-sm"
                />
              ) : (
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-violet-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-sm">
                  {initials}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900">{profile.user.name}</h1>
              {profile.user.username ? (
                <p className="text-sm text-gray-500 mt-0.5">@{profile.user.username}</p>
              ) : null}
              <p className="text-sm text-gray-400 mt-0.5">{profile.user.email}</p>
            </div>

            {/* Stats */}
            <div className="flex gap-6 shrink-0">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">{profile.user.vlogs.length}</p>
                <p className="text-xs text-gray-500 mt-0.5">Stories</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-0.5">Views</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-pink-500">{totalLikes.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-0.5">Likes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">

          {/* Sidebar — edit profile */}
          <aside className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-5">Edit profile</h2>
              <ProfileForm
                defaultValues={{
                  name: profile.user.name,
                  username: profile.user.username,
                  image: profile.user.image,
                }}
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <Link
                href="/create-vlog"
                className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Write a new story
              </Link>
            </div>
          </aside>

          {/* Main — vlogs */}
          <main>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Your stories
                {profile.user.vlogs.length > 0 ? (
                  <span className="ml-2 text-sm font-normal text-gray-400">({profile.user.vlogs.length})</span>
                ) : null}
              </h2>
            </div>

            {profile.user.vlogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-gray-200 py-20 text-center">
                <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-700">Nothing published yet</p>
                <p className="mt-1.5 text-sm text-gray-400">Your stories will appear here once you publish.</p>
                <Link
                  href="/create-vlog"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl transition-colors"
                >
                  Write your first story
                </Link>
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
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200 hover:border-gray-300 shadow-sm"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
