import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user/progress/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/user/progress/"!</div>;
}
