import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, MailCheck } from "lucide-react";
import { useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "sonner";
import apiClient from "#/client/api.ts";
import SimpleInput from "#/components/inputs/SimpleInput.tsx";
import Modal, { type ModalHandle } from "#/components/modals/DialogModal.tsx";
import { extract_message } from "#/helpers/auth.ts";
import type { AxiosError } from "axios";
import ImageHeader from "../-components/headers/ImageHeader";

export const Route = createFileRoute("/home/auth/signup")({
  component: RouteComponent,
});

interface SignupFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

function RouteComponent() {
  const navigate = useNavigate();
  const modalRef = useRef<ModalHandle>(null);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const methods = useForm<SignupFields>();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  async function onSubmit(values: SignupFields) {
    try {
      await apiClient.post("user/client/signup", {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        password: values.password,
      });
      setSubmittedEmail(values.email);
      modalRef.current?.open();
    } catch (err: AxiosError<any>) {
      const axios_message = err.response?.data?.message;
      const message = axios_message ?? extract_message(err);
      toast.error(message);
    }
  }

  return (
    <div className="min-h-screen bg-accent/15">
      {/* Hero */}
      <ImageHeader
        badge={"Sign Up"}
        badge_outline
        image="/auth_bg.jpeg"
        fade={false}
        title={
          <>
            <h1 className="text-4xl leading-tight font-light text-white md:text-6xl">
              Create your <span className="text-primary">account.</span>
            </h1>
          </>
        }
        description={
          <>
            <div className="container mx-auto">
              <p className="mt-6 max-w-xl leading-relaxed text-white/50">
                Join professionals advancing their careers in corporate
                security, loss prevention, and risk management.
              </p>
            </div>
          </>
        }
      />
      {/*<section className="bg-black px-6 pt-20 pb-16 md:px-16"></section>*/}

      {/* Form */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-2xl border border-base-300 bg-white p-8 md:p-14">
          <div className="mb-12 flex flex-col items-center">
            <div className="flex items-center justify-center bg-accent px-8 py-5">
              <img
                src="/logo.png"
                alt="Guardmaster Institute"
                className="h-12 w-auto object-contain"
              />
            </div>
            <h2 className="mt-8 text-2xl font-medium text-accent md:text-3xl">
              Begin Your Learning <span className="text-primary">Journey</span>
            </h2>
            <p className="text-center max-w-sm text-lg">
              Create your profile to access programs, certifications, and
              student resources.
            </p>
          </div>

          <FormProvider {...methods}>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <SimpleInput
                  label="First name"
                  type="text"
                  placeholder="Enter First name"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                <SimpleInput
                  label="Last name"
                  type="text"
                  placeholder="Enter Last name"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
              </div>

              <SimpleInput
                label="Email"
                type="email"
                placeholder="Enter Email"
                {...register("email", { required: "Email is required" })}
              />

              <div className="w-full space-y-2">
                <div className="fieldset-label font-semibold">
                  <span className="">Phone number</span>
                </div>
                <Controller
                  control={control}
                  name="phone"
                  rules={{
                    required: "Phone number is required",
                    validate: (v) =>
                      (v && isValidPhoneNumber(v)) ||
                      "Enter a valid phone number",
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      value={field.value}
                      onChange={(v) => field.onChange(v ?? "")}
                      onBlur={field.onBlur}
                      defaultCountry="NG"
                      international
                      placeholder="Enter phone number"
                      numberInputProps={{
                        className: "grow bg-transparent focus:outline-none",
                      }}
                      className={`input input-md input-bordered flex w-full items-center gap-2  ${
                        errors.phone ? "input-error" : ""
                      }`}
                    />
                  )}
                />
                {errors.phone && (
                  <p className="mt-1  text-error">{errors.phone.message}</p>
                )}
              </div>

              <SimpleInput
                label="Password"
                type="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />

              <SimpleInput
                label="Confirm password"
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (v) =>
                    v === watch("password") || "Passwords do not match",
                })}
              />

              <div>
                <label className="flex items-start gap-3  text-base-content/70">
                  <input
                    type="checkbox"
                    {...register("agree", {
                      required: "You must agree to continue",
                    })}
                    className="checkbox checkbox-accent mt-0.5"
                  />
                  <span>
                    I have read and agreed to Guardmaster Institute{" "}
                    <Link
                      to="/home/terms"
                      search={{ tab: "privacy" }}
                      target="_blank"
                      className="font-medium text-accent underline hover:text-accent/70"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/home/terms"
                      search={{ tab: "terms" }}
                      target="_blank"
                      className="font-medium text-accent underline hover:text-accent/70"
                    >
                      Terms of Use
                    </Link>
                  </span>
                </label>
                {errors.agree && <FieldError message={errors.agree.message} />}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-block h-auto gap-2 rounded-xl border-none bg-accent py-4 font-medium text-accent-content hover:bg-accent/90 disabled:opacity-60"
              >
                {isSubmitting ? "Creating account…" : "Create Account"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </FormProvider>

          <p className="mt-8 text-center  text-base-content/60">
            Already have an account?{" "}
            <Link
              to="/home/auth/login"
              className="font-medium text-accent hover:underline"
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
            className="btn mt-8 h-auto w-full gap-2 rounded-none border-none bg-accent py-3.5 font-medium text-accent-content hover:bg-accent/90"
          >
            Sign in now
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </Modal>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  return <p className="mt-1 text-xs text-error">{message}</p>;
}
