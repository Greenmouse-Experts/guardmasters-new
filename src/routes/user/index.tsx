import { createFileRoute } from "@tanstack/react-router";
import { FileText, BookOpen, Medal, type LucideIcon } from "lucide-react";
import StatCard from "./-components/StatCard";
import ActivityTimeline from "./-components/ActivityTimeline";
import CoursesChart from "./-components/CoursesChart";
import ReviewBanner from "./-components/ReviewBanner";
import { useQuery } from "@tanstack/react-query";
import apiClient from "#/client/api.ts";
import QueryCompLayout from "#/components/layout/QueryCompLayout.tsx";

export const Route = createFileRoute("/user/")({
  component: RouteComponent,
});

interface Analytics {
  subscribedPrograms: number;
  totalCourses: number;
  completedCourses: number;
}

// Map each analytics field to its icon and a readable label.
const statMeta: Record<keyof Analytics, { icon: LucideIcon; label: string }> = {
  subscribedPrograms: { icon: FileText, label: "No of Subscribed Programs" },
  totalCourses: { icon: BookOpen, label: "Total Courses" },
  completedCourses: { icon: Medal, label: "Completed Courses" },
};

function RouteComponent() {
  const query = useQuery<Analytics>({
    queryKey: ["orders/analytics"],
    queryFn: async () => {
      let resp = await apiClient.get("/orders/analytics");
      return resp.data;
    },
  });
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <h1 className="text-2xl font-semibold text-accent">My Dashboard</h1>

      <QueryCompLayout query={query}>
        {(data) => {
          const stats_array = (
            Object.keys(statMeta) as (keyof Analytics)[]
          ).map((key) => ({
            icon: statMeta[key].icon,
            label: statMeta[key].label,
            value: data[key] ?? 0,
          }));
          return (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {stats_array.map((stat) => (
                  <StatCard
                    key={stat.label}
                    icon={stat.icon}
                    value={stat.value}
                    label={stat.label}
                  />
                ))}
              </div>
            </>
          );
        }}
      </QueryCompLayout>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ActivityTimeline />
        <CoursesChart />
      </div>

      <ReviewBanner />
    </div>
  );
}
