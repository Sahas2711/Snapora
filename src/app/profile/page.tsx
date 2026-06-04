import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { ProfileForm } from "@/components/auth/profile-form";
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Your vlogs ({profile.user.vlogs.length})
            </h2>
            {profile.user.vlogs.length === 0 ? (
              <p className="text-sm text-gray-500">
                You haven&apos;t published any vlogs yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {profile.user.vlogs.map((vlog) => (
                  <li
                    key={vlog.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <Link
                      href={`/vlogs/${vlog.id}`}
                      className="font-medium text-gray-900 hover:text-blue-600"
                    >
                      {vlog.title}
                    </Link>
                    <div className="mt-2">
                      <Link
                        href={`/vlogs/${vlog.id}/edit`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {vlog.viewCount} views · {vlog.likeCount} likes
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
