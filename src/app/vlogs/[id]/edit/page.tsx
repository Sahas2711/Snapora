import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { EditVlogForm } from "@/components/vlogs/edit-vlog-form";
import { AuthorizationError } from "@/lib/errors/auth.error";
import { vlogService } from "@/services/vlog.service";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditVlogPage({ params }: PageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;
  const vlog = await vlogService.getVlogById(id);

  if (vlog.user.id !== session.user.id) {
    throw new AuthorizationError("You are not authorized to edit this vlog");
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600">
            Update Vlog
          </p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            Refine your story and cover image
          </h1>
          <p className="mt-3 text-gray-600">
            Only the owner can edit this vlog. Update the title, description, or cover image.
          </p>

          <div className="mt-8">
            <EditVlogForm
              vlogId={vlog.id}
              defaultValues={{
                title: vlog.title,
                description: vlog.description,
                imageUrl: vlog.imageUrl,
              }}
            />
          </div>
        </section>

        <aside className="bg-linear-to-br from-sky-50 to-white rounded-2xl border border-blue-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Editing notes</h2>
          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            <li>Keep the title concise so it still fits nicely in cards.</li>
            <li>Leave the current cover as-is unless you want to replace it.</li>
            <li>Changes are saved directly to the existing vlog entry.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
