import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import ImagelessHeader from "../-components/headers/ImagelessHeader";
import { useForm, type UseFormRegister } from "react-hook-form";
import { toast } from "sonner";
import apiClient from "#/client/api.ts";
import { extract_message } from "#/helpers/apihelpers.tsx";

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
    Icon: Phone,
    label: "Phone",
    value: "+1 437-545-1684",
  },
  {
    Icon: Mail,
    label: "Email",
    value: "info@guardmasterinstitute.ca",
  },
  {
    Icon: MapPin,
    label: "Visit",
    value: "405 Victoria Avenue\nWindsor, Ontario N9A 4N1\nCanada",
  },
  {
    Icon: Clock,
    label: "Office Hours",
    value: "Monday — Friday\n09:00 — 18:00 ET",
  },
];

const programs = [
  "Mini-MBA Corporate Security",
  "Security Management Certificate",
  "ASIS Certifications Prep",
  "Corporate Training",
  "Other",
];

const MAP_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=-83.0500%2C42.3100%2C-83.0200%2C42.3300&layer=mapnik&marker=42.3176%2C-83.0385";
const GMAPS_HREF =
  "https://www.google.com/maps/search/?api=1&query=405+Victoria+Avenue+Windsor+Ontario+N9A+4N1+Canada";

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
        badge="Contact Guardmaster Institute"
        title={
          <>
            Speak with our{" "}
            <em className="text-primary italic">admissions team.</em>
          </>
        }
        description="Have questions about certification programs, admissions, or corporate security training? Send a message and our team will guide you through the right next step."
      />

      <section className="bg-base-200/40 px-6 py-16 md:px-12 md:py-24">
        <div className="container mx-auto space-y-8">
          {/* Cards row */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Contact info card */}
            <div className="rounded-2xl p-8 shadow-sm md:p-10 bg-accent/5 ring ring-current/10 font-pop">
              <p className="mb-1 text-sm font-semibold text-secondary">
                Contact Information
              </p>
              <h2 className="mb-8 text-3xl font-bold text-base-content">
                Reach us directly
              </h2>

              <ul className="space-y-6">
                {details.map(({ Icon, label, value }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-base-300 text-base-content/60">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="mb-0.5 text-sm text-base-content/50">
                        {label}
                      </p>
                      <p className="whitespace-pre-line text-base font-medium text-base-content">
                        {value}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form card */}
            <div className="rounded-2xl  p-8 shadow-sm md:p-10 bg-accent/5 ring ring-current/10">
              <p className="mb-1 text-sm font-semibold text-secondary">
                Send A Message
              </p>
              <h2 className="mb-1 text-3xl font-bold text-base-content">
                Tell us what you need
              </h2>
              <p className="mb-8 text-sm text-base-content/55">
                Complete the form below and our admissions or support team will
                get back to you shortly.
              </p>

              <form
                onSubmit={handleSubmit((values) => mutation.mutate(values))}
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="First Name"
                    name="firstName"
                    register={register}
                    rules={{ required: "First name is required" }}
                    error={errors.firstName?.message}
                  />
                  <Field
                    label="Last Name"
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

                <div className="mt-5">
                  <label
                    htmlFor="interestedIn"
                    className="mb-1.5 block text-sm text-base-content/70"
                  >
                    Interested In
                  </label>
                  <select
                    id="interestedIn"
                    {...register("interestedIn")}
                    className="w-full border border-base-300 bg-base-100 px-4 py-3 text-base-content focus:border-secondary focus:outline-none"
                  >
                    {programs.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm text-base-content/70"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message", {
                      required: "Message is required",
                    })}
                    className="w-full border border-base-300 bg-base-100 px-4 py-3 text-base-content focus:border-secondary focus:outline-none"
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
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-4 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Map section */}
          <div className="rounded-2xl bg-base-100 p-8 shadow-sm md:p-10">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="mb-1 text-sm font-semibold text-secondary">
                  Our Location
                </p>
                <h2 className="mb-1 text-3xl font-bold text-base-content">
                  Find Guardmaster Institute
                </h2>
                <p className="text-sm text-base-content/50">
                  405 Victoria Avenue, Windsor, Ontario N9A 4N1, Canada
                </p>
              </div>
              <a
                href={GMAPS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-base-300 px-4 py-2.5 text-sm font-medium text-base-content transition-colors hover:bg-base-200"
              >
                Open in Google Maps
                <ArrowRight className="h-3.5 w-3.5 -rotate-45" />
              </a>
            </div>

            <div className="relative overflow-hidden rounded-xl">
              <iframe
                src={MAP_SRC}
                title="Guardmaster Institute location"
                width="100%"
                height="400"
                className="block w-full border-0"
                loading="lazy"
              />
              {/* Location overlay card */}
              <div className="absolute bottom-4 left-4 max-w-[200px] rounded-xl bg-base-100 p-4 shadow-lg">
                <p className="mb-0.5 text-xs font-semibold text-amber-500">
                  Pinned Location
                </p>
                <p className="text-sm font-bold text-base-content">
                  Guardmaster Institute
                </p>
                <p className="mt-1 text-xs text-base-content/60">
                  405 Victoria Avenue{"\n"}Windsor, Ontario N9A 4N1{"\n"}Canada
                </p>
              </div>
            </div>
          </div>
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

function Field({
  label,
  name,
  type = "text",
  register,
  rules,
  error,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm text-base-content/70"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name, rules)}
        className="w-full border border-base-300 bg-base-100 px-4 py-3 text-base-content focus:border-secondary focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}
