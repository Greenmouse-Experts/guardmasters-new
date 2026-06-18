import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  Loader2,
  PlaySquare,
  Square,
  X,
} from "lucide-react";
import apiClient from "#/client/api.ts";
import PageLoader from "#/components/layout/PageLoader.tsx";
import Modal, { type ModalHandle } from "#/components/modals/DialogModal.tsx";
import type {
  AttemptResponse,
  CourseLearnResponse,
  LessonSection,
  LessonSub,
} from "#/types/learn.ts";

export const Route = createFileRoute("/user/courses/$id/assessment")({
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
      <PageLoader query={query} loadingText="Loading assessments...">
        {(data) => <Assessments data={data} />}
      </PageLoader>
    </div>
  );
}

function Assessments({ data }: { data: CourseLearnResponse }) {
  // Keep only sections that contain assessment lessons.
  const sections = useMemo<LessonSection[]>(
    () =>
      data.contents.data
        .map((section) => ({
          ...section,
          courseContentSubs: section.courseContentSubs.filter(
            (sub) => sub.mediaType === "assessment",
          ),
        }))
        .filter((section) => section.courseContentSubs.length > 0),
    [data.contents.data],
  );

  const doneIds = useMemo(
    () => new Set(data.assessmentResults.map((r) => r.courseContentSub.id)),
    [data.assessmentResults],
  );

  const firstAssessment = sections[0]?.courseContentSubs[0];
  const [selected, setSelected] = useState<LessonSub | null>(
    firstAssessment ?? null,
  );

  useEffect(() => {
    setSelected(firstAssessment ?? null);
  }, [firstAssessment]);

  const modalRef = useRef<ModalHandle>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);

  const attemptQuery = useQuery<AttemptResponse>({
    queryKey: ["assessment-attempt", attemptId],
    queryFn: async () => {
      const resp = await apiClient.get("orders/fetch-attempts/" + attemptId);
      return resp.data;
    },
    enabled: !!attemptId,
  });

  function viewAttempt(sub: LessonSub) {
    setAttemptId(sub.id);
    modalRef.current?.open();
  }

  if (sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-base-200 text-base-content/40">
          <Square className="h-6 w-6" />
        </span>
        <p className="text-base-content/55">
          No assessments available for this course yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_24rem]">
      {/* Featured assessment */}
      <div className="min-w-0">
        {selected ? (
          <Featured
            assessment={selected}
            done={doneIds.has(selected.id)}
            onViewAttempt={() => viewAttempt(selected)}
          />
        ) : (
          <p className="py-24 text-center text-base-content/50">
            Select an assessment to begin.
          </p>
        )}
      </div>

      {/* Section list */}
      <div className="space-y-4">
        {sections.map((section, index) => (
          <SectionAccordion
            key={section.title}
            section={section}
            doneIds={doneIds}
            selectedId={selected?.id}
            onSelect={setSelected}
            defaultOpen={index === 0}
          />
        ))}
      </div>

      <Modal ref={modalRef} title="Attempt Review">
        <AttemptReview query={attemptQuery} />
      </Modal>
    </div>
  );
}

