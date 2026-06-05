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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="bg-white rounded-xl shadow-md p-6 text-center">
          {profile.user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.user.image}
              alt={profile.user.name}
              className="w-24 h-24 rounded-full mx-auto object-cover"
            />
          ) : (
            <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-2xl mx-auto">
              {initials}
            </div>
          )}
          <h1 className="text-xl font-semibold text-gray-900 mt-4">
            {profile.user.name}
          </h1>
          <p className="text-sm text-gray-500">{profile.user.email}</p>
          {profile.user.username ? (
            <p className="text-sm text-gray-400 mt-1">@{profile.user.username}</p>
          ) : null}
        </aside>

        <section className="space-y-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Edit profile
            </h2>
            <ProfileForm
              defaultValues={{
                name: profile.user.name,
                username: profile.user.username,
                image: profile.user.image,
              }}
            />
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Your vlogs ({profile.user.vlogs.length})
            </h2>
            {profile.user.vlogs.length === 0 ? (
              <p className="text-sm text-gray-500">
                You haven&apos;t published any vlogs yet.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {profile.user.vlogs.map((vlog) => (
                  <div key={vlog.id} className="relative group">
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
                      className="mt-2 inline-block text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
