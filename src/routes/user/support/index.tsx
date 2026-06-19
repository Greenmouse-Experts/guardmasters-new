import { createFileRoute } from "@tanstack/react-router";
import { Headphones, Mail, MessageCircle, Phone } from "lucide-react";

export const Route = createFileRoute("/user/support/")({
  component: RouteComponent,
});

const channels = [
  {
    icon: Mail,
    label: "Email us",
    value: "info@guardmasterinstitute.ca",
    href: "mailto:info@guardmasterinstitute.ca",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+1 905-452-2470",
    href: "tel:+19054522470",
  },
  {
    icon: MessageCircle,
    label: "Live chat",
    value: "Mon–Fri, 9am–5pm ET",
    href: "#",
  },
];

const faqs = [
  {
    q: "How do I access my purchased courses?",
    a: "Head to My Courses from the sidebar. Every confirmed enrollment appears there with your current progress.",
  },
  {
    q: "When do I receive my certificate?",
    a: "Certificates are issued automatically once you complete all lessons and pass the required assessments for a course.",
  },
  {
    q: "My payment went through but the course isn't showing.",
    a: "Payments can take a moment to confirm. If a course is still missing after a few minutes, contact us with your reference number from Purchase History.",
  },
];

function RouteComponent() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-accent text-accent-content">
          <Headphones className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold text-accent">Support</h1>
          <p className="text-sm text-base-content/55">
            Need a hand? Reach out and our team will get back to you.
          </p>
        </div>
      </div>

      {/* Contact channels */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {channels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            className="flex flex-col gap-3 rounded-lg border border-base-300 bg-base-100 p-6 transition-colors hover:border-secondary"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary/10 text-secondary">
              <channel.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-base-content/55">{channel.label}</p>
              <p className="font-medium text-accent">{channel.value}</p>
            </div>
          </a>
        ))}
      </div>

      {/* FAQ */}
      <div className="rounded-lg border border-base-300 bg-base-100 p-6">
        <h2 className="mb-4 text-lg font-semibold text-accent">
          Frequently asked questions
        </h2>
        <div className="divide-y divide-base-300">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-accent">
                {faq.q}
                <span className="text-base-content/40 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-base-content/60">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
