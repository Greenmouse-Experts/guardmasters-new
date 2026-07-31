import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, ListChecks, PanelRightClose, PanelRightOpen } from "lucide-react";
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      {/* Left: player + meta */}
      <div className="min-w-0 flex-1 space-y-6 lg:sticky lg:self-start top-20">
        <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100">
          <CoursePlayer courseId={String(course.id)} />
        </div>

        <CourseTabs data={data} />
      </div>

      {/* Collapsed state: slim button to reopen the list (desktop only) */}
      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Show content list"
          title="Show content list"
          className="hidden lg:sticky lg:self-start lg:top-20 lg:flex lg:h-11 lg:w-11 lg:shrink-0 lg:items-center lg:justify-center rounded-lg border border-base-300 bg-base-100 text-base-content/60 transition-colors hover:text-base-content"
        >
          <PanelRightOpen className="h-5 w-5" />
        </button>
      )}

      {/* Right: content list — sticky with its own scroll, hidden when toggled */}
      <div
        className={`w-full lg:w-96 lg:shrink-0 lg:sticky lg:self-start lg:top-20 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto ${sidebarOpen ? "block" : "hidden lg:hidden"}`}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 rounded-lg border border-base-300 bg-base-100 px-5 py-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-base-content/60">
                <ListChecks className="h-4 w-4" />
                {contents.total} modules
              </span>
              <span className="flex items-center gap-1.5 text-base-content/60">
                <Clock className="h-4 w-4" />
                {contents.totalDuration} Min(s)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label="Hide content list"
              title="Hide content list"
              className="hidden shrink-0 rounded-md p-1 text-base-content/50 transition-colors hover:text-base-content lg:block"
            >
              <PanelRightClose className="h-5 w-5" />
            </button>
          </div>
          <CourseContentList
            sections={contents.data}
            readIds={readIds}
            doneIds={doneIds}
            courseId={String(course.id)}
          />
        </div>
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
                <p className=" text-base-content/60">
                  Program: {course.program.title}
                </p>
              )}
              <p className="whitespace-pre-line  leading-relaxed text-base-content/60">
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
      className={`-mb-px border-b-2 py-3  font-medium transition-colors ${
        active
          ? "border-secondary text-secondary"
          : "border-transparent text-base-content/55 hover:text-base-content"
      }`}
    >
      {children}
    </button>
  );
}
