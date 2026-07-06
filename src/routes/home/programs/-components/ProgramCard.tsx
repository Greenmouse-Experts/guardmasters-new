import { Link } from "@tanstack/react-router";
import type { Course } from "#/types/courses.ts";

interface ProgramCardProps {
  course: Course;
  index?: number;
  programTitle?: string;
}

export default function ProgramCard({
  course,
  index,
  programTitle,
}: ProgramCardProps) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-xl">
      {/* ── Header: white bg + yellow angled band + circle image ── */}
      <div className="relative h-52 overflow-hidden bg-white">
        {/* Angled yellow shape covering the lower portion */}
        <div
          className="absolute inset-x-0 bottom-0 h-3/5 bg-primary"
          style={{ clipPath: "polygon(0 45%, 100% 0%, 100% 100%, 0 100%)" }}
        />

        {/* Program label — top-left */}
        {programTitle && (
          <div className="absolute left-5 top-5 z-10 text-[10px] font-semibold uppercase tracking-[0.15em] text-base-content/40">
            {typeof index === "number"
              ? `${String(index + 1).padStart(2, "0")} · `
              : ""}
            {programTitle}
          </div>
        )}

        {/* Circle: course image or placeholder */}
        <div className="absolute right-6 top-5 z-10 h-20 w-20 overflow-hidden rounded-full bg-base-300 shadow-md ring-4 ring-white transition-transform duration-500 group-hover:scale-105">
          {course.coverImage ? (
            <img
              src={course.coverImage}
              alt={course.title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
      </div>

      {/* ── Dark content area ── */}
      <div className="flex flex-1 flex-col bg-accent px-6 py-8 text-center">
        <h3 className="mb-3 font-pop text-xl font-bold leading-snug text-accent-content line-clamp-3">
          {course.title}
        </h3>

        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-accent-content/60">
          {course.shortDesc}
        </p>

        {course.price > 0 && (
          <p className="mb-8 text-lg font-semibold text-accent-content">
            CA${course.price}
          </p>
        )}

        <Link
          to="/home/programs/$id"
          params={{ id: course.id }}
          className="btn btn-block mt-auto h-auto justify-center rounded-xl border-none bg-primary py-3.5 text-base font-semibold text-primary-content hover:bg-primary/90"
        >
          Enroll
        </Link>
      </div>
    </div>
  );
}
