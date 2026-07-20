import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
}

export default function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-base-300 bg-base-100 p-5">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-accent text-accent-content">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="text-2xl font-semibold text-accent">{value}</p>
        <p className=" text-base-content/60">{label}</p>
      </div>
    </div>
  );
}
