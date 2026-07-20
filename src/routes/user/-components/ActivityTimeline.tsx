import apiClient from "#/client/api.ts";
import QueryCompLayout from "#/components/layout/QueryCompLayout.tsx";
import { useQuery } from "@tanstack/react-query";
import {
  Award,
  Bell,
  CheckCircle2,
  ClipboardList,
  DollarSign,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

type ActivityType =
  | "payment"
  | "assessment"
  | "order_confirmed"
  | "order_created"
  | "certificate";

type ACTIVITY = {
  type: ActivityType;
  description?: string;
  amount?: number;
  title: string;
  timestamp: string;
};

type ActivityResponse = ACTIVITY[];

// Icon + colour per activity type.
const typeMeta: Record<ActivityType, { icon: LucideIcon; tone: string }> = {
  payment: { icon: DollarSign, tone: "bg-success/10 text-success" },
  assessment: { icon: ClipboardList, tone: "bg-secondary/10 text-secondary" },
  order_confirmed: { icon: CheckCircle2, tone: "bg-success/10 text-success" },
  order_created: { icon: ShoppingCart, tone: "bg-primary/10 text-primary" },
  certificate: { icon: Award, tone: "bg-warning/10 text-warning" },
};

function formatTime(timestamp: string) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return timestamp;
  return date
    .toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();
}

export default function ActivityTimeline() {
  const query = useQuery<ActivityResponse>({
    queryKey: ["activities"],
    queryFn: async () => {
      let resp = await apiClient.get("/orders/activity-timeline");
      return resp.data;
    },
  });
  return (
    <div className="rounded-lg border border-base-300 bg-base-100 p-6">
      <h2 className="mb-6 text-lg font-semibold text-accent">
        Activity Timeline
      </h2>
      <ul className="space-y-3">
        <QueryCompLayout query={query}>
          {(resp) => {
            const activities: ActivityResponse = resp ?? [];

            if (activities.length === 0) {
              return (
                <li className="flex flex-col items-center gap-3 py-12 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-base-200 text-base-content/40">
                    <Bell className="h-5 w-5" />
                  </span>
                  <p className=" text-base-content/50">
                    No recent activity yet.
                  </p>
                </li>
              );
            }

            return (
              <>
                {activities.slice(0, 5).map((activity, index) => {
                  const meta = typeMeta[activity.type] ?? {
                    icon: Bell,
                    tone: "bg-base-300 text-base-content/60",
                  };
                  const Icon = meta.icon;
                  return (
                    <li
                      key={`${activity.timestamp}-${index}`}
                      className="relative rounded-lg border border-base-300 p-4"
                    >
                      {index < activities.length - 1 && (
                        <span className="absolute top-full left-9 h-3 w-px bg-base-300" />
                      )}
                      <div className="flex items-center gap-4">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${meta.tone}`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-medium text-accent wrap-anywhere">
                            {activity.title}
                          </p>
                          {activity.description && (
                            <p className=" text-base-content/60">
                              {activity.description}
                            </p>
                          )}
                          <p className=" text-base-content/50">
                            {formatTime(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </>
            );
          }}
        </QueryCompLayout>
      </ul>
    </div>
  );
}
