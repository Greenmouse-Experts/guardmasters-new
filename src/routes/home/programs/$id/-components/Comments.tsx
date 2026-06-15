import { Quote, Star } from "lucide-react";
import type { ReactNode } from "react";
import type { CourseComment } from "#/types/courses.ts";

interface CommentsProps {
  badge: string;
  title: ReactNode;
  description: string;
  comments: CourseComment[];
}

export default function Comments({
  badge,
  title,
  description,
  comments,
}: CommentsProps) {
  return (
    <section
      data-theme="guard"
      className="bg-base-200 px-6 py-20 md:px-16 md:py-28"
    >
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {comments.map((comment) => (
            <figure
              key={comment.id}
              className="flex flex-col border border-base-300 bg-base-100 p-6"
            >
              <Quote className="mb-4 h-6 w-6 shrink-0 text-primary/40" />

              <div className="mb-5 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < comment.rating
                        ? "h-4 w-4 fill-secondary text-secondary"
                        : "h-4 w-4 text-base-content/20"
                    }
                  />
                ))}
              </div>

              <blockquote className="mb-6 leading-relaxed text-base-content/80">
                {comment.body}
              </blockquote>

              <figcaption className="mt-auto flex items-center gap-3 border-t border-base-300 pt-5">
                <img
                  src={comment.avatar}
                  alt={comment.name}
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-accent">{comment.name}</div>
                  <div className="text-xs text-base-content/50">
                    {comment.role} · {comment.date}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
