import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Clock, Copy } from "lucide-react";
import Markdown from "react-markdown";
import apiClient from "#/client/api.ts";
import PageLoader from "#/components/layout/PageLoader.tsx";
import { formatBlogDate, readingTime, type BlogPost } from "#/types/blog.ts";
import ImagelessHeader from "../../-components/headers/ImagelessHeader";

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
      <div className="bg-base-100 px-6 py-16 md:px-16 md:py-20">
        <div className="container mx-auto max-w-6xl">
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
                      className="mt-4 inline-flex items-center gap-1.5  font-medium text-secondary hover:underline"
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
    </>
  );
}

function Article({ post }: { post: BlogPost }) {
  const category = post.tags?.[0]?.tag;

  return (
    <article>
      {/* Back */}
      <Link
        to="/home/blog"
        search={{ page: 1 }}
        className="group mb-8 inline-flex items-center gap-1.5  font-semibold text-base-content/55 transition-colors hover:text-base-content"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to Blog
      </Link>

      {/* Category */}
      {category && (
        <p className="mb-3  font-semibold tracking-[0.18em] text-secondary uppercase">
          {category}
        </p>
      )}

      {/* Title */}
      <h1 className="max-w-3xl text-3xl leading-tight font-semibold text-accent lg:text-[2.6rem]">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="mt-5 mb-10 flex items-center gap-3  text-base-content/45">
        <span>{formatBlogDate(post.createdDate)}</span>
        <span className="inline-block h-1 w-1 rounded-full bg-base-300" />
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {readingTime(post.description)} min read
        </span>
      </div>

      {/* Cover */}
      {post.coverImage && (
        <div className="mb-12 overflow-hidden rounded-2xl bg-base-200 shadow-sm">
          <img
            src={post.coverImage}
            alt={post.title}
            className="max-h-[520px] w-full object-cover"
          />
        </div>
      )}

      {/* Two columns */}
      <div className="items-start gap-x-14 lg:flex">
        {/* Body */}
        <div className="min-w-0 lg:w-[63%]">
          {post.brief && post.brief !== post.title && (
            <p className="mb-6 text-lg leading-relaxed font-medium text-accent">
              {post.brief}
            </p>
          )}
          <div className="prose prose-slate max-w-none prose-headings:font-pop prose-headings:text-accent prose-a:text-secondary prose-strong:text-base-content prose-img:rounded-xl prose-code:text-secondary prose-blockquote:border-primary prose-blockquote:text-base-content/70">
            <Markdown>{post.description}</Markdown>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-base-300 pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="rounded-full bg-secondary/10 px-3 py-1  font-semibold tracking-wide text-secondary uppercase"
                >
                  {tag.tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="mt-12 space-y-5 lg:sticky lg:top-8 lg:mt-0 lg:w-[37%]">
          <ShareCard title={post.title} />
          <NewsletterCard />
        </aside>
      </div>
    </article>
  );
}

function ShareCard({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  function copyLink() {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const links = [
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title)}`,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
    },
  ];

  return (
    <div className="rounded-2xl border border-base-300 p-6">
      <p className="mb-4  font-semibold tracking-[0.18em] text-base-content/40 uppercase">
        Share Article
      </p>
      <div className="grid grid-cols-2 gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-xl border border-base-300 py-2.5  font-medium text-base-content/70 transition-colors hover:bg-base-200"
          >
            {link.label}
          </a>
        ))}
        <button
          type="button"
          onClick={copyLink}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-base-300 py-2.5  font-medium text-base-content/70 transition-colors hover:bg-base-200"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-success" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Link
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function NewsletterCard() {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl bg-accent p-6 text-accent-content">
      <p className="mb-3  font-semibold tracking-[0.18em] text-accent-content/50 uppercase">
        Newsletter
      </p>
      <p className="mb-6 text-xl leading-snug font-semibold">
        Get new articles every week.
      </p>
      <button
        type="button"
        onClick={() => navigate({ to: "/home/blog", search: { page: 1 } })}
        className="w-full rounded-xl bg-base-100 py-3  font-semibold text-accent transition-colors hover:bg-base-200"
      >
        View All Articles
      </button>
    </div>
  );
}
