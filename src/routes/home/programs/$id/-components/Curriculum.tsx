import { useRef, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock,
  Eye,
  FileText,
  Image,
  Play,
  ClipboardList,
} from "lucide-react";
import Modal, { type ModalHandle } from "#/components/modals/DialogModal.tsx";
import type {
  CourseContentSection,
  CourseContentSub,
} from "#/types/courses.ts";

interface CurriculumProps {
  sections: CourseContentSection[];
}

export default function Curriculum({ sections = [] }: CurriculumProps) {
  const [openIndex, setOpenIndex] = useState(0);
  const [preview, setPreview] = useState<CourseContentSub | null>(null);
  const modalRef = useRef<ModalHandle>(null);

  function openPreview(sub: CourseContentSub) {
    setPreview(sub);
    modalRef.current?.open();
  }

  return (
    <>
      <section
        id="curriculum"
        className="scroll-mt-24 bg-base-100 px-6 md:px-16 pb-8"
      >
        <div className="container mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <span className="mb-8 inline-block rounded-full border border-base-content/15 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
              Curriculum
            </span>
            <h2 className="text-4xl leading-tight font-light text-accent md:text-5xl">
              A structured path from{" "}
              <em className="text-secondary italic">foundation to capstone.</em>
            </h2>
          </div>
          <p className="leading-relaxed text-base-content/55">
            Each module combines lecture material, case studies, video, and
            assessments progressing learners from foundational concepts to
            applied, organization-level decision making.
          </p>
        </div>

        <div className="container mx-auto mt-12">
          {sections.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 border-b border-base-300 py-20 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-base-200">
                <BookOpen className="h-6 w-6 text-base-content/40" />
              </span>
              <h3 className="text-xl font-medium text-accent">
                No curriculum available yet
              </h3>
              <p className="max-w-md leading-relaxed text-base-content/55">
                The curriculum for this program is being finalized. Check back
                soon or contact admissions for the full breakdown.
              </p>
            </div>
          ) : (
            sections.map((section, index) => (
              <SectionAccordion
                key={section.title}
                number={String(index + 1).padStart(2, "0")}
                section={section}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex((cur) => (cur === index ? -1 : index))
                }
                onPreview={openPreview}
              />
            ))
          )}
        </div>
      </section>

      <Modal ref={modalRef} title={preview?.title}>
        {preview?.previewUrl && <PreviewMedia sub={preview} />}
      </Modal>
    </>
  );
}

interface SectionAccordionProps {
  number: string;
  section: CourseContentSection;
  isOpen: boolean;
  onToggle: () => void;
  onPreview: (sub: CourseContentSub) => void;
}

function SectionAccordion({
  number,
  section,
  isOpen,
  onToggle,
  onPreview,
}: SectionAccordionProps) {
  return (
    <div className="border-b border-base-300 py-8">
      <div className="flex items-start gap-6">
        <span className="mt-2 text-[11px] font-medium tracking-widest text-base-content/40">
          {number}
        </span>

        <button type="button" onClick={onToggle} className="flex-1 text-left">
          <h3 className="text-2xl leading-tight font-medium text-accent md:text-3xl">
            {section.title}
          </h3>
          <p className="mt-1 text-sm text-base-content/45">
            {section.courseContentSubs.length} lesson
            {section.courseContentSubs.length !== 1 ? "s" : ""}
          </p>
        </button>

        <button
          type="button"
          onClick={onToggle}
          aria-label={isOpen ? "Collapse section" : "Expand section"}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-base-300 text-base-content/50 hover:border-base-content/30"
        >
          {isOpen ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>

      {isOpen && section.courseContentSubs.length > 0 && (
        <ul className="mt-6 ml-12 divide-y divide-base-300 border-t border-base-300">
          {section.courseContentSubs.map((sub) => (
            <SubItem key={sub.title} sub={sub} onPreview={onPreview} />
          ))}
        </ul>
      )}
    </div>
  );
}

function SubItem({
  sub,
  onPreview,
}: {
  sub: CourseContentSub;
  onPreview: (sub: CourseContentSub) => void;
}) {
  return (
    <li className="flex items-center gap-4 py-4">
      <MediaIcon type={sub.mediaType} />
      <span className="flex-1 text-base-content/80">{sub.title}</span>
      {sub.duration > 0 && (
        <span className="flex items-center gap-1 text-xs text-base-content/40">
          <Clock className="h-3 w-3" />
          {sub.duration}m
        </span>
      )}
      {sub.previewUrl && (
        <button
          type="button"
          onClick={() => onPreview(sub)}
          className="flex items-center gap-1.5 rounded-sm border border-secondary px-3 py-1.5 text-xs font-medium text-secondary hover:bg-secondary hover:text-secondary-content transition-colors"
        >
          <Eye className="h-3 w-3" />
          Preview
        </button>
      )}
    </li>
  );
}

function PreviewMedia({ sub }: { sub: CourseContentSub }) {
  const src = sub.previewUrl;
  if (!src) return null;

  if (sub.mediaType === "video") {
    return <video src={src} controls autoPlay className="w-full rounded" />;
  }

  if (sub.mediaType === "image") {
    return (
      <img
        src={src}
        alt={sub.title}
        className="w-full rounded object-contain"
      />
    );
  }

  // document (PDF and other embeddable files)
  return (
    <iframe
      src={src}
      title={sub.title}
      className="h-[70vh] w-full rounded border border-base-300"
    />
  );
}

function MediaIcon({ type }: { type: CourseContentSub["mediaType"] }) {
  const cls = "h-4 w-4 shrink-0 text-base-content/40";
  if (type === "video") return <Play className={cls} />;
  if (type === "image") return <Image className={cls} />;
  if (type === "assessment") return <ClipboardList className={cls} />;
  return <FileText className={cls} />;
}
