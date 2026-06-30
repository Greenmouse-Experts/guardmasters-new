import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Course } from "#/types/courses.ts";

interface ProgramCardProps {
  course: Course;
}

export default function ProgramCard({ course }: ProgramCardProps) {
  return (
    <div className="group flex h-full flex-col rounded-2xl bg-accent p-5 text-accent-content transition-shadow hover:shadow-lg">
      <div className="mb-6 overflow-hidden rounded-xl bg-accent-content/10">
        {course.coverImage && (
          <img
            src={course.coverImage}
            alt={course.title}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <h3 className="mb-4 line-clamp-3 text-2xl leading-tight font-light text-accent-content">
        {course.title}
      </h3>
      <p className="mb-8 line-clamp-2 text-sm leading-relaxed text-accent-content/60 flex-1">
        {course.shortDesc}
      </p>

      <Link
        to="/home/programs/$id"
        params={{ id: course.id }}
        className="btn btn-block mt-auto h-auto gap-2 rounded-md border-none bg-primary py-3.5 font-medium text-primary-content hover:bg-primary/90"
      >
        Enroll
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
