import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { ArrowUpRight, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useForm, type UseFormRegister } from "react-hook-form";
import { toast } from "sonner";
import apiClient from "#/client/api.ts";
import { extract_message } from "#/helpers/apihelpers.tsx";
import ImagelessHeader from "../-components/headers/ImagelessHeader";

export const Route = createFileRoute("/home/contact/")({
  component: RouteComponent,
});

interface ContactFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interestedIn: string;
  message: string;
}

const details = [
  {
    icon: Phone,
    label: "Phone",
    value: "+1 437-545-1684",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@guardmasterinstitute.ca",
  },
  {
    icon: MapPin,
    label: "Visit",
    value: "405 Victoria Avenue\nWindsor, Ontario N9A 4N1\nCanada",
  },
];

function RouteComponent() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFields>({
    defaultValues: { interestedIn: "Mini-MBA Corporate Security" },
  });

  const mutation = useMutation({
    mutationFn: async (values: ContactFields) => {
      const { data } = await apiClient.post("contact-me", values);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message ?? "Message sent. We'll be in touch soon.");
      reset();
    },
    onError: (err) => toast.error(extract_message(err)),
  });

  return (
    <>
      <ImagelessHeader
        badge="Talk to us"
        title={
          <>
            Begin a <em className="text-primary italic">conversation.</em>
          </>
        }
        description="Admissions, partnerships, faculty inquiries, corporate training — we read every message."
      />

      <section className="bg-base-100 px-6 py-16 md:px-16 md:py-24">
        <div className="container mx-auto grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Contact details */}
          <div>
            <div className="space-y-10">
              {details.map((detail) => (
                <div key={detail.label}>
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-base-content/50 uppercase">
                    <detail.icon className="h-4 w-4 text-secondary" />
                    {detail.label}
                  </div>
                  <p className="text-xl leading-snug font-light whitespace-pre-line text-accent break-words sm:text-2xl md:text-3xl">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 border-t border-base-300 pt-10">
              <div className="mb-2 text-xs font-medium tracking-[0.18em] text-base-content/50 uppercase">
                Office hours
              </div>
              <p className="text-base-content/70">
                Monday — Friday · 09:00 – 18:00 ET
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            className="border border-base-300 p-6 md:p-10"
            onSubmit={handleSubmit((values) => mutation.mutate(values))}
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field
                label="First name"
                name="firstName"
                register={register}
                rules={{ required: "First name is required" }}
                error={errors.firstName?.message}
              />
              <Field
                label="Last name"
                name="lastName"
                register={register}
                rules={{ required: "Last name is required" }}
                error={errors.lastName?.message}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                register={register}
                rules={{ required: "Email is required" }}
                error={errors.email?.message}
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                register={register}
                rules={{ required: "Phone is required" }}
                error={errors.phone?.message}
              />
            </div>

            <div className="mt-6">
              <Field
                label="Interested in"
                name="interestedIn"
                register={register}
                error={errors.interestedIn?.message}
              />
            </div>

            <div className="mt-6">
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-medium tracking-[0.18em] text-base-content/50 uppercase"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                {...register("message", { required: "Message is required" })}
                className="w-full border border-base-300 bg-base-200/40 px-4 py-3 text-base-content focus:border-secondary focus:outline-none"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-error">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="btn btn-block mt-8 h-auto gap-2 rounded-none border-none bg-secondary py-4 font-medium text-secondary-content hover:bg-secondary/90 disabled:opacity-60"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

interface FieldProps {
  label: string;
  name: keyof ContactFields;
  type?: string;
  register: UseFormRegister<ContactFields>;
  rules?: Parameters<UseFormRegister<ContactFields>>[1];
  error?: string;
}

function Field({ label, name, type = "text", register, rules, error }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-medium tracking-[0.18em] text-base-content/50 uppercase"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name, rules)}
        className="w-full border border-base-300 bg-base-200/40 px-4 py-3 text-base-content focus:border-secondary focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}
