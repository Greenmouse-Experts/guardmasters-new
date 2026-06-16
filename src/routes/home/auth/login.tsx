import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import apiClient from "#/client/api.ts";
import { set_profile_value, set_user_value } from "#/store/authStore.ts";
import type { AuthUser, ProfileData } from "#/store/authStore.ts";

export const Route = createFileRoute("/home/auth/login")({
  component: RouteComponent,
});

interface LoginFields {
  email: string;
  password: string;
}

function RouteComponent() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>();

  async function onSubmit(values: LoginFields) {
    try {
      const { data } = await apiClient.post<{ data: AuthUser }>(
        "auth/signin",
        values,
      );
      set_user_value(data.data);

      const profile = await apiClient.get<{ data: ProfileData }>(
        "auth/profile",
      );
      set_profile_value(profile.data.data);
      navigate({ to: "/home" });
    } catch (err: any) {
      const message =
        err?.response?.data?.message ?? "Invalid email or password.";
      toast.error(message);
    }
  }

  return (
    <div data-theme="guard" className="min-h-screen bg-base-100">
      {/* Hero */}
      <section className="bg-black px-6 pt-20 pb-16 md:px-16">
        <div className="container mx-auto">
          <span className="mb-6 inline-block rounded-md bg-white/15 px-3 py-1 text-xs font-medium tracking-[0.18em] text-white/80 uppercase">
            Sign in
          </span>
          <h1 className="text-4xl leading-tight font-light text-white md:text-6xl">
            Sign In to your <span className="text-primary">account.</span>
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-white/50">
            Join professionals advancing their careers in corporate security,
            loss prevention, and risk management.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-base-300 bg-base-200 p-8 md:p-14">
          <div className="mb-12 flex flex-col items-center">
            <div className="flex items-center justify-center bg-accent px-8 py-5">
              <img
                src="/logo.png"
                alt="Guardmaster Institute"
                className="h-12 w-auto object-contain"
              />
            </div>
            <h2 className="mt-8 text-2xl font-medium text-accent md:text-3xl">
              Sign In to Continue Your{" "}
              <span className="text-secondary">Training</span>
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium tracking-[0.15em] text-base-content/50 uppercase"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-base-300 bg-base-100 px-4 py-3 text-base-content placeholder:text-base-content/40 focus:border-secondary focus:outline-none"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-medium tracking-[0.15em] text-base-content/50 uppercase"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full border border-base-300 bg-base-100 px-4 py-3 text-base-content placeholder:text-base-content/40 focus:border-secondary focus:outline-none"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-block h-auto gap-2 rounded-none border-none bg-secondary py-4 font-medium text-secondary-content hover:bg-secondary/90 disabled:opacity-60"
            >
              {isSubmitting ? "Signing in…" : "Sign In"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-base-content/60">
            Don&apos;t have an account?{" "}
            <Link
              to="/home/auth/signup"
              className="font-medium text-secondary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
