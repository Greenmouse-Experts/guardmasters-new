import { Link } from "@tanstack/react-router";
import type { Course } from "#/types/courses.ts";

interface ProgramCardProps {
  course: Course;
}

export default function ProgramCard({ course }: ProgramCardProps) {
  return (
    <Link
      to="/home/programs/$id"
      params={{ id: course.id }}
      className="flex h-full max-w-[400px] flex-col border border-gray-200 rounded-sm p-6 font-sans"
    >
      <div className="mb-6 h-48 overflow-hidden rounded-xl bg-gray-100">
        {course.coverImage && (
          <img
            src={`${course.coverImage}`}
            alt={course.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <h2 className="text-3xl font-medium leading-tight mb-4 text-gray-900 line-clamp-2">
        {course.title}
      </h2>

      <p className="text-gray-600 text-lg line-clamp-3 leading-relaxed mb-8 flex-1">
        {course.shortDesc}
      </p>

      <button className="w-full bg-[#004aad] hover:bg-[#003a8c] text-white py-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors line-clamp-3">
        Enroll
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </button>
    </Link>
  );
}
