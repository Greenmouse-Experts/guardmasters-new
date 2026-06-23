import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, ListChecks } from "lucide-react";
import apiClient from "#/client/api.ts";
import PageLoader from "#/components/layout/PageLoader.tsx";
import { useCurrentLesson } from "#/store/playerStore.ts";
import type { CourseLearnResponse, LessonSub } from "#/types/learn.ts";
import CourseContentList from "#/routes/user/-components/CourseContentList.tsx";
import CoursePlayer from "#/routes/user/-components/CoursePlayer.tsx";
import LoadReviews from "../-components/Reviews";

export const Route = createFileRoute("/user/courses/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const query = useQuery<CourseLearnResponse>({
    queryKey: ["my-course", id],
    queryFn: async () => {
      const resp = await apiClient.get("orders/fetch-course/" + id);
      return resp.data;
    },
  });

  return (
    <div className="mx-auto max-w-7xl">
      <PageLoader query={query} loadingText="Loading course...">
        {(data) => <Learn data={data} />}
      </PageLoader>
    </div>
  );
}

function Learn({ data }: { data: CourseLearnResponse }) {
  const [, setLesson] = useCurrentLesson();

  const readIds = useMemo(
    () => new Set(data.reads.map((r) => r.contentSub.id)),
    [data.reads],
  );

  const doneIds = useMemo(
    () => new Set(data.assessmentResults.map((r) => r.courseContentSub.id)),
    [data.assessmentResults],
  );

  // First playable lesson across all sections, used as the default selection.
  const firstLesson = useMemo<LessonSub | undefined>(
    () => data.contents.data.flatMap((s) => s.courseContentSubs).find(Boolean),
    [data.contents.data],
  );

  // Seed the player with the first lesson, and reset when leaving the page.
  useEffect(() => {
    setLesson(firstLesson ?? null);
    return () => setLesson(null);
  }, [firstLesson, setLesson]);

  const { course, contents } = data;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_24rem]">
      {/* Left: player + meta */}
      <div className="min-w-0 space-y-6">
        <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100">
          <CoursePlayer courseId={String(course.id)} />
        </div>

        <CourseTabs data={data} />
      </div>

      {/* Right: content list */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 rounded-lg border border-base-300 bg-base-100 px-5 py-4 text-sm">
          <span className="flex items-center gap-1.5 text-base-content/60">
            <ListChecks className="h-4 w-4" />
            {contents.total} modules
          </span>
          <span className="flex items-center gap-1.5 text-base-content/60">
            <Clock className="h-4 w-4" />
            {contents.totalDuration} Min(s)
          </span>
        </div>
        <CourseContentList
          sections={contents.data}
          readIds={readIds}
          doneIds={doneIds}
          courseId={String(course.id)}
        />
      </div>

      {/* Hidden anchor for title context on small screens */}
      <p className="sr-only">{course.title}</p>
    </div>
  );
}

type Tab = "about" | "reviews";

function CourseTabs({ data }: { data: CourseLearnResponse }) {
  const [tab, setTab] = useState<Tab>("about");
  const { course } = data;

  return (
    <div className="rounded-lg border border-base-300 bg-base-100">
      <div className="flex gap-6 border-b border-base-300 px-6">
        <TabButton active={tab === "about"} onClick={() => setTab("about")}>
          About
        </TabButton>
        <TabButton active={tab === "reviews"} onClick={() => setTab("reviews")}>
          Reviews
        </TabButton>
      </div>

      <div className="p-6">
        {tab === "about" ? (
          <div className="flex gap-5">
            <img
              src={course.coverImage}
              alt={course.title}
              className="hidden h-20 w-28 shrink-0 rounded-md object-cover sm:block"
            />
            <div className="min-w-0 space-y-2">
              <h1 className="text-lg font-semibold text-accent">
                {course.title}
              </h1>
              {course.program?.title && (
                <p className="text-sm text-base-content/60">
                  Program: {course.program.title}
                </p>
              )}
              <p className="whitespace-pre-line text-sm leading-relaxed text-base-content/60">
                {course.shortDesc}
              </p>
            </div>
          </div>
        ) : (
          <LoadReviews id={course.id as unknown as string} />
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`-mb-px border-b-2 py-3 text-sm font-medium transition-colors ${
        active
          ? "border-secondary text-secondary"
          : "border-transparent text-base-content/55 hover:text-base-content"
      }`}
    >
      {children}
    </button>
  );
}
