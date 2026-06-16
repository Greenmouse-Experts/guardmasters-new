import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user/courses")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
