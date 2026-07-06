import { createFileRoute } from "@tanstack/react-router";
import ImageHeader from "../-components/headers/ImageHeader";
import LegalTabs from "../-components/LegalTabs";

export const Route = createFileRoute("/home/terms/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ImageHeader
        title={
          <div>
            Legal & Policy<span className="text-primary"> Center</span>
          </div>
        }
        description="Review the terms, privacy standards, and cookie practices that guide how Guardmaster Institute manages learning, website use, and user information."
      />
      <LegalTabs />
    </div>
  );
}
