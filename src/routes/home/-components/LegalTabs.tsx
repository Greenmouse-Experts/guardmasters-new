import { useState } from "react";
import { Plus } from "lucide-react";

type Tab = "terms" | "privacy" | "cookie";

type AccordionItem = {
  title: string;
  intro?: string;
  bullets?: string[];
  paragraph?: string;
};

const accordions: Record<Tab, AccordionItem[]> = {
  terms: [
    {
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
    {
      title: "Acceptance of Terms",
      paragraph:
        "By accessing or using the Guardmaster Institute website or enrolling in any program, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our services.",
    },
    {
      title: "Program Enrollment & Payment",
      paragraph:
        "Enrollment in any program is confirmed only upon receipt of full payment or an approved payment arrangement. Guardmaster Institute reserves the right to decline enrollment or remove participants who violate program policies.",
    },
    {
      title: "Refund & Cancellation Policy",
      paragraph:
        "Cancellations made more than 14 days before program commencement are eligible for a full refund. Cancellations within 14 days of the start date may be subject to a processing fee. No refunds are issued after a program has commenced.",
    },
    {
      title: "Intellectual Property",
      paragraph:
        "All course materials, curriculum, branding, and content are the exclusive intellectual property of Guardmaster Institute Canada™. Reproduction, distribution, or commercial use without prior written consent is strictly prohibited.",
    },
    {
      title: "Conduct & Participation",
      paragraph:
        "Participants are expected to engage respectfully with instructors and peers. Guardmaster Institute reserves the right to remove any participant whose conduct is disruptive, offensive, or in violation of our code of conduct, without entitlement to a refund.",
    },
    {
      title: "Limitation of Liability",
      paragraph:
        "Guardmaster Institute shall not be liable for any indirect, incidental, or consequential damages arising from participation in programs or use of the website. Our total liability shall not exceed the amount paid by the participant for the relevant program.",
    },
    {
      title: "Disclaimer of Warranties",
      paragraph:
        "Our website, programs, and materials are provided on an “as is” and “as available” basis without warranties of any kind, whether express or implied. While we strive for accuracy and quality, Guardmaster Institute does not warrant that the services will be uninterrupted, error-free, or that certification outcomes are guaranteed.",
    },
    {
      title: "Indemnification",
      paragraph:
        "You agree to indemnify and hold harmless Guardmaster Institute, its faculty, staff, and affiliates from any claims, damages, losses, or expenses arising out of your breach of these Terms, your misuse of our services, or your violation of any applicable law or third-party right.",
    },
    {
      title: "Termination",
      paragraph:
        "Guardmaster Institute reserves the right to suspend or terminate your access to any program or the website, without notice, if you breach these Terms and Conditions or engage in conduct that is unlawful or harmful to the institute, its staff, or other participants.",
    },
    {
      title: "Governing Law",
      paragraph:
        "These Terms and Conditions are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein. Any disputes shall be subject to the exclusive jurisdiction of the courts of Ontario, Canada.",
    },
    {
      title: "Changes to These Terms",
      paragraph:
        "We may revise these Terms and Conditions from time to time. The most current version will always be posted on this page, and your continued use of our website or services constitutes acceptance of any changes.",
    },
    {
      title: "Contact Information",
      paragraph:
        "For any questions regarding these Terms and Conditions, please contact us at info@guardmasterinstitute.ca.",
    },
  ],
  privacy: [
    {
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
    {
      title: "How We Use Your Information",
      paragraph:
        "Your information is used to process enrollments, communicate program updates, issue certificates, provide customer support, and improve our services. We do not sell, rent, or trade your personal information to third parties.",
    },
    {
      title: "Legal Basis for Processing (for EU/UK Users)",
      intro:
        "Where the GDPR or UK GDPR applies, we process your personal data on one or more of the following legal bases:",
      bullets: [
        "Consent — where you have given clear consent for a specific purpose.",
        "Contract — where processing is necessary to deliver a program or service you have enrolled in.",
        "Legal obligation — where we must process data to comply with the law.",
        "Legitimate interests — where processing is necessary for our legitimate business interests and does not override your rights.",
      ],
    },
    {
      title: "Data Sharing and Storage",
      paragraph:
        "We may share your information with accrediting bodies for certification verification purposes, and with trusted service providers who assist in operating our website and programs — all bound by confidentiality obligations. Your data is stored on secure servers and may be hosted by reputable third-party providers. We may also disclose information as required by law.",
    },
    {
      title: "International Data Transfers",
      paragraph:
        "As a Canadian organization serving learners across continents, your information may be transferred to and processed in countries outside your own. Where such transfers occur, we take appropriate safeguards to ensure your data remains protected in accordance with applicable data protection laws.",
    },
    {
      title: "Data Retention",
      paragraph:
        "We retain personal data for as long as necessary to fulfill the purposes outlined in this policy, or as required by applicable law. Enrollment and certification records are retained indefinitely for credential verification.",
    },
    {
      title: "Your Rights",
      paragraph:
        "Under applicable Canadian privacy laws (PIPEDA), and where relevant the GDPR/UK GDPR, you have the right to access, correct, restrict, or request deletion of your personal information, as well as the right to data portability and to withdraw consent. To exercise these rights, contact us at info@guardmasterinstitute.ca.",
    },
    {
      title: "Cookies and Tracking Technologies",
      paragraph:
        "We use cookies and similar technologies to operate our website, analyze traffic, and remember your preferences. For full details on how we use cookies and how to manage them, please refer to our Cookie Policy.",
    },
    {
      title: "Security",
      paragraph:
        "We implement reasonable administrative, technical, and physical safeguards to protect your information from unauthorized access, disclosure, or destruction.",
    },
    {
      title: "Children's Privacy",
      paragraph:
        "Our programs and services are intended for professionals and adult learners. We do not knowingly collect personal information from children under the age of 16. If you believe we have inadvertently collected such data, please contact us so we can promptly remove it.",
    },
    {
      title: "Third-Party Links",
      paragraph:
        "Our website may contain links to external sites. We are not responsible for the privacy practices of those sites and encourage you to review their policies independently.",
    },
    {
      title: "Changes to This Policy",
      paragraph:
        "We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. The latest version will always be available on this page, with the effective date updated accordingly.",
    },
    {
      title: "Contact Us",
      paragraph:
        "If you have any questions or concerns about this Privacy Policy or how your data is handled, please reach out to us at info@guardmasterinstitute.ca.",
    },
  ],
  cookie: [
    {
      title: "What Are Cookies?",
      paragraph:
        "Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences, login status, and browsing behavior for a more personalized experience.",
    },
    {
      title: "Types of Cookies We Use",
      intro: "We use a combination of the following cookie types:",
      bullets: [
        "Essential cookies — required for basic site functionality such as navigation and form submissions.",
        "Analytics cookies — help us understand how visitors use our site using anonymized data.",
        "Preference cookies — remember your settings and choices to personalize your experience.",
      ],
    },
    {
      title: "Why We Use Cookies",
      paragraph:
        "We use cookies to remember your preferences, analyze site traffic, understand how visitors interact with our content, and improve performance. We do not use cookies for targeted advertising.",
    },
    {
      title: "Managing Your Cookie Preferences",
      paragraph:
        "You can control and delete cookies through your browser settings. Note that disabling certain cookies may affect the functionality of our website. Most browsers allow you to block cookies or alert you when cookies are being sent.",
    },
    {
      title: "Third-Party Cookies",
      paragraph:
        "Some pages may include content from third-party services (e.g., embedded videos, maps) that may set their own cookies. We do not control these cookies and recommend reviewing those providers' policies directly.",
    },
    {
      title: "Consent",
      paragraph:
        "By continuing to use our website, you consent to the use of cookies as described in this policy. You may withdraw consent at any time by adjusting your browser settings or contacting us.",
    },
    {
      title: "Updates to This Policy",
      paragraph:
        "We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices. The latest version will always be available on this page.",
    },
    {
      title: "Contact Us",
      paragraph:
        "If you have any questions about our use of cookies, please reach out to us at info@guardmasterinstitute.ca.",
    },
  ],
};

function AccordionBody({ item }: { item: AccordionItem }) {
  return (
    <div className="mt-4">
      {item.intro && (
        <p className="mb-3 leading-relaxed text-base-content/70">
          {item.intro}
        </p>
      )}
      {item.bullets && (
        <ul className="ml-1 space-y-2">
          {item.bullets.map((b) => (
            <li
              key={b}
              className="flex gap-3 leading-relaxed text-base-content/80"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-base-content/60" />
              {b}
            </li>
          ))}
        </ul>
      )}
      {item.paragraph && (
        <p className="leading-relaxed text-base-content/70">{item.paragraph}</p>
      )}
    </div>
  );
}

function LegalAccordion({ tab }: { tab: Tab }) {
  const items = accordions[tab];

  return (
    <div className="mt-8 overflow-hidden  ">
      <div className=" divide-base-300 p-4">
        {items.map((item, i) => (
          <details
            key={item.title}
            open={i === 0}
            className="shadow-xl bg-base-100 group ring ring-current/5 rounded-xl my-4 px-6 py-5 md:px-8 [&_svg]:open:rotate-45"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <span className="font-pop font-bold text-accent  text-lg">
                {item.title}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-content">
                <Plus className="h-4 w-4 transition-transform" />
              </span>
            </summary>
            <AccordionBody item={item} />
          </details>
        ))}
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

      <div className="mt-8 inline-block rounded-xl bg-accent px-6 py-4 text-sm text-accent-content">
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

        <div className=" bg-base-100 p-8  md:p-12">{content[active]}</div>

        <LegalAccordion key={active} tab={active} />
      </div>
    </section>
  );
}
