import { createFileRoute, Link } from "@tanstack/react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BookOpen } from "lucide-react";
import apiClient from "#/client/api.ts";
import PageLoader from "#/components/layout/PageLoader.tsx";
import { usePagination } from "#/hooks/usePagination.ts";
import type { ApiResponseV2 } from "#/types/api.js";
import type { PurchaseItem } from "#/types/courses.ts";

export const Route = createFileRoute("/user/courses/")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { page: number } => ({
    page: Number(search.page) || 1,
  }),
});

function RouteComponent() {
  const { page, setPage, hasPrev, hasNext, totalPages } = usePagination();

  const query = useQuery<ApiResponseV2<PurchaseItem[]>>({
    queryKey: ["user-courses", page],
    queryFn: async () => {
      const resp = await apiClient.get("orders/purchased-courses", {
        params: { page, status: "confirmed" },
      });
      return resp.data;
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <h1 className="text-2xl font-semibold text-accent">My Courses</h1>

      <PageLoader query={query} loadingText="Loading your courses...">
        {(resp) => {
          const courses = resp.data ?? [];

          if (courses.length === 0) {
            return (
              <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-base-300 bg-base-100 py-20 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-base-200">
                  <BookOpen className="h-6 w-6 text-base-content/40" />
                </span>
                <h3 className="text-xl font-medium text-accent">
                  No purchased courses yet
                </h3>
                <p className="max-w-md leading-relaxed text-base-content/55">
                  Browse the catalogue and enroll to start your training.
                </p>
                <Link
                  to="/home/programs"
                  className="mt-2 rounded-sm bg-accent px-6 py-3 text-sm font-medium text-accent-content hover:bg-accent/90"
                >
                  Explore programs
                </Link>
              </div>
            );
          }

          return (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((item) => (
                  <CourseCard key={item.id} item={item} />
                ))}
              </div>

              <div className="flex items-center justify-end gap-4">
                <p className="text-sm text-base-content/60">
                  Page {page} of {totalPages(resp.count)}
                </p>
                <div className="flex gap-2">
                  <PagerButton
                    label="Prev"
                    disabled={!hasPrev}
                    onClick={() => setPage(page - 1)}
                  />
                  <PagerButton
                    label="Next"
                    disabled={!hasNext(resp.count)}
                    onClick={() => setPage(page + 1)}
                  />
                </div>
              </div>
            </>
          );
        }}
      </PageLoader>
    </div>
  );
}

function CourseCard({ item }: { item: PurchaseItem }) {
  const total = item.course.totalContent ?? 0;
  const completed = item.course.completedContent ?? 0;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100">
      <div className="h-40 w-full overflow-hidden bg-base-200">
        {item.course.coverImage && (
          <img
            src={item.course.coverImage}
            alt={item.course.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="p-5">
        <h2 className="line-clamp-2 min-h-[3rem] font-medium text-accent">
          {item.course.title}
        </h2>

        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-base-content/50">
            <span>Progress</span>
            <span>{pct}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-200">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          {total > 0 && (
            <p className="text-xs text-base-content/40">
              {completed} of {total} lessons completed
            </p>
          )}
        </div>

        <Link
          to="/user/courses/$id"
          params={{ id: item.course.id }}
          className="mt-4 block rounded-sm bg-accent py-3 text-center text-sm font-medium text-primary-content transition-colors hover:bg-accent/90 text-white"
        >
          {completed === 0 ? "Start Study" : "Continue Study"}
        </Link>
      </div>
    </div>
  );
}

function PagerButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-sm bg-accent px-4 py-1.5 text-sm font-medium text-accent-content transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-base-300 disabled:text-base-content/40"
    >
      {label}
    </button>
  );
}
