import { notFound } from "next/navigation";

import { VlogCard } from "@/components/vlogs/vlog-card";
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile header */}
      <div className="flex items-center gap-5 mb-10">
        {profile.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.image}
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-2xl shrink-0">
            {initials}
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
          {profile.username ? (
            <p className="text-sm text-gray-500 mt-0.5">@{profile.username}</p>
          ) : null}
          <p className="text-sm text-gray-500 mt-1">
            {profile.vlogs.length}{" "}
            {profile.vlogs.length === 1 ? "vlog" : "vlogs"} published
          </p>
        </div>
      </div>

      {/* Vlogs grid */}
      {profile.vlogs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <h2 className="text-lg font-semibold text-gray-900">No vlogs yet</h2>
          <p className="mt-2 text-sm text-gray-500">
            {profile.name} hasn&apos;t published any vlogs yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {profile.vlogs.map((vlog) => (
            <VlogCard key={vlog.id} vlog={vlog} />
          ))}
        </div>
      )}
    </div>
  );
}
