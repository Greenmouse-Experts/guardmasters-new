import apiClient from "#/client/api.ts";
import QueryCompLayout from "#/components/layout/QueryCompLayout.tsx";
import type { ApiResponseV2 } from "#/types/api.js";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";

interface ReviewUser {
  firstName?: string;
  lastName?: string;
  picture?: string;
}

interface ReviewItem {
  id: string;
  rating: number | string;
  comment: string;
  user?: ReviewUser;
  createdDate?: string;
}

interface ReviewsData {
  results: ReviewItem[];
  totalRating: string;
  avgRating: string;
}

interface CommentsProps {
  badge: string;
  title: ReactNode;
  description: string;
  courseId: string;
}

export default function Comments({
  badge,
  title,
  description,
  courseId,
}: CommentsProps) {
  const query = useQuery<ApiResponseV2<ReviewsData>>({
    queryKey: ["reviews", courseId],
    queryFn: async () => {
      const resp = await apiClient.get(
        `reviews/fetch-course-reviews/${courseId}`,
      );
      return resp.data;
    },
  });

  return (
    <section className="relative overflow-hidden bg-base-200 px-6 py-20 md:px-16 md:py-28">
      {/* Decorative backdrop */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5" />

      <div className="relative container mx-auto">
        <QueryCompLayout query={query} loadingText="Loading reviews...">
          {(resp) => (
            <ReviewsCarousel
              badge={badge}
              title={title}
              description={description}
              results={resp.data?.results ?? []}
            />
          )}
        </QueryCompLayout>
      </div>
    </section>
  );
}

function ReviewsCarousel({
  badge,
  title,
  description,
  results,
}: {
  badge: string;
  title: ReactNode;
  description: string;
  results: ReviewItem[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
  });
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelected(api.selectedScrollSnap());
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const hasReviews = results.length > 0;

  return (
    <>
      {/* Header */}
      <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="mb-8 inline-block rounded-full border border-base-content/15 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
            {badge}
          </span>

          <h2 className="mb-6 font-pop text-4xl leading-tight font-bold text-accent md:text-6xl">
            {title}
          </h2>

          <p className="leading-relaxed text-lg">{description}</p>
        </div>

        {hasReviews && (
          <div className="flex shrink-0 items-center gap-6">
            <span className="font-pop text-sm font-bold tracking-widest text-base-content/50">
              {String(selected + 1).padStart(2, "0")}
              <span className="text-base-content/30">
                {" "}
                / {String(results.length).padStart(2, "0")}
              </span>
            </span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canPrev}
                aria-label="Previous"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-base-content/20 text-accent transition hover:bg-accent hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-accent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canNext}
                aria-label="Next"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-base-content/20 text-accent transition hover:bg-accent hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-accent"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Carousel */}
      {hasReviews && (
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {results.map((review) => {
              const name =
                [review.user?.firstName, review.user?.lastName]
                  .filter(Boolean)
                  .join(" ") || "Anonymous";
              const initials =
                `${review.user?.firstName?.[0] ?? ""}${review.user?.lastName?.[0] ?? ""}`.toUpperCase() ||
                "A";
              const rating = Number(review.rating) || 0;
              const date = review.createdDate
                ? new Date(review.createdDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })
                : "";

              return (
                <div
                  key={review.id}
                  className="min-w-0 flex-[0_0_100%] pr-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <figure className="flex h-full flex-col rounded-2xl border-t-2 border-primary bg-base-100 p-6 shadow-sm">
                    <div className="mb-6 flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-accent">
                        <Quote className="h-4 w-4 fill-current" />
                      </span>
                      <div className="flex items-center gap-1.5 text-sm text-accent font-bold">
                        <Star className="h-4 w-4 fill-primary stroke-primary text-accent" />
                        {rating.toFixed(1)}
                      </div>
                    </div>

                    <blockquote className="mb-6 leading-relaxed  text-xl">
                      &ldquo;{review.comment}&rdquo;
                    </blockquote>

                    <figcaption className="mt-auto flex items-center gap-3 border-t border-base-300 pt-5">
                      {review.user?.picture ? (
                        <img
                          src={review.user.picture}
                          alt={name}
                          className="h-11 w-11 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                          {initials}
                        </span>
                      )}
                      <div>
                        <div className="font-semibold text-accent">{name}</div>
                        {date && <div className="">{date}</div>}
                      </div>
                    </figcaption>
                  </figure>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
