import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
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
    <div className="group flex h-full flex-col rounded-2xl bg-accent p-6 text-center text-accent-content transition-shadow hover:shadow-lg">
      {programTitle && (
        <div className="mb-5 text-left text-[11px]  tracking-[0.15em] text-accent-content/50 uppercase font-bold">
          {typeof index === "number"
            ? `${String(index + 1).padStart(2, "0")} / `
            : ""}
          {programTitle}
        </div>
      )}

      <div className="mb-6 overflow-hidden rounded-xl bg-accent-content/10">
        {course.coverImage && (
          <img
            src={course.coverImage}
            alt={course.title}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <h3 className="mb-4 line-clamp-2 text-2xl leading-tight font-light text-accent-content">
        {course.title}
      </h3>
      <p className="mb-8 line-clamp-3 text-sm leading-relaxed text-accent-content/60">
        {course.shortDesc}
      </p>

      <div className="mb-6 flex items-center justify-center gap-2">
        <img
          src="/course_logo.png"
          alt=""
          className="h-20 rounded-full object-cover object-left"
        />
        {/*<span className="text-sm font-medium text-accent-content/80">
          Guardmaster Institute Canada<sup>™</sup>
        </span>*/}
      </div>
      {course.price > 0 && (
        <div className="mb-6 text-2xl font-bold text-accent-content">
          $CA{course.price}
        </div>
      )}

      <Link
        to="/home/programs/$id"
        params={{ id: course.id }}
        className="btn btn-block mt-auto h-auto justify-center gap-2 rounded-md border-none bg-primary py-3.5  text-primary-content hover:bg-primary/90 font-bold text-xl"
      >
        Enroll
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
