import apiClient from "#/client/api.ts";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import HomeNav from "../home/-components/HomeNav";
import PageLoader from "#/components/layout/PageLoader.tsx";

export const Route = createFileRoute("/certificate/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const query = useQuery({
    queryKey: ["id", id],
    queryFn: async () => {
      let resp = await apiClient.get(`certificates/verify/${id}`);
      return resp.data;
    },
  });
  return (
    <div>
      <HomeNav />
      <PageLoader query={query}>
        {({ data }) => {
          return <>{JSON.stringify(data)}</>;
        }}
      </PageLoader>
    </div>
  );
}
