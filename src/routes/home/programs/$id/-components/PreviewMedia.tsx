import type { CourseContentSub } from "#/types/courses.ts";
import PptxViewer from "#/components/PptxViewer.tsx";

function officeEmbedUrl(src: string) {
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(src)}`;
}

function isPptx(src: string) {
  return /\.(pptx?|ppt)($|\?)/i.test(src);
}

function isDocx(src: string) {
  return /\.docx?($|\?)/i.test(src);
}

export default function PreviewMedia({ sub }: { sub: CourseContentSub }) {
  const src = sub.previewUrl;
  if (!src) return null;

  if (sub.mediaType === "video") {
    return <video src={src} controls autoPlay className="w-full rounded" />;
  }

  if (sub.mediaType === "image") {
    return (
      <img src={src} alt={sub.title} className="w-full rounded object-contain" />
    );
  }

  if (isPptx(src)) {
    return (
      <PptxViewer
        src={src}
        title={sub.title}
        className="h-[70vh] w-full rounded border border-base-300"
      />
    );
  }

  if (isDocx(src)) {
    return (
      <iframe
        src={officeEmbedUrl(src)}
        title={sub.title}
        className="h-[70vh] w-full rounded border border-base-300"
      />
    );
  }

  return (
    <iframe
      src={src}
      title={sub.title}
      className="h-[70vh] w-full rounded border border-base-300"
    />
  );
}
