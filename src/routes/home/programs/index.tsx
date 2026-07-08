import { createFileRoute } from "@tanstack/react-router";
import ImagelessHeader from "../-components/headers/ImagelessHeader";
import ProgramCard from "./-components/ProgramCard";
import { useQuery } from "@tanstack/react-query";
import apiClient from "#/client/api.ts";
import PageLoader from "#/components/layout/PageLoader.tsx";
import type { ApiResponseV2 } from "#/types/api.js";
import type { CourseProgram } from "#/types/courses.ts";

export const Route = createFileRoute("/home/programs/")({
  validateSearch: (search: Record<string, unknown>) => ({
    search: typeof search.search === "string" ? search.search : "",
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { search } = Route.useSearch();

  const query = useQuery<ApiResponseV2<CourseProgram[]>>({
    queryKey: ["programs", search],
    queryFn: async () => {
      const params = new URLSearchParams({ page: "1" });
      if (search) params.set("search", search);
      let resp = await apiClient.get(`/programs/public?${params}`);
      return resp.data;
    },
  });
  return (
    <>
      <ImagelessHeader
        title={
          <>
            Start here. Get certified.{" "}
            <span className="text-primary italic">Go places.</span>
          </>
        }
        description="Programs aligned with IFPO, ASIS, ChLPS, and ISO frameworks — developed for
        relevance, credibility, and career advancement."
        badge="training & certification"
      />
      <PageLoader query={query}>
        {(resp) => {
          return (
            <>
              <div className="container mx-auto px-6 py-16 md:px-16">
                {resp.data.map((program) => (
                  <section key={program.id} className="mb-20 last:mb-0">
                    <h2 className="mb-8 text-3xl font-medium leading-tight text-gray-900 md:text-4xl">
                      {program.title}
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {program.courses.map((course, index) => (
                        <ProgramCard
                          key={course.id}
                          course={course}
                          index={index}
                          programTitle={program.title}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </>
          );
        }}
      </PageLoader>
    </>
  );
}
