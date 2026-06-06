import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { VlogCard } from "@/components/vlogs/vlog-card";
import { vlogService } from "@/services/vlog.service";

const PAGE_SIZE = 9;

function PaginationBar({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pages: (number | "ellipsis")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("ellipsis");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1.5">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={`/vlogs?page=${currentPage - 1}`}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Previous
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground/40 cursor-not-allowed">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Previous
        </span>
      )}

      {/* Pages */}
      <div className="flex items-center gap-0.5">
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <span key={`e-${i}`} className="px-2 py-2 text-sm text-muted-foreground">
              &hellip;
            </span>
          ) : (
            <Link
              key={p}
              href={`/vlogs?page=${p}`}
              className={`inline-flex items-center justify-center w-9 h-9 text-sm font-medium rounded-lg transition-colors ${
                p === currentPage
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {p}
            </Link>
          ),
        )}
      </div>

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={`/vlogs?page=${currentPage + 1}`}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
        >
          Next
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground/40 cursor-not-allowed">
          Next
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      )}
    </div>
  );
}

export default async function VlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);

  const { vlogs, pagination } = await vlogService.getVlogsPaginated(currentPage, PAGE_SIZE);
  const { totalPages } = pagination;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <Container className="py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-2">
                Discover
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Stories from creators
              </h1>
              <p className="mt-2 text-muted-foreground text-sm sm:text-base">
                {pagination.total > 0
                  ? `${pagination.total} ${pagination.total === 1 ? "story" : "stories"} published by creators worldwide`
                  : "Be the first creator to publish on Snapora"}
              </p>
            </div>
            <Link href="/create-vlog">
              <Button className="hidden sm:inline-flex gap-2 shadow-md">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Write a story
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-10">
        {vlogs.length === 0 ? (
          <EmptyState
            icon={
              <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
              </svg>
            }
            title="No stories yet"
            description="Be the first creator to publish on Snapora. Your story could be right here."
            action={{ label: "Publish your first story", href: "/create-vlog" }}
            size="lg"
          />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {vlogs.map((vlog) => (
                <VlogCard key={vlog.id} vlog={vlog} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 pt-8 border-t border-border">
                <PaginationBar currentPage={currentPage} totalPages={totalPages} />
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
