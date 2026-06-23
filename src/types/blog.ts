export interface BlogTag {
  id: string;
  tag: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  brief: string;
  coverImage: string;
  createdDate: string;
  tags: BlogTag[];
}

export function formatBlogDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function readingTime(text: string) {
  const words = text?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  return Math.max(1, Math.ceil(words / 200));
}
