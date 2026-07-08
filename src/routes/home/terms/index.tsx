import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ImageHeader from "../-components/headers/ImageHeader";
import LegalTabs, { type Tab } from "../-components/LegalTabs";

export const Route = createFileRoute("/home/terms/")({
  validateSearch: (search: Record<string, unknown>): { tab: Tab } => ({
    tab: (["terms", "privacy", "cookie"].includes(search.tab as string)
      ? search.tab
      : "terms") as Tab,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { tab } = Route.useSearch();
  const navigate = useNavigate();

  return (
    <div className="bg-base-300">
      <ImageHeader
        fade={false}
        image="/section.png"
        title={
          <div>
            Legal & Policy<span className="text-primary"> Center</span>
          </div>
        }
        description="Review the terms, privacy standards, and cookie practices that guide how Guardmaster Institute manages learning, website use, and user information."
      />
      <LegalTabs
        tab={tab}
        onTabChange={(t) => navigate({ to: "/home/terms", search: { tab: t } })}
      />
    </div>
  );
}
