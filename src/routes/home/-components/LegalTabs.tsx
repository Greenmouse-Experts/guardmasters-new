import { useState } from "react";
import { X } from "lucide-react";

type Tab = "terms" | "privacy" | "cookie";

type Highlight = {
  title: string;
  intro?: string;
  bullets?: string[];
  paragraph?: string;
};

const highlights: Record<Tab, Highlight> = {
  terms: {
    title: "Information We Collect",
    intro: "We may collect the following types of information:",
    bullets: [
      "Personal details (e.g., name, email address, phone number)",
      "Professional and academic background",
      "Payment and billing information",
      "IP address and browser data for website analytics",
      "Course progress and learning activity (via our LMS)",
    ],
  },
  privacy: {
    title: "Information We Collect",
    intro: "We may collect the following types of information:",
    bullets: [
      "Personal details (e.g., name, email address, phone number)",
      "Professional and academic background",
      "Payment and billing information",
      "IP address and browser data for website analytics",
      "Course progress and learning activity (via our LMS)",
    ],
  },
  cookie: {
    title: "What Are Cookies?",
    paragraph:
      "Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences, login status, and browsing behavior for a more personalized experience.",
  },
};

function HighlightCard({ tab }: { tab: Tab }) {
  const [open, setOpen] = useState(true);
  const { title, intro, bullets, paragraph } = highlights[tab];

  if (!open) return null;

  return (
    <div className="mt-8 rounded-2xl ring ring-primary/50 p-1 shadow-xl">
      <div className="relative rounded-xl bg-base-100 p-8 md:p-10">
        <button
          onClick={() => setOpen(false)}
          aria-label="Dismiss"
          className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-content transition-opacity hover:opacity-90"
        >
          <X className="h-4 w-4" />
        </button>

        <h3 className="mb-4 pr-12 font-pop text-2xl font-bold text-base-content">
          {title}
        </h3>

        {intro && (
          <p className="mb-3 leading-relaxed text-base-content/70">{intro}</p>
        )}

        {bullets && (
          <ul className="ml-1 space-y-2">
            {bullets.map((item) => (
              <li
                key={item}
                className="flex gap-3 leading-relaxed text-base-content/80"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-base-content/60" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {paragraph && (
          <p className="leading-relaxed text-base-content/70">{paragraph}</p>
        )}
      </div>
    </div>
  );
}

const tabs: { id: Tab; label: string }[] = [
  { id: "terms", label: "Terms & Conditions" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "cookie", label: "Cookie Policy" },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2 mt-8 text-lg font-bold text-base-content first:mt-0">
      {children}
    </h3>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 leading-relaxed text-base-content/70">{children}</p>
  );
}

function TermsContent() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-base-content font-pop">
        Terms & Conditions
      </h2>
      <Para>
        At{" "}
        <strong>
          Guardmaster Institute of Corporate Security Management, Canada,
        </strong>{" "}
        we are committed to upholding clear and transparent terms of engagement.
        These Terms and Conditions govern your use of our website, services, and
        enrollment in our programs.
      </Para>

      <div className="my-6 border-t border-base-300" />

      <div className="mb-6 flex flex-wrap gap-8 text-sm">
        <div>
          <p className="mb-1 font-semibold uppercase tracking-widest text-base-content/50">
            Last Updated
          </p>
          <p className="text-lg font-bold text-base-content">2026</p>
        </div>
        <div>
          <p className="mb-1 font-semibold uppercase tracking-widest text-base-content/50">
            Applies To
          </p>
          <p className="text-lg font-bold text-base-content">
            Website visitors, learners, and training clients
          </p>
        </div>
      </div>

      <div className="mt-8 inline-block rounded-xl bg-accent px-6 py-4 text-sm text-accent-content">
        <p className="mb-1 font-semibold">Need clarification?</p>
        <a
          href="mailto:info@guardmasterinstitute.ca"
          className="font-bold text-accent-content hover:underline"
        >
          info@guardmasterinstitute.ca
        </a>
      </div>
    </div>
  );
}

function PrivacyContent() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-base-content font-pop">
        Privacy Policy
      </h2>
      <Para>
        At{" "}
        <strong>
          Guardmaster Institute of Corporate Security Management, Canada,
        </strong>{" "}
        we are committed to protecting your privacy. This Privacy Policy
        outlines how we collect, use, and safeguard your personal information
        when you visit our website or enroll in our programs.
      </Para>

      <div className="my-6 border-t border-base-300" />

      <div className="mb-6 flex flex-wrap gap-8 text-sm">
        <div>
          <p className="mb-1 font-semibold uppercase tracking-widest text-base-content/50">
            Last Updated
          </p>
          <p className="text-lg font-bold text-base-content">2026</p>
        </div>
        <div>
          <p className="mb-1 font-semibold uppercase tracking-widest text-base-content/50">
            Applies To
          </p>
          <p className="text-lg font-bold text-base-content">
            Website visitors, learners, and training clients
          </p>
        </div>
      </div>
      <div className="mt-8 inline-block rounded-xl bg-accent px-6 py-4 text-sm text-accent-content">
        <p className="mb-1 font-semibold">Need clarification?</p>
        <a
          href="mailto:info@guardmasterinstitute.ca"
          className="font-bold text-accent-content hover:underline"
        >
          info@guardmasterinstitute.ca
        </a>
      </div>
    </div>
  );
}

function CookieContent() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-base-content font-pop">
        Cookie Policy
      </h2>
      <Para>
        At{" "}
        <strong>
          Guardmaster Institute of Corporate Security Management, Canada,
        </strong>{" "}
        we use cookies and similar tracking technologies to enhance your
        experience on our website. This Cookie Policy explains what cookies are,
        how we use them, and your choices.
      </Para>

      <div className="mt-8 inline-block rounded-xl bg-primary px-6 py-4 text-sm text-primary-content">
        <p className="mb-1 font-semibold">Cookie questions?</p>
        <a
          href="mailto:info@guardmasterinstitute.ca"
          className="font-bold text-accent-content hover:underline"
        >
          info@guardmasterinstitute.ca
        </a>
      </div>
    </div>
  );
}

const content: Record<Tab, React.ReactNode> = {
  terms: <TermsContent />,
  privacy: <PrivacyContent />,
  cookie: <CookieContent />,
};

export default function LegalTabs() {
  const [active, setActive] = useState<Tab>("terms");

  return (
    <section className="bg-base-200 py-16 ">
      <div className="container mx-auto ">
        <div className="mb-6 inline-flex rounded-xl border border-base-300 bg-base-100 shadow-xl px-4 py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`rounded-xl px-5 py-2 font-bold  transition-colors ${
                active === tab.id
                  ? "bg-accent text-accent-content"
                  : " hover:text-base-content"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border-2 border-dashed border-accent/30 bg-base-100 p-8  md:p-12">
          {content[active]}
        </div>

        <HighlightCard key={active} tab={active} />
      </div>
    </section>
  );
}
