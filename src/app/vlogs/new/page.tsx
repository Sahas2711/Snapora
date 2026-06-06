import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { CreateVlogForm } from "@/components/vlogs/create-vlog-form";
import { Container } from "@/components/ui/container";

export default async function NewVlogPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col">
      {/* Minimal header */}
      <div className="border-b border-border bg-card">
        <Container size="sm" className="py-6 sm:py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-1">
            New story
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Create your story
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Write something worth sharing. Add a title, cover image, and description.
          </p>
        </Container>
      </div>

      {/* Editor area */}
      <Container size="sm" className="py-8 sm:py-12">
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="p-6 sm:p-8">
            <CreateVlogForm />
          </div>
        </div>

        {/* Writing tips */}
        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          {[
            { icon: "✦", tip: "Clear titles get more clicks. Keep it under 60 chars." },
            { icon: "⬆", tip: "Upload your cover image first — it anchors the story." },
            { icon: "✎", tip: "Descriptions show in cards. Two sentences is plenty." },
          ].map((t) => (
            <div key={t.tip} className="flex gap-2.5 rounded-xl border border-border bg-card p-4">
              <span className="text-primary text-sm mt-px shrink-0">{t.icon}</span>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.tip}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
