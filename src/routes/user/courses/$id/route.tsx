import apiClient from "#/client/api.ts";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/user/courses/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return (
    <>
      <section className="flex flex-1 flex-col">
        <aside className="w-full h-18 bg-base-300">ss</aside>
        <main>
          <Outlet />
        </main>
      </section>
    </>
  );
}
