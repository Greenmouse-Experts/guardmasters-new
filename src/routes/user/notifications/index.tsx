import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user/notifications/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/user/notifications/"!</div>;
}
