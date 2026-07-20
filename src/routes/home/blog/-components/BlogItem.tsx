import { Link } from "@tanstack/react-router";
import { formatBlogDate, readingTime, type BlogPost } from "#/types/blog.ts";

export default function BlogItem({ post }: { post: BlogPost }) {
  const category = post.tags?.[0]?.tag;

  return (
    <Link
      to="/home/blog/$id"
      params={{ id: post.id }}
      className="group flex flex-col"
    >
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-base-200">
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      <div className="mt-5">
        {category && (
          <p className="text-xs font-semibold tracking-[0.12em] text-secondary uppercase">
            {category}
          </p>
        )}
        <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-accent group-hover:underline">
          {post.title}
        </h3>
        <p className="mt-3  text-base-content/50">
          {formatBlogDate(post.createdDate)} • {readingTime(post.description)}{" "}
          min read
        </p>
      </div>
    </Link>
  );
}
