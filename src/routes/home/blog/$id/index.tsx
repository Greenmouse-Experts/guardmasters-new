import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import apiClient from "#/client/api.ts";
import PageLoader from "#/components/layout/PageLoader.tsx";
import type { ApiResponse } from "#/types/api.js";
import { formatBlogDate, readingTime, type BlogPost } from "#/types/blog.ts";

export const Route = createFileRoute("/home/blog/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const query = useQuery<BlogPost>({
    queryKey: ["blog", id],
    queryFn: async () => {
      let resp = await apiClient.get(`/blog/view-post/${id}`);
      return resp.data;
    },
  });

  return (
    <div className="bg-base-100 px-6 py-16 md:px-16 md:py-24">
      <div className="container mx-auto max-w-3xl">
        <PageLoader query={query} loadingText="Loading article...">
          {(resp) => {
            const post = resp;

            if (!post) {
              return (
                <div className="py-20 text-center">
                  <p className="text-base-content/55">Article not found.</p>
                  <Link
                    to="/home/blog"
                    search={{ page: 1 }}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to blog
                  </Link>
                </div>
              );
            }

            return <Article post={post} />;
          }}
        </PageLoader>
      </div>
    </div>
  );
}

function Article({ post }: { post: BlogPost }) {
  return (
    <article>
      <Link
        to="/home/blog"
        search={{ page: 1 }}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-base-content/55 hover:text-base-content"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>

      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags?.map((tag) => (
          <span
            key={tag.id}
            className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold tracking-wide text-secondary uppercase"
          >
            {tag.tag}
          </span>
        ))}
      </div>

      <h1 className="mt-5 text-3xl leading-tight font-bold text-accent md:text-4xl">
        {post.title}
      </h1>

      <div className="mt-4 flex items-center gap-5 text-sm text-base-content/45">
        <span>{formatBlogDate(post.createdDate)}</span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {readingTime(post.description)} min read
        </span>
      </div>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover"
        />
      )}

      <div className="mt-8 space-y-4 leading-relaxed whitespace-pre-line text-base-content/70">
        {post.description}
      </div>
    </article>
  );
}
