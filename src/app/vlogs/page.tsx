import { VlogCard } from "@/components/vlogs/vlog-card";
import { vlogService } from "@/services/vlog.service";

export default async function VlogsPage() {
  const vlogs = await vlogService.getAllVlogs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Discover
        </p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900">
          Browse recent vlogs
        </h1>
        <p className="mt-3 text-gray-600">
          Explore creator stories, cover highlights, and recent uploads.
        </p>
      </div>

      {vlogs.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <h2 className="text-lg font-semibold text-gray-900">No vlogs yet</h2>
          <p className="mt-2 text-sm text-gray-500">
            Published vlogs will appear here once creators start posting.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {vlogs.map((vlog) => (
            <VlogCard key={vlog.id} vlog={vlog} />
          ))}
        </div>
      )}
    </div>
  );
}
