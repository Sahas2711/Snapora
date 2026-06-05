import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { CreateVlogForm } from "@/components/vlogs/create-vlog-form";

export default async function NewVlogPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">New story</p>
          <h1 className="text-3xl font-bold text-gray-900">Publish a story</h1>
          <p className="mt-2 text-gray-500 text-sm">
            Add a title, cover image, and description. Your story will be live instantly.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <CreateVlogForm />
        </div>

        {/* Tips */}
        <div className="mt-5 grid sm:grid-cols-3 gap-3">
          {[
            { icon: "✦", tip: "Clear titles get more clicks. Keep it under 60 chars." },
            { icon: "⬆", tip: "Upload your cover image first — it anchors the story." },
            { icon: "✎", tip: "Descriptions show in cards. Two sentences is plenty." },
          ].map((t) => (
            <div key={t.tip} className="flex gap-2.5 bg-white rounded-xl border border-gray-100 p-4">
              <span className="text-blue-500 text-sm mt-px shrink-0">{t.icon}</span>
              <p className="text-xs text-gray-500 leading-relaxed">{t.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
