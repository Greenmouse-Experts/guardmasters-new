import { useNavigate, useSearch } from "@tanstack/react-router";

const DEFAULT_PAGE_SIZE = 10;

/**
 * URL-driven pagination. Reads `?page=` from the current route's search params
 * and writes back to it, so pagination state survives reloads and is shareable.
 * Works on any route whose `validateSearch` exposes an optional `page` number.
 */
export function usePagination(pageSize = DEFAULT_PAGE_SIZE) {
  const navigate = useNavigate();
  const { page = 1 } = useSearch({ strict: false }) as { page?: number };

  const goToPage = (next: number) =>
    navigate({
      to: ".",
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        page: Math.max(1, next),
      }),
    });

  /** Total pages given a record count from the server. */
  const totalPages = (count: number) => Math.max(1, Math.ceil(count / pageSize));

  return {
    page,
    pageSize,
    setPage: goToPage,
    nextPage: () => goToPage(page + 1),
    prevPage: () => goToPage(page - 1),
    hasPrev: page > 1,
    hasNext: (count: number) => page * pageSize < count,
    totalPages,
  };
}
