import apiClient from "#/client/api.ts";
import PageLoader from "#/components/layout/PageLoader.tsx";
import { PagerButton } from "#/components/PagerButton.tsx";
import { usePagination } from "#/hooks/usePagination.ts";
import type { Assesmnt } from "#/types/courses.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

export const Route = createFileRoute("/user/progress/")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { page: number } => ({
    page: Number(search.page) || 1,
  }),
});

function RouteComponent() {
  const { page, setPage, hasPrev, hasNext, totalPages } = usePagination();
  const query = useQuery<{ count: number; data: Assesmnt[] }>({
    queryKey: ["progress", page],
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
      <h1 className="text-2xl font-semibold text-accent">Progress</h1>

      <PageLoader query={query} loadingText="Loading your progress...">
        {(data) => {
          const items = data.data ?? [];

          if (items.length === 0) {
            return (
              <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-base-300 bg-base-100 py-20 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-base-200">
                  <GraduationCap className="h-6 w-6 text-base-content/40" />
                </span>
                <h3 className="text-xl font-medium text-accent">
                  No progress to show yet
                </h3>
                <p className="max-w-md leading-relaxed text-base-content/55">
                  Enroll in a course to start tracking your completion and
                  assessments here.
                </p>
              </div>
            );
          }

          return (
            <>
              <div className="space-y-6">
                {items.map((item) => (
                  <ProgressCard key={item.id} item={item} />
                ))}
              </div>

              <div className="flex items-center justify-end gap-4">
                <p className="text-sm text-base-content/60">
                  Page {page} of {totalPages(data.count)}
                </p>
                <div className="flex gap-2">
                  <PagerButton
                    label="Prev"
                    disabled={!hasPrev}
                    onClick={() => setPage(page - 1)}
                  />
                  <PagerButton
                    label="Next"
                    disabled={!hasNext(data.count)}
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

function ProgressCard({ item }: { item: Assesmnt }) {
  const { course } = item;
  const { total, done } = course.assessment;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  const isComplete = percent === 100;

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-base-300 bg-base-100 sm:flex-row">
      {/* Cover */}
      <div className="h-48 w-full shrink-0 bg-base-200 sm:h-auto sm:w-56">
        {course.coverImage && (
          <img
            src={course.coverImage}
            alt={course.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-5 p-6">
        <h2 className="text-lg font-medium text-accent">{course.title}</h2>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-accent">Completed</span>
            <span className="font-semibold text-success">{percent}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-base-200">
            <div
              className="h-full rounded-full bg-success transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-base-200 pt-4 text-sm">
          <span className="font-medium text-accent">Assessments</span>
          <span className="font-semibold text-base-content/70">
            {done}/{total}
          </span>
        </div>

        <div className="mt-auto flex flex-wrap justify-end gap-3 pt-2">
          <button
            type="button"
            disabled={!isComplete}
            className="rounded-sm border border-base-300 bg-base-200 px-5 py-2.5 text-sm font-medium text-base-content/70 transition-colors hover:bg-base-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Get Certification
          </button>
          <button
            type="button"
            className="rounded-sm bg-accent px-5 py-2.5 text-sm font-medium text-accent-content transition-colors hover:bg-accent/90"
          >
            View Assessment Results
          </button>
        </div>
      </div>
    </div>
  );
}
