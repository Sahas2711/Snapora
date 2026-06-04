import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { VlogViewCounter } from "@/components/vlogs/vlog-view-counter";
import { NotFoundError } from "@/lib/errors/auth.error";
import { vlogService } from "@/services/vlog.service";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function VlogDetailPage({ params }: PageProps) {
  const session = await auth();
  const { id } = await params;
  let vlog;

  try {
    vlog = await vlogService.getVlogById(id);
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    }

    throw error;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={vlog.imageUrl}
          alt={vlog.title}
          className="h-[320px] w-full object-cover sm:h-[420px]"
        />

        <div className="p-6 sm:p-8">
          <p className="text-sm text-blue-600 font-semibold uppercase tracking-[0.18em]">
            Vlog Detail
          </p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            {vlog.title}
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            By {vlog.user.name}
            {vlog.user.username ? ` · @${vlog.user.username}` : ""}
          </p>

          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            <VlogViewCounter
              vlogId={vlog.id}
              initialViewCount={vlog.viewCount}
            />
            <span>{vlog.likeCount} likes</span>
            <span>{new Date(vlog.createdAt).toLocaleDateString()}</span>
          </div>

          {session?.user?.id === vlog.user.id ? (
            <div className="mt-6">
              <Link href={`/vlogs/${vlog.id}/edit`}>
                <Button variant="secondary">Edit vlog</Button>
              </Link>
            </div>
          ) : null}

          <div className="mt-8 rounded-2xl bg-gray-50 p-5 text-gray-700 leading-7">
            {vlog.description || "No description provided for this vlog yet."}
          </div>
        </div>
      </article>
    </div>
  );
}
