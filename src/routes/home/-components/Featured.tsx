import apiClient from "#/client/api.ts";
import QueryCompLayout from "#/components/layout/QueryCompLayout.tsx";
import type { ApiResponseV2 } from "#/types/api.js";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import ProgramCard from "#/routes/home/programs/-components/ProgramCard.tsx";

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
          <div className="mb-12">
            <h2 className="text-4xl leading-tight font-semibold  md:text-4xl font-pop text-accent text-center">
              Training Programs and Certification Courses
            </h2>
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
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {programs.map((program, index) => (
                      <ProgramCard
                        key={program.id}
                        course={{
                          id: program.id,
                          title: program.title,
                          shortDesc: program.shortDesc,
                          coverImage: program.coverImage,
                        }}
                        index={index}
                        programTitle={program.program?.title ?? "Program"}
                      />
                    ))}
                  </div>

                  <div className="mt-10 flex justify-center">
                    <Link
                      to="/home/programs"
                      className="btn btn-primary btn-xl gap-2 rounded-lg px-8 font-semibold text-accent"
                    >
                      Browse More Courses
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </>
              );
            }}
          </QueryCompLayout>
        </div>
      </div>
    </section>
  );
}
