import apiClient from "#/client/api.ts";
import PageLoader from "#/components/layout/PageLoader.tsx";
import CustomTable, {
  type columnType,
} from "#/components/tables/CustomTable.tsx";
import type { ApiResponseV2 } from "#/types/api.js";
import type { Order } from "#/types/orders.ts";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user/purchase-history/")({
  component: RouteComponent,
});

const columns: columnType<Order>[] = [
  {
    key: "number",
    label: "Order",
    render: (value: string) => (
      <span className="font-mono  text-base-content/70">{value}</span>
    ),
  },
  {
    key: "orderItems",
    label: "Course(s)",
    render: (_value, item) => (
      <span className="line-clamp-2 max-w-xs text-base-content">
        {item.orderItems.map((oi) => oi.course.title).join(", ")}
      </span>
    ),
  },
  {
    key: "trx",
    label: "Amount",
    render: (_value, item) => (
      <span className="font-medium text-accent">
        ${item.trx.amount.toLocaleString()}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value: string) => <StatusBadge status={value} />,
  },
  {
    key: "createdDate",
    label: "Date",
    render: (value: string) =>
      new Date(value).toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
  },
];

function RouteComponent() {
  const query = useQuery<ApiResponseV2<Order[]>>({
    queryKey: ["purchase-history"],
    queryFn: async () => {
      const resp = await apiClient.get("/orders/fetch-student-trx");
      return resp.data;
    },
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <h1 className="text-2xl font-semibold text-accent">Purchase History</h1>

      <PageLoader query={query} loadingText="Loading purchase history...">
        {(data) => <CustomTable data={data.data} columns={columns} />}
      </PageLoader>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "confirmed"
      ? "bg-success/10 text-success"
      : status === "pending"
        ? "bg-warning/10 text-warning"
        : "bg-base-300 text-base-content/60";
  return (
    <span className={`rounded-full px-3 py-1  font-medium capitalize ${tone}`}>
      {status}
    </span>
  );
}
