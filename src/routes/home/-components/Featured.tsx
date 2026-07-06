import { useRef } from "react";
import apiClient from "#/client/api.ts";
import QueryCompLayout from "#/components/layout/QueryCompLayout.tsx";
import type { ApiResponseV2 } from "#/types/api.js";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? track.clientWidth) + 24; // + gap-6
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section>
      {/* Featured programs */}
      <div className="bg-base-100 px-6 py-8 md:px-16">
        <div className="container mx-auto">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              {/*<span className="mb-6 inline-block rounded-full border border-base-content/20 px-4 py-1.5 text-accent bg-secondary/10 font-semibold tracking-[0.18em]  uppercase">
                Featured Programs
              </span>*/}
              <h2 className="text-3xl leading-tight font-semibold  md:text-5xl font-pop text-accent text-center">
                Guardmaster Institute™ Accredited Professional Training Programs
                and Certification Courses
                {/*<em className="italic text-accent">Go places.</em>*/}
              </h2>
            </div>

            <div className="flex items-end justify-between gap-6 md:flex-col md:items-end">
              {/*<p className="max-w-sm text-lg leading-relaxed text-base-content/80">
                Comprehensive Mini-MBA security programs, IFPO certifications,
                and specialized courses — built around global best practices and
                ISO standards.
              </p>*/}
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => scrollByCard(-1)}
                  aria-label="Previous"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-base-300 text-base-content/60 transition-colors hover:border-accent hover:text-accent"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCard(1)}
                  aria-label="Next"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-base-300 text-base-content/60 transition-colors hover:border-accent hover:text-accent"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
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
                <div
                  ref={trackRef}
                  className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {programs.map((program, index) => (
                    <div
                      key={program.id}
                      data-card
                      className="w-[85%] shrink-0 snap-start sm:w-[60%] md:w-[calc((100%-3rem)/3)]"
                    >
                      <ProgramCard
                        course={{
                          id: program.id,
                          title: program.title,
                          shortDesc: program.shortDesc,
                          coverImage: program.coverImage,
                        }}
                        index={index}
                        programTitle={program.program?.title ?? "Program"}
                      />
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
