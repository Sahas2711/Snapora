import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { EditVlogForm } from "@/components/vlogs/edit-vlog-form";
import { Container } from "@/components/ui/container";
import { AuthorizationError } from "@/lib/errors/auth.error";
import { vlogService } from "@/services/vlog.service";

type PageProps = {
  params: Promise<{ id: string }>;
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
    <div className="flex flex-col">
      <div className="border-b border-border bg-card">
        <Container size="sm" className="py-6 sm:py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-1">
            Edit story
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Refine your story
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Update the title, description, or cover image of your story.
          </p>
        </Container>
      </div>

      <Container size="sm" className="py-8 sm:py-12">
        <div className="rounded-xl border border-border bg-card shadow-sm p-6 sm:p-8">
          <EditVlogForm
            vlogId={vlog.id}
            defaultValues={{
              title: vlog.title,
              description: vlog.description,
              imageUrl: vlog.imageUrl,
            }}
          />
        </div>

        {/* Sidebar note inline */}
        <div className="mt-6 rounded-xl bg-primary/5 border border-primary/10 p-5">
          <h3 className="text-sm font-semibold text-foreground mb-2">Editing notes</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">·</span>
              Keep the title concise so it still fits nicely in cards.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">·</span>
              Leave the current cover as-is unless you want to replace it.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">·</span>
              Changes are saved directly to the existing vlog entry.
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
