import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, MailCheck } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import apiClient from "#/client/api.ts";
import Modal, { type ModalHandle } from "#/components/modals/DialogModal.tsx";

export const Route = createFileRoute("/home/auth/signup")({
  component: RouteComponent,
});

interface SignupFields {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

function RouteComponent() {
  const navigate = useNavigate();
  const modalRef = useRef<ModalHandle>(null);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFields>({ defaultValues: { countryCode: "+234" } });

  async function onSubmit(values: SignupFields) {
    try {
      await apiClient.post("user/client/signup", {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: `${values.countryCode}${values.phoneNumber}`,
        password: values.password,
      });
      setSubmittedEmail(values.email);
      modalRef.current?.open();
    } catch (err: any) {
      const message =
        err?.response?.data?.message ?? "Something went wrong. Try again.";
      toast.error(message);
    }
  }

  return (
    <div data-theme="guard" className="min-h-screen bg-base-100">
      {/* Hero */}
      <section className="bg-black px-6 pt-20 pb-16 md:px-16">
        <div className="container mx-auto">
          <span className="mb-6 mt-12 inline-block rounded-md bg-white/15 px-3 py-1 text-xs font-medium tracking-[0.18em] text-white/80 uppercase">
            Sign up
          </span>
          <h1 className="text-4xl leading-tight font-light text-white md:text-6xl">
            Create your <span className="text-primary">account.</span>
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-white/50">
            Join professionals advancing their careers in corporate security,
            loss prevention, and risk management.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-2xl border border-base-300 bg-base-200 p-8 md:p-14">
          <div className="mb-12 flex flex-col items-center">
            <div className="flex items-center justify-center bg-accent px-8 py-5">
              <img
                src="/logo.png"
                alt="Guardmaster Institute"
                className="h-12 w-auto object-contain"
              />
            </div>
            <h2 className="mt-8 text-2xl font-medium text-accent md:text-3xl">
              Begin Your Learning{" "}
              <span className="text-secondary">Journey</span>
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter First name"
                  {...register("firstName", { required: "First name is required" })}
                  className="w-full border border-base-300 bg-base-100 px-4 py-3 text-base-content placeholder:text-base-content/40 focus:border-secondary focus:outline-none"
                />
                {errors.firstName && <FieldError message={errors.firstName.message} />}
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter Last name"
                  {...register("lastName", { required: "Last name is required" })}
                  className="w-full border border-base-300 bg-base-100 px-4 py-3 text-base-content placeholder:text-base-content/40 focus:border-secondary focus:outline-none"
                />
                {errors.lastName && <FieldError message={errors.lastName.message} />}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                placeholder="Enter Email"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-base-300 bg-base-100 px-4 py-3 text-base-content placeholder:text-base-content/40 focus:border-secondary focus:outline-none"
              />
              {errors.email && <FieldError message={errors.email.message} />}
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone number</Label>
              <div className="flex items-stretch border border-base-300 bg-base-100 focus-within:border-secondary">
                <select
                  aria-label="Country code"
                  {...register("countryCode")}
                  className="border-r border-base-300 bg-transparent px-3 text-base-content focus:outline-none"
                >
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+1">🇨🇦 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+234">🇳🇬 +234</option>
                </select>
                <input
                  id="phoneNumber"
                  type="tel"
                  placeholder="8012345678"
                  {...register("phoneNumber", { required: "Phone number is required" })}
                  className="w-full bg-transparent px-4 py-3 text-base-content focus:outline-none"
                />
              </div>
              {errors.phoneNumber && <FieldError message={errors.phoneNumber.message} />}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                className="w-full border border-base-300 bg-base-100 px-4 py-3 text-base-content placeholder:text-base-content/40 focus:border-secondary focus:outline-none"
              />
              {errors.password && <FieldError message={errors.password.message} />}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (v) => v === watch("password") || "Passwords do not match",
                })}
                className="w-full border border-base-300 bg-base-100 px-4 py-3 text-base-content placeholder:text-base-content/40 focus:border-secondary focus:outline-none"
              />
              {errors.confirmPassword && <FieldError message={errors.confirmPassword.message} />}
            </div>

            <div>
              <label className="flex items-start gap-3 text-sm text-base-content/70">
                <input
                  type="checkbox"
                  {...register("agree", { required: "You must agree to continue" })}
                  className="checkbox checkbox-sm mt-0.5 rounded-none"
                />
                <span>
                  I have read and agreed to GuardMaster Institute Privacy Policy
                  and Terms of Use
                </span>
              </label>
              {errors.agree && <FieldError message={errors.agree.message} />}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-block h-auto gap-2 rounded-none border-none bg-secondary py-4 font-medium text-secondary-content hover:bg-secondary/90 disabled:opacity-60"
            >
              {isSubmitting ? "Creating account…" : "Create Account"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-base-content/60">
            Already have an account?{" "}
            <Link
              to="/home/auth/login"
              className="font-medium text-secondary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>

      <Modal ref={modalRef}>
        <div className="flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
            <MailCheck className="h-8 w-8" />
          </span>
          <h3 className="mt-6 text-2xl font-medium text-accent">
            Check your inbox
          </h3>
          <p className="mt-3 leading-relaxed text-base-content/60">
            A verification mail has been sent to{" "}
            <span className="font-medium text-accent">{submittedEmail}</span>.
            Please verify your email to activate your account.
          </p>
          <button
            type="button"
            onClick={() => {
              modalRef.current?.close();
              navigate({ to: "/home/auth/login" });
            }}
            className="btn mt-8 h-auto w-full gap-2 rounded-none border-none bg-secondary py-3.5 font-medium text-secondary-content hover:bg-secondary/90"
          >
            Sign in now
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </Modal>
    </div>
  );
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-xs font-medium tracking-[0.15em] text-base-content/50 uppercase"
    >
      {children}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  return <p className="mt-1 text-xs text-error">{message}</p>;
}
