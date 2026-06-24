import apiClient from "#/client/api.ts";
import QueryCompLayout from "#/components/layout/QueryCompLayout.tsx";
import type { ApiResponseV2 } from "#/types/api.js";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

interface FeaturedCourse {
  id: string;
  title: string;
  shortDesc: string;
  coverImage: string;
  originalPriceFormat: string;
  discountPriceFormat: string | null;
  program?: { id: string; title: string };
}

export default function Featured() {
  const query = useQuery<ApiResponseV2<FeaturedCourse[]>>({
    queryKey: ["featured-programs"],
    queryFn: async () => {
      const resp = await apiClient.get("/courses/public/featured");
      return resp.data;
    },
  });

  return (
    <section>
      {/* Featured programs */}
      <div className="bg-base-100 px-6 py-8 md:px-16">
        <div className="container mx-auto">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <span className="mb-6 inline-block rounded-full border border-base-content/20 px-4 py-1.5 text-accent font-medium tracking-[0.18em]  uppercase">
                Featured Programs
              </span>
              <h2 className="text-4xl leading-tight font-light text-accent md:text-5xl">
                Start here. <em className="italic text-accent">Go places.</em>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-base-content/60">
              Comprehensive Mini-MBA security programs, IFPO certifications, and
              specialized courses — built around global best practices and ISO
              standards.
            </p>
          </div>

          <QueryCompLayout query={query}>
            {(resp) => {
              const programs = resp.data ?? [];

              if (programs.length === 0) {
                return (
                  <p className="py-12 text-center text-base-content/50">
                    No featured programs available right now.
                  </p>
                );
              }

              return (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {programs.map((program, index) => (
                    <div
                      key={program.id}
                      className="group flex flex-col rounded-2xl border border-base-300 bg-base-100 p-4 transition-shadow hover:shadow-lg"
                    >
                      <div className="mb-4 flex items-center justify-between text-[11px] font-medium tracking-[0.15em] text-base-content/50 uppercase">
                        <span>
                          {String(index + 1).padStart(2, "0")} /{" "}
                          {program.program?.title ?? "Program"}
                        </span>
                        <span>
                          {program.discountPriceFormat ??
                            program.originalPriceFormat}
                        </span>
                      </div>

                      <div className="mb-5 overflow-hidden rounded-xl bg-base-200">
                        {program.coverImage && (
                          <img
                            src={program.coverImage}
                            alt={program.title}
                            className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>

                      <h3 className="mb-3 line-clamp-2 text-xl font-semibold text-accent">
                        {program.title}
                      </h3>
                      <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-base-content/60">
                        {program.shortDesc}
                      </p>

                      <Link
                        to="/home/programs/$id"
                        params={{ id: program.id }}
                        className="btn btn-block mt-auto gap-2 rounded-md bg-secondary text-accent-content hover:bg-accent/90"
                      >
                        Enroll
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
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
