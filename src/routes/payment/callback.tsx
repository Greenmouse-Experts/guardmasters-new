import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import apiClient from "#/client/api.ts";

export const Route = createFileRoute("/payment/callback")({
  component: RouteComponent,
  validateSearch: (search: { reference?: string }): { reference?: string } =>
    search,
});

function RouteComponent() {
  const { reference } = Route.useSearch();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["payment", reference],
    enabled: !!reference,
    retry: false,
    queryFn: async () => {
      const resp = await apiClient.post(`/orders/confirm/${reference}`, {
        reference,
      });
      return resp.data;
    },
  });

  // On a confirmed payment, send the user to their courses.
  useEffect(() => {
    if (!query.isSuccess) return;
    toast.success(query.data?.message ?? "Payment confirmed successfully.");
    const t = setTimeout(
      () => navigate({ to: "/user/courses", search: { page: 1 } }),
      1500,
    );
    return () => clearTimeout(t);
  }, [query.isSuccess, query.data, navigate]);

  const noReference = !reference;
  const isError = noReference || query.isError;

  return (
    <div
      data-theme="guard"
      className="flex min-h-screen items-center justify-center bg-black px-6"
    >
      <div className="w-full max-w-md border border-base-300 bg-base-200 p-8 text-center md:p-12">
        <div className="mb-10 flex justify-center">
          <div className="flex items-center justify-center bg-accent px-8 py-5">
            <img
              src="/logo.png"
              alt="Guardmaster Institute"
              className="h-12 w-auto object-contain"
            />
          </div>
        </div>

        {query.isLoading && !noReference ? (
          <State
            tone="loading"
            icon={<Loader2 className="h-8 w-8 animate-spin" />}
            title="Verifying your payment"
            message="Please wait while we confirm your transaction…"
          />
        ) : isError ? (
          <>
            <State
              tone="error"
              icon={<AlertCircle className="h-8 w-8" />}
              title="Payment verification failed"
              message={
                noReference
                  ? "No payment reference was found in the link."
                  : "We couldn't confirm your payment. If you were charged, check your purchase history."
              }
            />
            <Link
              to="/user/purchase-history"
              className="btn mt-8 h-auto w-full rounded-none border-none bg-secondary py-3.5 font-medium text-secondary-content hover:bg-secondary/90"
            >
              View Purchase History
            </Link>
          </>
        ) : (
          <State
            tone="success"
            icon={<CheckCircle2 className="h-8 w-8" />}
            title="Payment confirmed"
            message="Your enrollment is complete. Redirecting to your courses…"
          />
        )}
      </div>
    </div>
  );
}

function State({
  tone,
  icon,
  title,
  message,
}: {
  tone: "loading" | "success" | "error";
  icon: React.ReactNode;
  title: string;
  message: string;
}) {
  const toneClass =
    tone === "success"
      ? "bg-success/10 text-success"
      : tone === "error"
        ? "bg-error/10 text-error"
        : "bg-secondary/10 text-secondary";

  return (
    <div className="flex flex-col items-center">
      <span
        className={`flex h-16 w-16 items-center justify-center rounded-full ${toneClass}`}
      >
        {icon}
      </span>
      <h1 className="mt-6 text-2xl font-medium text-accent">{title}</h1>
      <p className="mt-3 leading-relaxed text-base-content/60">{message}</p>
    </div>
  );
}
