import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home/auth/verify/")({
  component: RouteComponent,
  validateSearch: (search: { email?: string }): { email?: string } => search,
});

function RouteComponent() {
  const search = Route.useSearch();
  if (!search.email) return <div>Hello "/home/auth/verify/"!</div>;
  return <div>Hello "/home/auth/verify/"!{search.email}</div>;
}
