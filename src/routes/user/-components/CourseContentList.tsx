import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckSquare, ChevronDown, ChevronUp, Loader2, Square } from "lucide-react";
import { toast } from "sonner";
import apiClient from "#/client/api.ts";
import Modal, { type ModalHandle } from "#/components/modals/DialogModal.tsx";
import { useCurrentLesson } from "#/store/playerStore.ts";
import type { LessonSection, LessonSub } from "#/types/learn.ts";
import AssessmentRunner from "./AssessmentRunner";
import { MediaIcon } from "./CoursePlayer";

interface Props {
  sections: LessonSection[];
  readIds: Set<string>;
  doneIds: Set<string>;
  courseId: string;
}

export default function CourseContentList({
  sections,
  readIds,
  doneIds,
  courseId,
}: Props) {
  // Open the first section that actually has lessons.
  const firstWithLessons = sections.findIndex(
    (s) => s.courseContentSubs.length > 0,
  );
  const [openIndex, setOpenIndex] = useState(
    firstWithLessons === -1 ? 0 : firstWithLessons,
  );

  const modalRef = useRef<ModalHandle>(null);
  const [activeAssessment, setActiveAssessment] = useState<LessonSub | null>(
    null,
  );

  function openAssessment(sub: LessonSub) {
    setActiveAssessment(sub);
    modalRef.current?.open();
  }

  return (
    <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100">
      <div className="border-b border-base-300 px-5 py-4">
        <h2 className="font-semibold text-accent">Course content</h2>
      </div>

      <div className="divide-y divide-base-300">
        {sections.map((section, index) => (
          <Section
            key={section.title}
            section={section}
            readIds={readIds}
            doneIds={doneIds}
            courseId={courseId}
            onOpenAssessment={openAssessment}
            isOpen={openIndex === index}
            onToggle={() =>
              setOpenIndex((cur) => (cur === index ? -1 : index))
            }
          />
        ))}
      </div>

      <Modal ref={modalRef} title="Assessment">
        {activeAssessment && (
          <AssessmentRunner
            key={activeAssessment.id}
            sub={activeAssessment}
            courseId={courseId}
            done={doneIds.has(activeAssessment.id)}
            onClose={() => modalRef.current?.close()}
          />
        )}
      </Modal>
    </div>
  );
}

function Section({
  section,
  readIds,
  doneIds,
  courseId,
  onOpenAssessment,
  isOpen,
  onToggle,
}: {
  section: LessonSection;
  readIds: Set<string>;
  doneIds: Set<string>;
  courseId: string;
  onOpenAssessment: (sub: LessonSub) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left hover:bg-base-200/60"
      >
        <span className="font-medium text-accent">{section.title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-base-content/40" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-base-content/40" />
        )}
      </button>

      {isOpen && section.courseContentSubs.length > 0 && (
        <ul className="bg-base-200/40">
          {section.courseContentSubs.map((sub) =>
            sub.mediaType === "assessment" ? (
              <AssessmentRow
                key={sub.id}
                sub={sub}
                done={doneIds.has(sub.id)}
                onOpen={() => onOpenAssessment(sub)}
              />
            ) : (
              <LessonRow
                key={sub.id}
                sub={sub}
                read={readIds.has(sub.id)}
                courseId={courseId}
              />
            ),
          )}
        </ul>
      )}

      {isOpen && section.courseContentSubs.length === 0 && (
        <p className="px-5 pb-4 text-xs text-base-content/40">
          No lessons in this section yet.
        </p>
      )}
    </div>
  );
}

function LessonRow({
  sub,
  read,
  courseId,
}: {
  sub: LessonSub;
  read: boolean;
  courseId: string;
}) {
  const [current, setCurrent] = useCurrentLesson();
  const queryClient = useQueryClient();
  const active = current?.id === sub.id;

  const markRead = useMutation({
    mutationFn: async () => {
      await apiClient.post(
        "/orders/record-course-read",
        { courseContentSub: sub.id },
        { headers: { "Course-Request-Id": courseId } },
      );
    },
    onSuccess: () => {
      toast.success("Marked as completed.");
      queryClient.invalidateQueries({ queryKey: ["my-course", courseId] });
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ?? "Could not update progress.",
      );
    },
  });

  return (
    <li
      className={`flex items-start gap-3 px-5 py-3 transition-colors ${
        active ? "bg-secondary/10" : "hover:bg-base-200"
      }`}
    >
      <button
        type="button"
        onClick={() => !read && markRead.mutate()}
        disabled={read || markRead.isPending}
        aria-label={read ? "Completed" : "Mark as completed"}
        className="mt-0.5 text-secondary disabled:cursor-default"
      >
        {markRead.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : read ? (
          <CheckSquare className="h-4 w-4" />
        ) : (
          <Square className="h-4 w-4 text-base-content/30 transition-colors hover:text-secondary" />
        )}
      </button>

      <button
        type="button"
        onClick={() => setCurrent(sub)}
        className="flex flex-1 items-center gap-2 text-left"
      >
        <MediaIcon type={sub.mediaType} />
        <span
          className={`flex-1 text-sm ${
            active ? "font-medium text-accent" : "text-base-content/80"
          }`}
        >
          {sub.title}
        </span>
      </button>

      {sub.duration > 0 && (
        <span className="mt-0.5 shrink-0 text-xs text-base-content/40">
          {sub.duration} Min(s)
        </span>
      )}
    </li>
  );
}

// Assessments open inline in a modal where the learner takes the quiz or
// reviews their completed attempt.
function AssessmentRow({
  sub,
  done,
  onOpen,
}: {
  sub: LessonSub;
  done: boolean;
  onOpen: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-start gap-3 px-5 py-3 text-left transition-colors hover:bg-base-200"
      >
        <span className="mt-0.5 text-secondary">
          {done ? (
            <CheckSquare className="h-4 w-4" />
          ) : (
            <Square className="h-4 w-4 text-base-content/30" />
          )}
        </span>
        <span className="flex flex-1 items-center gap-2">
          <MediaIcon type={sub.mediaType} />
          <span className="flex-1 text-sm text-base-content/80">
            {sub.title}
          </span>
        </span>
        <span className="shrink-0 rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-secondary uppercase">
          {done ? "Done" : "Assessment"}
        </span>
      </button>
    </li>
  );
}
