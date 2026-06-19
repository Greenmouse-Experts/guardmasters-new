import apiClient from "#/client/api.ts";
import QueryCompLayout from "#/components/layout/QueryCompLayout.tsx";
import { useQuery } from "@tanstack/react-query";
import { Network } from "lucide-react";

interface CourseBreakdown {
  notStarted: number;
  inProgress: number;
  completed: number;
  certified: number;
}

// Label + colour for each status field returned by the API.
const statusMeta: {
  key: keyof CourseBreakdown;
  label: string;
  color: string;
}[] = [
  { key: "notStarted", label: "Not Started", color: "#2563eb" },
  { key: "inProgress", label: "In Progress", color: "#0b1b3a" },
  { key: "completed", label: "Completed", color: "#f59e0b" },
  { key: "certified", label: "Certified", color: "#009688" },
];

export default function CoursesChart() {
  const query = useQuery<CourseBreakdown>({
    queryKey: ["chart"],
    queryFn: async () => {
      let resp = await apiClient.get("/orders/course-status-breakdown");
      return resp.data;
    },
  });

  return (
    <div className="flex h-full flex-col rounded-lg border border-base-300 bg-base-100 p-6">
      <div className="mb-6 flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-accent text-accent-content">
          <Network className="h-6 w-6" />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-accent">Courses Chart</h2>
          <p className="text-sm text-base-content/55">
            Visualize your course progress with real time analytic.
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <QueryCompLayout query={query}>
        {(data) => {
          const slices = statusMeta.map((meta) => ({
            label: meta.label,
            color: meta.color,
            value: data[meta.key] ?? 0,
          }));
          const total = slices.reduce((sum, s) => sum + s.value, 0);

          let cursor = 0;
          const gradient = slices
            .map((slice) => {
              const start = (cursor / total) * 360;
              cursor += slice.value;
              const end = (cursor / total) * 360;
              return `${slice.color} ${start}deg ${end}deg`;
            })
            .join(", ");

          return (
            <div className="flex flex-1 flex-col items-center justify-center gap-8 sm:flex-row sm:justify-around">
              <div
                className="aspect-square w-full max-w-[18rem] shrink-0 rounded-full bg-base-200"
                style={
                  total > 0
                    ? { background: `conic-gradient(${gradient})` }
                    : undefined
                }
                role="img"
                aria-label="Courses progress pie chart"
              />
              <ul className="w-full max-w-xs space-y-2 sm:w-auto">
                {slices.map((slice) => (
                  <li
                    key={slice.label}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span
                      className="h-3 w-3 rounded-sm"
                      style={{ background: slice.color }}
                    />
                    <span className="text-base-content/70">{slice.label}</span>
                    <span className="ml-auto font-medium text-accent">
                      {slice.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
        </QueryCompLayout>
      </div>
    </div>
  );
}
