import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { CreateVlogForm } from "@/components/vlogs/create-vlog-form";

export default async function NewVlogPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600">
            Create Vlog
          </p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            Publish a new story with a strong cover image
          </h1>
          <p className="mt-3 text-gray-600">
            Add a title, short description, and Cloudinary-hosted cover image.
          </p>

          <div className="mt-8">
            <CreateVlogForm />
          </div>
        </section>

        <aside className="bg-linear-to-br from-sky-50 to-white rounded-2xl border border-blue-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Publishing notes</h2>
          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            <li>Use a descriptive title so your vlog is easy to scan in lists.</li>
            <li>Upload the cover image first. The form stores the Cloudinary URL only.</li>
            <li>Keep descriptions short and readable for the card layout.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
