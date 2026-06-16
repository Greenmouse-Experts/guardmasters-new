import { Bell, Package, DollarSign, type LucideIcon } from "lucide-react";

interface Activity {
  icon: LucideIcon;
  tone: string;
  title: string;
  time: string;
}

const activities: Activity[] = [
  {
    icon: Bell,
    tone: "bg-base-300 text-base-content/60",
    title: "$2400, Design changes",
    time: "22 DEC 7:20 PM",
  },
  {
    icon: Package,
    tone: "bg-error/10 text-error",
    title: "New order #1832412",
    time: "21 DEC 11 PM",
  },
  {
    icon: DollarSign,
    tone: "bg-success/10 text-success",
    title: "Payment completed for order #4395133",
    time: "20 DEC 2:20 AM",
  },
];

export default function ActivityTimeline() {
  return (
    <div className="rounded-lg border border-base-300 bg-base-100 p-6">
      <h2 className="mb-6 text-lg font-semibold text-accent">
        Activity Timeline
      </h2>
      <ul className="space-y-3">
        {activities.map((activity, index) => (
          <li
            key={activity.title}
            className="relative rounded-lg border border-base-300 p-4"
          >
            {index < activities.length - 1 && (
              <span className="absolute left-9 top-full h-3 w-px bg-base-300" />
            )}
            <div className="flex items-center gap-4">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${activity.tone}`}
              >
                <activity.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-medium text-accent">{activity.title}</p>
                <p className="text-sm text-base-content/50">{activity.time}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
