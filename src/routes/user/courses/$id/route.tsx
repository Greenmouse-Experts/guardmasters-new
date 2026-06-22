import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  LayoutGrid,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import apiClient from "#/client/api.ts";
import { extract_message } from "#/helpers/apihelpers.tsx";

export const Route = createFileRoute("/user/courses/$id")({
  component: RouteComponent,
});

interface NavItem {
  label: string;
  icon: LucideIcon;
  to: string;
  exact?: boolean;
}

interface CertificateResponse {
  message?: string;
  data?: { url?: string };
}

function RouteComponent() {
  const { id } = Route.useParams();

  const items: NavItem[] = [
    { label: "Dashboard", icon: LayoutGrid, to: "/user", exact: true },
    { label: "Course", icon: BookOpen, to: "/user/courses/$id", exact: true },
  ];

  const generateCertificate = useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.get<CertificateResponse>(
        "certificates/" + id,
        // { params: { courseId: id } },
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message ?? "Certificate generated successfully.");
      if (data?.data?.url) {
        window.open(data.data.url, "_blank");
      }
    },
    onError: (err) => {
      toast.error(extract_message(err));
    },
  });

  return (
    <section className="flex flex-1 flex-col">
      <header className="flex w-full items-center justify-between gap-3 border-b border-base-300 bg-base-100 px-4 py-2">
        <nav className="flex items-center gap-2">
          {items.map((item) => (
            <NavLink key={item.label} item={item} id={id} />
          ))}
        </nav>

        <button
          type="button"
          onClick={() => generateCertificate.mutate()}
          disabled={generateCertificate.isPending}
          className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-content transition-colors hover:bg-accent/90 disabled:opacity-60"
        >
          {generateCertificate.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Award className="h-4 w-4" />
          )}
          {generateCertificate.isPending ? "Generating..." : "Get Certificate"}
        </button>
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
