import { createFileRoute } from "@tanstack/react-router";
import ProgramCard from "./-components/ProgramCard";
import { useQuery } from "@tanstack/react-query";
import apiClient from "#/client/api.ts";
import PageLoader from "#/components/layout/PageLoader.tsx";
import type { ApiResponseV2 } from "#/types/api.js";
import type { CourseProgram } from "#/types/courses.ts";
import SimpleHero from "./-components/SimpleHero";
import { useEffect } from "react";

export const Route = createFileRoute("/home/programs/")({
  validateSearch: (search: Record<string, unknown>) => ({
    search: typeof search.search === "string" ? search.search : "",
    programId: typeof search.programId === "string" ? search.programId : "",
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { search, programId } = Route.useSearch();

  const query = useQuery<ApiResponseV2<CourseProgram[]>>({
    queryKey: ["programs", search],
    queryFn: async () => {
      const params = new URLSearchParams({ page: "1" });
      if (search) params.set("search", search);
      let resp = await apiClient.get(`/programs/public?${params}`);
      return resp.data;
    },
  });

  // Scroll to the selected program once its section is in the DOM
  // (sections only render after the query resolves).
  useEffect(() => {
    if (!programId || !query.data) return;
    const el = document.getElementById(programId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [programId, query.data]);
  return (
    <>
      <SimpleHero
        title={
          <>
            Training Programs{" "}
            <span className="text-white">and Certification Courses.</span>
          </>
        }
        description="Explore accredited security training and certification courses designed to strengthen your expertise and prepare you for greater career opportunities."
      />
      <PageLoader query={query}>
        {(resp) => {
          return (
            <>
              <section className="py-8 bg-base-100 mt-4">
                <div id="programs" className=" mx-auto  py-16 ">
                  {resp.data.map((program) => (
                    <section
                      id={program.id}
                      key={program.id}
                      className="mb-20 last:mb-0"
                    >
                      <h2 className="container mx-auto mb-8 text-3xl font-medium leading-tight text-accent md:text-4xl">
                        {program.title}
                      </h2>
                      <section className="py-8  bg-accent mt-4">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 container mx-auto py-8">
                          {program.courses.map((course, index) => (
                            <ProgramCard
                              outline
                              key={course.id}
                              course={course}
                              index={index}
                              programTitle={program.title}
                            />
                          ))}
                        </div>
                      </section>
                    </section>
                  ))}
                </div>
              </section>
            </>
          );
        }}
      </PageLoader>
    </>
  );
}
