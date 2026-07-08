import apiClient from "#/client/api.ts";
import QueryCompLayout from "#/components/layout/QueryCompLayout.tsx";
import type { ApiResponseV2 } from "#/types/api.js";
import { useQuery } from "@tanstack/react-query";
import { Quote, Star } from "lucide-react";
import type { ReactNode } from "react";

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
    <section className="bg-base-200 px-6 py-20 md:px-16 md:py-28">
      <div className="container mx-auto">
        <div className="mb-12 max-w-2xl">
          <span className="mb-8 inline-block rounded-full border border-base-content/15 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
            {badge}
          </span>

          <h2 className="mb-6 text-4xl leading-tight font-light text-accent md:text-5xl">
            {title}
          </h2>

          <p className="leading-relaxed text-base-content/50">{description}</p>
        </div>

        <QueryCompLayout query={query} loadingText="Loading reviews...">
          {(resp) => {
            const results = resp.data?.results ?? [];

            if (results.length === 0) return null;

            return (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                    <figure
                      key={review.id}
                      className="flex flex-col border border-base-300 bg-base-100 p-6"
                    >
                      <Quote className="mb-4 h-6 w-6 shrink-0 text-primary/40" />

                      <div className="mb-5 flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={
                              i < Math.round(rating)
                                ? "h-4 w-4 fill-secondary text-secondary"
                                : "h-4 w-4 text-base-content/20"
                            }
                          />
                        ))}
                      </div>

                      <blockquote className="mb-6 leading-relaxed text-base-content/80">
                        {review.comment}
                      </blockquote>

                      <figcaption className="mt-auto flex items-center gap-3 border-t border-base-300 pt-5">
                        {review.user?.picture ? (
                          <img
                            src={review.user.picture}
                            alt={name}
                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-sm font-semibold text-secondary">
                            {initials}
                          </span>
                        )}
                        <div>
                          <div className="font-medium text-accent">{name}</div>
                          {date && (
                            <div className="text-xs text-base-content/50">
                              {date}
                            </div>
                          )}
                        </div>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            );
          }}
        </QueryCompLayout>
      </div>
    </section>
  );
}
