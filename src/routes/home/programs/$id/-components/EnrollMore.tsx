import apiClient from "#/client/api.ts";
import QueryCompLayout from "#/components/layout/QueryCompLayout.tsx";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { ReactNode } from "react";

interface RelatedCourse {
  id: string;
  title: string;
  coverImage: string;
  originalPriceFormat: string;
  discountPriceFormat: string | null;
  program: {
    id: string;
    title: string;
  };
}

interface RelatedResponse {
  data: RelatedCourse[];
  count: number;
}

interface EnrollMoreProps {
  badge: string;
  title: ReactNode;
  description: string;
  price: string;
  priceNote: string;
  includes: string[];
  relatedBadge: string;
  relatedTitle: string;
  programId: string;
  currentCourseId?: string;
}

export default function EnrollMore({
  badge,
  title,
  description,
  price,
  priceNote,
  includes,
  relatedBadge,
  relatedTitle,
  programId,
  currentCourseId,
}: EnrollMoreProps) {
  const related = useQuery<RelatedResponse>({
    queryKey: ["related", programId],
    queryFn: async () => {
      const resp = await apiClient.get("/courses/public", {
        params: { programId },
      });
      return resp.data;
    },
  });
  return (
    <section data-theme="guard">
      {/* Enroll / pricing */}
      <div className="bg-base-100 px-6 py-20 md:px-16 md:py-28">
        <div className="container mx-auto grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="mb-8 inline-block rounded-full border border-base-content/15 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
              {badge}
            </span>

            <h2 className="mb-6 text-4xl leading-tight font-light text-accent md:text-6xl">
              {title}
            </h2>

            <p className="max-w-md leading-relaxed text-base-content/50">
              {description}
            </p>
          </div>

          <div className="rounded-sm border border-base-300 bg-base-100 p-8 md:p-10">
            <div className="mb-8 flex items-baseline gap-3">
              <span className="text-5xl font-semibold text-secondary md:text-6xl">
                {price}
              </span>
              <span className="text-xs font-medium tracking-[0.15em] text-base-content/50 uppercase">
                {priceNote}
              </span>
            </div>

            <ul className="mb-8 flex flex-col gap-3">
              {includes.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-4 w-4 shrink-0 text-secondary" />
                  <span className="text-base-content/80">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/home/auth/signup"
              className="btn btn-block h-auto gap-2 rounded-md border-none bg-secondary py-4 font-medium text-secondary-content hover:bg-secondary/90"
            >
              Enroll now
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button className="btn btn-ghost btn-block mt-3 gap-2 font-medium text-base-content/60 hover:bg-transparent hover:text-base-content">
              Or speak to an advisor
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Related courses */}
      <div className="bg-base-200 px-6 py-20 md:px-16 md:py-24">
        <div className="container mx-auto">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-6 inline-block rounded-full border border-base-content/15 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
                {relatedBadge}
              </span>
              <h2 className="text-4xl leading-tight font-light text-accent md:text-5xl">
                {relatedTitle}
              </h2>
            </div>

            <Link
              to="/home/programs"
              className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:underline"
            >
              All programs
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <QueryCompLayout query={related}>
            {(resp) => {
              const courses = (resp.data ?? []).filter(
                (course) => course.id !== currentCourseId,
              );

              if (courses.length === 0) {
                return (
                  <p className="py-10 text-center text-base-content/50">
                    No related courses available.
                  </p>
                );
              }

              return (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {courses.map((course) => (
                    <Link
                      key={course.id}
                      to="/home/programs/$id"
                      params={{ id: course.id }}
                      className="group flex flex-col overflow-hidden border border-base-300 bg-base-100 transition-shadow hover:shadow-lg"
                    >
                      <div className="h-40 w-full overflow-hidden bg-base-200">
                        {course.coverImage && (
                          <img
                            src={course.coverImage}
                            alt={course.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-4 text-[11px] font-medium tracking-[0.15em] text-base-content/50 uppercase">
                          {course.program?.title}
                        </div>

                        <h3 className="mb-6 line-clamp-2 text-xl font-medium text-accent">
                          {course.title}
                        </h3>

                        <div className="mt-auto flex items-center justify-between border-t border-base-300 pt-5">
                          <span className="font-medium text-base-content/70">
                            {course.discountPriceFormat ??
                              course.originalPriceFormat}
                          </span>
                          <span className="flex items-center gap-1 text-sm font-medium text-secondary group-hover:underline">
                            View
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              );
            }}
          </QueryCompLayout>
        </div>
      </div>
    </section>
  );
}
