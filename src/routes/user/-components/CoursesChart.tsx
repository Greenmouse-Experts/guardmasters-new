import { Network } from "lucide-react";

interface Slice {
  label: string;
  value: number;
  color: string;
}

const slices: Slice[] = [
  { label: "In Progress", value: 25, color: "#0b1b3a" },
  { label: "Completed", value: 35, color: "#f59e0b" },
  { label: "Not Started", value: 20, color: "#2563eb" },
  { label: "Certified", value: 8, color: "#009688" },
  { label: "Archived", value: 12, color: "#e11d6f" },
];

export default function CoursesChart() {
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
    <div className="rounded-lg border border-base-300 bg-base-100 p-6">
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

      <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
        <div
          className="h-52 w-52 rounded-full"
          style={{ background: `conic-gradient(${gradient})` }}
          role="img"
          aria-label="Courses progress pie chart"
        />
        <ul className="space-y-2">
          {slices.map((slice) => (
            <li key={slice.label} className="flex items-center gap-2 text-sm">
              <span
                className="h-3 w-3 rounded-sm"
                style={{ background: slice.color }}
              />
              <span className="text-base-content/70">{slice.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
