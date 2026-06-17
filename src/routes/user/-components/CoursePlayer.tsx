import { ClipboardList, FileText, PlaySquare } from "lucide-react";
import { useCurrentLesson } from "#/store/playerStore.ts";

export default function CoursePlayer() {
  const [lesson] = useCurrentLesson();

  if (!lesson) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 bg-base-300 text-center text-base-content/50">
        <PlaySquare className="h-10 w-10" />
        <p className="text-sm">Select a lesson to begin</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="aspect-video w-full overflow-hidden bg-black">
        <Media key={lesson.id} lesson={lesson} />
      </div>
      <div className="flex items-center justify-between gap-4 px-1 py-3">
        <h2 className="font-medium text-accent">{lesson.title}</h2>
        {lesson.duration > 0 && (
          <span className="shrink-0 text-xs text-base-content/45">
            {lesson.duration} Min(s)
          </span>
        )}
      </div>
    </div>
  );
}

function Media({ lesson }: { lesson: { media: string; mediaType: string } }) {
  const { media, mediaType } = lesson;

  if (mediaType === "video") {
    return (
      <video
        src={media}
        controls
        controlsList="nodownload"
        className="h-full w-full"
      />
    );
  }

  if (mediaType === "image") {
    return <img src={media} alt="" className="h-full w-full object-contain" />;
  }

  if (mediaType === "document") {
    return <iframe src={media} title="Document" className="h-full w-full" />;
  }

  // assessment
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-base-200 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
        <ClipboardList className="h-8 w-8" />
      </span>
      <p className="text-base-content/70">This lesson is an assessment.</p>
      <button
        type="button"
        className="rounded-sm bg-secondary px-6 py-2.5 text-sm font-medium text-secondary-content hover:bg-secondary/90"
      >
        Start Assessment
      </button>
    </div>
  );
}

export function MediaIcon({ type }: { type: string }) {
  const cls = "h-4 w-4 shrink-0 text-base-content/40";
  if (type === "video") return <PlaySquare className={cls} />;
  if (type === "assessment") return <ClipboardList className={cls} />;
  return <FileText className={cls} />;
}
