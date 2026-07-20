import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { new_url } from "#/client/api.ts";
import { extract_message } from "#/helpers/auth.ts";

export const Route = createFileRoute("/home/auth/verify/")({
  component: RouteComponent,
  validateSearch: (search: { token?: string }): { token?: string } => search,
});

function RouteComponent() {
  const { token } = Route.useSearch();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["verify-email", token],
    enabled: !!token,
    retry: false,
    queryFn: async () => {
      const { data } = await axios.get(new_url + "auth/verify-email", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
  });

  // On success, send the user to login after a short beat.
  useEffect(() => {
    if (!query.isSuccess) return;
    toast.success("Email verified successfully.");
    const t = setTimeout(() => navigate({ to: "/home/auth/login" }), 2500);
    return () => clearTimeout(t);
  }, [query.isSuccess, navigate]);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero */}
      <section className="bg-black px-6 pt-20 pb-16 md:px-16">
        <div className="container mx-auto">
          <span className="mb-6 mt-24 inline-block rounded-md bg-white/15 px-3 py-1  font-medium tracking-[0.18em] text-white/80 uppercase">
            Verification
          </span>
          <h1 className="text-4xl leading-tight font-light text-white md:text-6xl">
            Verify your <span className="text-primary">email.</span>
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-white/50">
            Confirm your email address to activate your Guardmaster Institute
            account.
          </p>
        </div>
      </section>

      {/* Status card */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-base-300 bg-base-200 p-8 md:p-14">
          <div className="mb-10 flex justify-center">
            <div className="flex items-center justify-center bg-accent px-8 py-5">
              <img
                src="/logo.png"
                alt="Guardmaster Institute"
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>

          {!token ? (
            <State
              tone="error"
              icon={<AlertCircle className="h-8 w-8" />}
              title="Invalid link"
              message="This verification link is missing its token. Please use the link from your email."
            />
          ) : query.isLoading ? (
            <State
              tone="loading"
              icon={<Loader2 className="h-8 w-8 animate-spin" />}
              title="Verifying your email"
              message="Hang tight while we confirm your account…"
            />
          ) : query.isError ? (
            <State
              tone="error"
              icon={<AlertCircle className="h-8 w-8" />}
              title="Verification failed"
              message={extract_message(query.error as never)}
            />
          ) : (
            <State
              tone="success"
              icon={<CheckCircle2 className="h-8 w-8" />}
              title="Email verified"
              message="Your account is now active. Redirecting you to sign in…"
            />
          )}

          {!query.isLoading && (
            <Link
              to="/home/auth/login"
              className="btn btn-block mt-10 h-auto gap-2 rounded-none border-none bg-secondary py-4 font-medium text-secondary-content hover:bg-secondary/90"
            >
              Go to sign in
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </section>
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
