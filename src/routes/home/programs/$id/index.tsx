import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home/programs/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/home/programs/$id/"!</div>;
}