function AttemptReview({
  query,
}: {
  query: ReturnType<typeof useQuery<AttemptResponse>>;
}) {
  if (query.isLoading || query.isFetching) {
    return (
      <div className="flex items-center justify-center gap-2 py-12 text-base-content/50">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading attempt...
      </div>
    );
  }

  if (query.isError || !query.data) {
    return (
      <p className="py-12 text-center text-sm text-error">
        Could not load this attempt.
      </p>
    );
  }

  const { result, attempt } = query.data.data;

  return (
    <div className="space-y-5">
      {/* Score summary */}
      <div className="flex items-center justify-between rounded-lg bg-base-200 px-5 py-4">
        <div>
          <p className="text-xs tracking-wide text-base-content/50 uppercase">
            Score
          </p>
          <p className="text-lg font-semibold text-accent">
            {result.score} / {result.total}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs tracking-wide text-base-content/50 uppercase">
            Percent
          </p>
          <p className="text-lg font-semibold text-accent">
            {result.percent}%
          </p>
        </div>
      </div>

      {/* Questions */}
      <ol className="space-y-4">
        {attempt.map((answer, index) => (
          <li
            key={answer.id}
            className="rounded-lg border border-base-300 p-4"
          >
            <p className="font-medium text-accent">
              {index + 1}. {answer.assessmentQuestion.question}
            </p>
            <ul className="mt-3 space-y-2">
              {answer.assessmentQuestion.options.map((option, optIndex) => {
                const isCorrect =
                  optIndex === answer.assessmentQuestion.correctOption;
                const isChosen = optIndex === answer.choice;
                return (
                  <li
                    key={optIndex}
                    className={`flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm ${
                      isCorrect
                        ? "border-success/40 bg-success/10 text-success"
                        : isChosen
                          ? "border-error/40 bg-error/10 text-error"
                          : "border-base-300 text-base-content/70"
                    }`}
                  >
                    <span>{option}</span>
                    {isCorrect ? (
                      <Check className="h-4 w-4 shrink-0" />
                    ) : isChosen ? (
                      <X className="h-4 w-4 shrink-0" />
                    ) : null}
                  </li>
                );
              })}
            </ul>
            <p className="mt-2 text-xs text-base-content/45">
              {answer.assessmentQuestion.point} point
              {answer.assessmentQuestion.point !== 1 ? "s" : ""}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Featured({
  assessment,
  done,
  onViewAttempt,
}: {
  assessment: LessonSub;
  done: boolean;
  onViewAttempt: () => void;
}) {
  return (
    <div>
      <div className="aspect-[16/8] w-full overflow-hidden rounded-lg bg-base-300">
        {assessment.media && (
          <img
            src={assessment.media}
            alt={assessment.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <h1 className="mt-6 text-2xl font-semibold text-accent">
        {assessment.title}
      </h1>

      <p className="mt-3 text-sm text-base-content/55">
        Duration:{" "}
        <span className="font-semibold text-base-content">
          {assessment.duration} mins
        </span>
      </p>

      <div className="mt-12 flex justify-center">
        <ss
          type="button"
          onClick={done ? onViewAttempt : undefined}
          className="w-full max-w-md rounded-sm bg-accent py-3.5 text-sm font-medium text-accent-content transition-colors hover:bg-accent/90"
        >
          {done ? "View Attempt" : "Start Assessment"}
        </button>
      </div>
    </div>
  );
}

function SectionAccordion({
  section,
  doneIds,
  selectedId,
  onSelect,
  defaultOpen,
}: {
  section: LessonSection;
  doneIds: Set<string>;
  selectedId?: string;
  onSelect: (sub: LessonSub) => void;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left hover:bg-base-200/60"
      >
        <span className="flex items-center gap-2 font-medium text-accent">
          <PlaySquare className="h-4 w-4 text-base-content/50" />
          {section.title}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-base-content/40" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-base-content/40" />
        )}
      </button>

      {open && (
        <ul className="border-t border-base-300">
          {section.courseContentSubs.map((sub) => {
            const active = selectedId === sub.id;
            return (
              <li key={sub.id}>
                <button
                  type="button"
                  onClick={() => onSelect(sub)}
                  className={`flex w-full items-center gap-3 px-5 py-3 text-left transition-colors ${
                    active ? "bg-secondary/10" : "hover:bg-base-200"
                  }`}
                >
                  <span className="text-secondary">
                    {doneIds.has(sub.id) ? (
                      <CheckSquare className="h-4 w-4" />
                    ) : (
                      <Square className="h-4 w-4 text-base-content/30" />
                    )}
                  </span>
                  <span
                    className={`flex-1 text-sm ${
                      active
                        ? "font-medium text-accent"
                        : "text-base-content/80"
                    }`}
                  >
                    {sub.title}
                  </span>
                  {sub.duration > 0 && (
                    <span className="shrink-0 text-xs text-base-content/40">
                      {sub.duration} Min(s)
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
