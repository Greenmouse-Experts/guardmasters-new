import { useRef } from "react";
import apiClient from "#/client/api.ts";
import QueryCompLayout from "#/components/layout/QueryCompLayout.tsx";
import type { ApiResponseV2 } from "#/types/api.js";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

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
              <span className="mb-6 inline-block rounded-full border border-base-content/20 px-4 py-1.5 text-accent bg-secondary/20 font-bold tracking-[0.18em]  uppercase">
                Featured Programs
              </span>
              <h2 className="text-4xl leading-tight font-light text-accent md:text-5xl">
                Start here. <em className="italic text-accent">Go places.</em>
              </h2>
            </div>

            <div className="flex items-end justify-between gap-6 md:flex-col md:items-end">
              <p className="max-w-sm text-sm leading-relaxed text-base-content/60">
                Comprehensive Mini-MBA security programs, IFPO certifications,
                and specialized courses — built around global best practices and
                ISO standards.
              </p>
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
                      className="group flex w-[85%] shrink-0 snap-start flex-col rounded-2xl bg-accent p-6 text-center text-accent-content transition-shadow hover:shadow-lg sm:w-[60%] md:w-[calc((100%-3rem)/3)]"
                    >
                      <div className="mb-5 text-left text-[11px] font-medium tracking-[0.15em] text-accent-content/50 uppercase">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {program.program?.title ?? "Program"}
                      </div>

                      <div className="mb-6 overflow-hidden rounded-xl bg-accent-content/10">
                        {program.coverImage && (
                          <img
                            src={program.coverImage}
                            alt={program.title}
                            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>

                      <h3 className="mb-4 line-clamp-2 text-2xl leading-tight font-light text-accent-content">
                        {program.title}
                      </h3>
                      <p className="mb-8 line-clamp-3 text-sm leading-relaxed text-accent-content/60">
                        {program.shortDesc}
                      </p>

                      <div className="mb-6 flex items-center justify-center gap-2">
                        <img
                          src="/course_logo.png"
                          alt=""
                          className="h-7 w-7 rounded-full object-cover object-left"
                        />
                        <span className="text-sm font-medium text-accent-content/80">
                          Guardmaster Institute Canada<sup>™</sup>
                        </span>
                      </div>

                      <div className="mb-6 text-2xl font-semibold">
                        {program.discountPriceFormat ??
                          program.originalPriceFormat}
                      </div>

                      <Link
                        to="/home/programs/$id"
                        params={{ id: program.id }}
                        className="btn btn-block mt-auto h-auto justify-center gap-2 rounded-md border-none bg-primary py-3.5 font-medium text-primary-content hover:bg-primary/90"
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
