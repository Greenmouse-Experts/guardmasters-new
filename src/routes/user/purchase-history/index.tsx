import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user/purchase-history/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/user/history/"!</div>;
}
