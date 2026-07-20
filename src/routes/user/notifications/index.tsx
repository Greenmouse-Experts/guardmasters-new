import { useState } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCheck, Inbox } from "lucide-react";
import { toast } from "sonner";
import apiClient from "#/client/api.ts";
import PageLoader from "#/components/layout/PageLoader.tsx";
import { PagerButton } from "#/components/PagerButton.tsx";
import { usePagination } from "#/hooks/usePagination.ts";
import { extract_message } from "#/helpers/apihelpers.tsx";
import type { ApiResponseV2 } from "#/types/api.js";

export const Route = createFileRoute("/user/notifications/")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { page: number } => ({
    page: Number(search.page) || 1,
  }),
});

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdDate: string;
}

type Tab = "all" | "unread";

function RouteComponent() {
  const [tab, setTab] = useState<Tab>("all");
  const { page, setPage, hasPrev, hasNext, totalPages } = usePagination();
  const queryClient = useQueryClient();

  const endpoint =
    tab === "unread" ? "notifications/unread" : "notifications/read";

  const query = useQuery<ApiResponseV2<Notification[]>>({
    queryKey: ["notifications", tab, page],
    queryFn: async () => {
      const resp = await apiClient.get(endpoint, { params: { page } });
      return resp.data;
    },
    placeholderData: keepPreviousData,
  });

  const markAllMutation = useMutation({
    mutationFn: () => apiClient.patch("notifications/mark-all-as-read"),
    onSuccess: () => {
      toast.success("All notifications marked as read");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (err) => toast.error(extract_message(err)),
  });

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-accent">Notifications</h1>
        <button
          type="button"
          onClick={() => markAllMutation.mutate()}
          disabled={markAllMutation.isPending}
          className="flex items-center gap-1.5  font-medium text-accent hover:text-accent/70 disabled:opacity-50"
        >
          <CheckCheck className="h-4 w-4" />
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-1 rounded-lg border border-base-300 bg-base-200 p-1">
        <TabButton active={tab === "all"} onClick={() => setTab("all")}>
          All
        </TabButton>
        <TabButton active={tab === "unread"} onClick={() => setTab("unread")}>
          Unread
        </TabButton>
      </div>

      <PageLoader query={query} loadingText="Loading notifications...">
        {(data) => {
          const items = data.data ?? [];

          if (items.length === 0) {
            return (
              <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-base-200 text-secondary">
                  <Inbox className="h-8 w-8" />
                </span>
                <p className="text-base-content/55">No notification yet</p>
              </div>
            );
          }

          return (
            <>
              <ul className="space-y-3">
                {items.map((item) => (
                  <NotificationItem key={item.id} item={item} />
                ))}
              </ul>

              <div className="flex items-center justify-end gap-4">
                <p className=" text-base-content/60">
                  Page {page} of {totalPages(data.count)}
                </p>
                <div className="flex gap-2">
                  <PagerButton
                    label="Prev"
                    disabled={!hasPrev}
                    onClick={() => setPage(page - 1)}
                  />
                  <PagerButton
                    label="Next"
                    disabled={!hasNext(data.count)}
                    onClick={() => setPage(page + 1)}
                  />
                </div>
              </div>
            </>
          );
        }}
      </PageLoader>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md py-2.5  font-medium transition-colors ${
        active
          ? "bg-accent text-accent-content"
          : "text-base-content/60 hover:text-base-content"
      }`}
    >
      {children}
    </button>
  );
}

function NotificationItem({ item }: { item: Notification }) {
  const queryClient = useQueryClient();

  const markRead = useMutation({
    mutationFn: () => apiClient.patch(`notifications/mark-as-read/${item.id}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
    onError: (err) => toast.error(extract_message(err)),
  });

  return (
    <li
      className={`rounded-lg border p-4 ${
        item.isRead
          ? "border-base-300 bg-base-100"
          : "border-secondary/30 bg-secondary/5"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-medium text-accent">{item.title}</p>
          <p className="mt-1  leading-relaxed text-base-content/60">
            {item.message}
          </p>
        </div>
        {!item.isRead && (
          <button
            type="button"
            onClick={() => markRead.mutate()}
            disabled={markRead.isPending}
            aria-label="Mark as read"
            className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-secondary transition-opacity hover:opacity-60 disabled:opacity-40"
          />
        )}
      </div>
      <p className="mt-3 text-xs text-base-content/40">
        {new Date(item.createdDate).toLocaleString(undefined, {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </li>
  );
}
