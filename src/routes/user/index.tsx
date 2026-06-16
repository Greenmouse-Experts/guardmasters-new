import { createFileRoute } from "@tanstack/react-router";
import { FileText, BookOpen, Medal } from "lucide-react";
import StatCard from "./-components/StatCard";
import ActivityTimeline from "./-components/ActivityTimeline";
import CoursesChart from "./-components/CoursesChart";
import ReviewBanner from "./-components/ReviewBanner";

export const Route = createFileRoute("/user/")({
  component: RouteComponent,
});

const stats = [
  { icon: FileText, value: 1, label: "No of Subscribed Programs" },
  { icon: BookOpen, value: 10, label: "Total Courses" },
  { icon: Medal, value: 2, label: "Completed Courses" },
];

function RouteComponent() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <h1 className="text-2xl font-semibold text-accent">My Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ActivityTimeline />
        <CoursesChart />
      </div>

      <ReviewBanner />
    </div>
  );
}
