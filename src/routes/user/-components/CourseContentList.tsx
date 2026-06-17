import { useState } from "react";
import { CheckSquare, ChevronDown, ChevronUp, Square } from "lucide-react";
import { useCurrentLesson } from "#/store/playerStore.ts";
import type { LessonSection, LessonSub } from "#/types/learn.ts";
import { MediaIcon } from "./CoursePlayer";

interface Props {
  sections: LessonSection[];
  readIds: Set<string>;
}

export default function CourseContentList({ sections, readIds }: Props) {
  // Open the first section that actually has lessons.
  const firstWithLessons = sections.findIndex(
    (s) => s.courseContentSubs.length > 0,
  );
  const [openIndex, setOpenIndex] = useState(
    firstWithLessons === -1 ? 0 : firstWithLessons,
  );

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
            isOpen={openIndex === index}
            onToggle={() =>
              setOpenIndex((cur) => (cur === index ? -1 : index))
            }
          />
        ))}
      </div>
    </div>
  );
}

function Section({
  section,
  readIds,
  isOpen,
  onToggle,
}: {
  section: LessonSection;
  readIds: Set<string>;
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
          {section.courseContentSubs.map((sub) => (
            <LessonRow key={sub.id} sub={sub} read={readIds.has(sub.id)} />
          ))}
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

function LessonRow({ sub, read }: { sub: LessonSub; read: boolean }) {
  const [current, setCurrent] = useCurrentLesson();
  const active = current?.id === sub.id;

  return (
    <li>
      <button
        type="button"
        onClick={() => setCurrent(sub)}
        className={`flex w-full items-start gap-3 px-5 py-3 text-left transition-colors ${
          active ? "bg-secondary/10" : "hover:bg-base-200"
        }`}
      >
        <span className="mt-0.5 text-secondary">
          {read ? (
            <CheckSquare className="h-4 w-4" />
          ) : (
            <Square className="h-4 w-4 text-base-content/30" />
          )}
        </span>
        <span className="flex flex-1 items-center gap-2">
          <MediaIcon type={sub.mediaType} />
          <span
            className={`flex-1 text-sm ${
              active ? "font-medium text-accent" : "text-base-content/80"
            }`}
          >
            {sub.title}
          </span>
        </span>
        {sub.duration > 0 && (
          <span className="shrink-0 text-xs text-base-content/40">
            {sub.duration} Min(s)
          </span>
        )}
      </button>
    </li>
  );
}
