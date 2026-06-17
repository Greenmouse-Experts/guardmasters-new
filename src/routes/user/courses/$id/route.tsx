import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { BookOpen, GraduationCap, LayoutGrid, type LucideIcon } from "lucide-react";

export const Route = createFileRoute("/user/courses/$id")({
  component: RouteComponent,
});

interface NavItem {
  label: string;
  icon: LucideIcon;
  to: string;
  exact?: boolean;
}

function RouteComponent() {
  const { id } = Route.useParams();

  const items: NavItem[] = [
    { label: "Dashboard", icon: LayoutGrid, to: "/user", exact: true },
    { label: "Course", icon: BookOpen, to: "/user/courses/$id", exact: true },
    {
      label: "Assessment",
      icon: GraduationCap,
      to: "/user/courses/$id/assessment",
    },
  ];

  return (
    <section className="flex flex-1 flex-col">
      <header className="w-full border-b border-base-300 bg-base-100">
        <nav className="flex items-center gap-2 px-4 py-2">
          {items.map((item) => (
            <NavLink key={item.label} item={item} id={id} />
          ))}
        </nav>
      </header>

      <main className="pt-6">
        <Outlet />
      </main>
    </section>
  );
}

function NavLink({ item, id }: { item: NavItem; id: string }) {
  const { icon: Icon, label, to, exact } = item;
  const base =
    "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors";

  return (
    <Link
      to={to}
      params={{ id }}
      activeOptions={{ exact: !!exact }}
      activeProps={{ className: `${base} bg-accent text-accent-content` }}
      inactiveProps={{
        className: `${base} text-base-content/60 hover:bg-base-200 hover:text-base-content`,
      }}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
