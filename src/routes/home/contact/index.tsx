import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import ImagelessHeader from "../-components/headers/ImagelessHeader";

export const Route = createFileRoute("/home/contact/")({
  component: RouteComponent,
});

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

      <section
        data-theme="guard"
        className="bg-base-100 px-6 py-16 md:px-16 md:py-24"
      >
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
                  <p className="text-3xl leading-snug font-light whitespace-pre-line text-accent">
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
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="First name" name="firstName" />
              <Field label="Last name" name="lastName" />
              <Field label="Email" name="email" type="email" />
              <Field label="Phone" name="phone" type="tel" />
            </div>

            <div className="mt-6">
              <Field
                label="Interested in"
                name="interest"
                defaultValue="Mini-MBA Corporate Security"
              />
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-xs font-medium tracking-[0.18em] text-base-content/50 uppercase">
                Message
              </label>
              <textarea
                name="message"
                rows={6}
                className="w-full border border-base-300 bg-base-200/40 px-4 py-3 text-base-content focus:border-secondary focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="btn btn-block mt-8 h-auto gap-2 rounded-none border-none bg-secondary py-4 font-medium text-secondary-content hover:bg-secondary/90"
            >
              Send message
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
}

function Field({ label, name, type = "text", defaultValue }: FieldProps) {
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
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="w-full border border-base-300 bg-base-200/40 px-4 py-3 text-base-content focus:border-secondary focus:outline-none"
      />
    </div>
  );
}
