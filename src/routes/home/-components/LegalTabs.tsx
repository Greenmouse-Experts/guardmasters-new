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
      <h2 className="mb-4 text-2xl font-bold text-base-content">
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

      <SectionHeading>1. Acceptance of Terms</SectionHeading>
      <Para>
        By accessing or using the Guardmaster Institute website or enrolling in
        any program, you agree to be bound by these Terms and Conditions. If you
        do not agree with any part of these terms, please refrain from using our
        services.
      </Para>

      <SectionHeading>2. Program Enrollment & Payment</SectionHeading>
      <Para>
        Enrollment in any program is confirmed only upon receipt of full payment
        or an approved payment arrangement. Guardmaster Institute reserves the
        right to decline enrollment or remove participants who violate program
        policies.
      </Para>

      <SectionHeading>3. Refund & Cancellation Policy</SectionHeading>
      <Para>
        Cancellations made more than 14 days before program commencement are
        eligible for a full refund. Cancellations within 14 days of the start
        date may be subject to a processing fee. No refunds are issued after a
        program has commenced.
      </Para>

      <SectionHeading>4. Intellectual Property</SectionHeading>
      <Para>
        All course materials, curriculum, branding, and content are the
        exclusive intellectual property of Guardmaster Institute Canada™.
        Reproduction, distribution, or commercial use without prior written
        consent is strictly prohibited.
      </Para>

      <SectionHeading>5. Conduct & Participation</SectionHeading>
      <Para>
        Participants are expected to engage respectfully with instructors and
        peers. Guardmaster Institute reserves the right to remove any
        participant whose conduct is disruptive, offensive, or in violation of
        our code of conduct, without entitlement to a refund.
      </Para>

      <SectionHeading>6. Limitation of Liability</SectionHeading>
      <Para>
        Guardmaster Institute shall not be liable for any indirect, incidental,
        or consequential damages arising from participation in programs or use
        of the website. Our total liability shall not exceed the amount paid by
        the participant for the relevant program.
      </Para>

      <SectionHeading>7. Governing Law</SectionHeading>
      <Para>
        These Terms and Conditions are governed by the laws of the Province of
        Ontario and the federal laws of Canada applicable therein.
      </Para>

      <div className="mt-8 inline-block rounded-xl bg-primary px-6 py-4 text-sm text-primary-content">
        <p className="mb-1 font-semibold">Need clarification?</p>
        <a
          href="mailto:info@guardmasterinstitute.ca"
          className="font-bold text-accent hover:underline"
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
      <h2 className="mb-4 text-2xl font-bold text-base-content">
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

      <SectionHeading>1. Information We Collect</SectionHeading>
      <Para>
        We collect personal information you provide directly — such as name,
        email address, phone number, and payment details — when you register for
        a program, contact us, or interact with our website. We may also collect
        technical data such as IP address, browser type, and usage patterns
        automatically.
      </Para>

      <SectionHeading>2. How We Use Your Information</SectionHeading>
      <Para>
        Your information is used to process enrollments, communicate program
        updates, issue certificates, provide customer support, and improve our
        services. We do not sell, rent, or trade your personal information to
        third parties.
      </Para>

      <SectionHeading>3. Data Sharing</SectionHeading>
      <Para>
        We may share your information with accrediting bodies for certification
        verification purposes, and with trusted service providers who assist in
        operating our website and programs — all bound by confidentiality
        obligations. We may also disclose information as required by law.
      </Para>

      <SectionHeading>4. Data Retention</SectionHeading>
      <Para>
        We retain personal data for as long as necessary to fulfill the purposes
        outlined in this policy, or as required by applicable law. Enrollment
        and certification records are retained indefinitely for credential
        verification.
      </Para>

      <SectionHeading>5. Your Rights</SectionHeading>
      <Para>
        Under applicable Canadian privacy laws (PIPEDA), you have the right to
        access, correct, or request deletion of your personal information. To
        exercise these rights, contact us at the address below.
      </Para>

      <SectionHeading>6. Security</SectionHeading>
      <Para>
        We implement reasonable administrative, technical, and physical
        safeguards to protect your information from unauthorized access,
        disclosure, or destruction.
      </Para>

      <SectionHeading>7. Third-Party Links</SectionHeading>
      <Para>
        Our website may contain links to external sites. We are not responsible
        for the privacy practices of those sites and encourage you to review
        their policies independently.
      </Para>

      <div className="mt-8 inline-block rounded-xl bg-primary px-6 py-4 text-sm text-primary-content">
        <p className="mb-1 font-semibold">Privacy inquiries?</p>
        <a
          href="mailto:info@guardmasterinstitute.ca"
          className="font-bold text-accent hover:underline"
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
      <h2 className="mb-4 text-2xl font-bold text-base-content">
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
            All website visitors
          </p>
        </div>
      </div>

      <SectionHeading>1. What Are Cookies?</SectionHeading>
      <Para>
        Cookies are small text files placed on your device by websites you
        visit. They are widely used to make websites work more efficiently, as
        well as to provide information to site owners.
      </Para>

      <SectionHeading>2. How We Use Cookies</SectionHeading>
      <Para>
        We use cookies to remember your preferences, analyze site traffic,
        understand how visitors interact with our content, and improve
        performance. We do not use cookies for targeted advertising.
      </Para>

      <SectionHeading>3. Types of Cookies We Use</SectionHeading>
      <Para>
        <strong>Essential cookies</strong> — required for basic site
        functionality such as navigation and form submissions.{" "}
        <strong>Analytics cookies</strong> — help us understand how visitors use
        our site (e.g., pages visited, time on site) using anonymized data.{" "}
        <strong>Preference cookies</strong> — remember your settings and choices
        to personalize your experience.
      </Para>

      <SectionHeading>4. Third-Party Cookies</SectionHeading>
      <Para>
        Some pages may include content from third-party services (e.g., embedded
        videos, maps) that may set their own cookies. We do not control these
        cookies and recommend reviewing those providers' policies directly.
      </Para>

      <SectionHeading>5. Managing Cookies</SectionHeading>
      <Para>
        You can control and delete cookies through your browser settings. Note
        that disabling certain cookies may affect the functionality of our
        website. Most browsers allow you to block cookies or alert you when
        cookies are being sent.
      </Para>

      <SectionHeading>6. Consent</SectionHeading>
      <Para>
        By continuing to use our website, you consent to the use of cookies as
        described in this policy. You may withdraw consent at any time by
        adjusting your browser settings or contacting us.
      </Para>

      <div className="mt-8 inline-block rounded-xl bg-primary px-6 py-4 text-sm text-primary-content">
        <p className="mb-1 font-semibold">Cookie questions?</p>
        <a
          href="mailto:info@guardmasterinstitute.ca"
          className="font-bold text-accent hover:underline"
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
        <div className="mb-6 inline-flex rounded-full border border-base-300 bg-base-100 ">
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
