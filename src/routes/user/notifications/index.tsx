import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Inbox } from "lucide-react";
import apiClient from "#/client/api.ts";
import PageLoader from "#/components/layout/PageLoader.tsx";
import { PagerButton } from "#/components/PagerButton.tsx";
import { usePagination } from "#/hooks/usePagination.ts";
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

  const query = useQuery<ApiResponseV2<Notification[]>>({
    queryKey: ["notifications", tab, page],
    queryFn: async () => {
      const resp = await apiClient.get("notifications/student", {
        params: { page, ...(tab === "unread" ? { read: false } : {}) },
      });
      return resp.data;
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="text-2xl font-semibold text-accent">Notifications</h1>

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
                <p className="text-sm text-base-content/60">
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
      className={`rounded-md py-2.5 text-sm font-medium transition-colors ${
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
          <p className="mt-1 text-sm leading-relaxed text-base-content/60">
            {item.message}
          </p>
        </div>
        {!item.isRead && (
          <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-secondary" />
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
