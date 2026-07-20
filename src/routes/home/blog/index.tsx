import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import apiClient from "#/client/api.ts";
import PageLoader from "#/components/layout/PageLoader.tsx";
import { usePagination } from "#/hooks/usePagination.ts";
import {
  formatBlogDate,
  readingTime,
  type BlogPost,
  type BlogTag,
} from "#/types/blog.ts";
import BlogItem from "./-components/BlogItem";
import type { ApiResponseV2 } from "#/types/api.js";
import ImagelessHeader from "../-components/headers/ImagelessHeader";

const PAGE_SIZE = 6;

export const Route = createFileRoute("/home/blog/")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { page: number } => ({
    page: Number(search.page) || 1,
  }),
});

function RouteComponent() {
  const query = useQuery<ApiResponseV2<BlogPost[]>>({
    queryKey: ["blogs"],
    queryFn: async () => {
      let resp = await apiClient.get("/blog/view-posts");
      return resp.data;
    },
  });

  return (
    <>
      <ImagelessHeader
        badge="News & Insights"
        title={
          <>
            Stay Informed, <em className="italic text-primary">Stay Ahead</em>
          </>
        }
        description="Expert insights, industry news, and practical guidance from the Guardmaster Institute community of security and risk professionals."
      />
      <div className="bg-base-100 px-6 py-16 md:px-16 md:py-24">
        <div className="container mx-auto">
          <PageLoader query={query} loadingText="Loading articles...">
            {(posts) => <BlogContent posts={posts.data ?? []} />}
          </PageLoader>
        </div>
      </div>
    </>
  );
}

function BlogContent({ posts }: { posts: BlogPost[] }) {
  const { page, setPage, totalPages } = usePagination(PAGE_SIZE);
  const [activeSlug, setActiveSlug] = useState<string>("all");

  // Unique categories across all posts.
  const categories = useMemo(() => {
    const map = new Map<string, BlogTag>();
    posts.forEach((p) => p.tags?.forEach((t) => map.set(t.slug, t)));
    return Array.from(map.values());
  }, [posts]);

  const filtered = useMemo(
    () =>
      activeSlug === "all"
        ? posts
        : posts.filter((p) => p.tags?.some((t) => t.slug === activeSlug)),
    [posts, activeSlug],
  );

  // Reset to the first page whenever the filter changes.
  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlug]);

  const featured = posts[0];
  const pageCount = totalPages(filtered.length);
  const start = (page - 1) * PAGE_SIZE;
  const paged = filtered.slice(start, start + PAGE_SIZE);

  if (posts.length === 0) {
    return (
      <p className="py-20 text-center text-base-content/55">
        No articles published yet. Check back soon.
      </p>
    );
  }

  return (
    <div className="space-y-20">
      {featured && <Featured post={featured} />}

      {/* Feed */}
      <div>
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className=" font-semibold tracking-[0.18em] text-base-content/45 uppercase">
              Blog feed
            </p>
            <h2 className="mt-1 text-3xl font-semibold text-accent">
              Latest Articles
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <FilterPill
              label="All"
              active={activeSlug === "all"}
              onClick={() => setActiveSlug("all")}
            />
            {categories.map((cat) => (
              <FilterPill
                key={cat.slug}
                label={cat.tag}
                active={activeSlug === cat.slug}
                onClick={() => setActiveSlug(cat.slug)}
              />
            ))}
          </div>
        </div>

        {paged.length === 0 ? (
          <p className="py-16 text-center text-base-content/50">
            No articles in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((post) => (
              <BlogItem key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-14 flex items-center justify-center gap-6 ">
          <button
            type="button"
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
            className="rounded-md px-4 py-2 font-medium text-base-content/60 transition-colors hover:text-base-content disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Prev
          </button>
          <span className="text-base-content/50">Page {page}</span>
          <button
            type="button"
            onClick={() => setPage(page + 1)}
            disabled={page >= pageCount}
            className="rounded-md bg-accent px-5 py-2 font-medium text-accent-content transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

function Featured({ post }: { post: BlogPost }) {
  const category = post.tags?.[0]?.tag;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
      <div>
        <span className="inline-block rounded-full border border-base-content/15 px-3 py-1  font-medium text-base-content/60">
          Featured Post
        </span>

        {category && (
          <p className="mt-6  font-semibold tracking-[0.12em] text-secondary uppercase">
            {category}
          </p>
        )}

        <h1 className="mt-3 text-4xl leading-tight font-semibold text-accent md:text-5xl">
          {post.title}
        </h1>

        <p className="mt-5 line-clamp-3 leading-relaxed text-base-content/55">
          {post.description}
        </p>

        <div className="mt-6 flex items-center gap-5  text-base-content/45">
          <span>{formatBlogDate(post.createdDate)}</span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {readingTime(post.description)} min read
          </span>
        </div>

        <Link
          to="/home/blog/$id"
          params={{ id: post.id }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3  font-medium text-accent-content transition-colors hover:bg-accent/90"
        >
          Read Article
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <Link
        to="/home/blog/$id"
        params={{ id: post.id }}
        className="relative block aspect-[3/2] overflow-hidden rounded-2xl bg-base-200"
      >
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute bottom-5 left-5 max-w-xs rounded-lg bg-base-100/85 p-4 backdrop-blur-sm">
          <p className=" font-medium tracking-wide text-base-content/50 uppercase">
            Trending Topic
          </p>
          <p className="mt-1 line-clamp-2  font-semibold text-accent">
            {post.title}
          </p>
        </div>
      </Link>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5  font-medium transition-colors ${
        active
          ? "bg-accent text-accent-content"
          : "bg-base-200 text-base-content/70 hover:bg-base-300"
      }`}
    >
      {label}
    </button>
  );
}
