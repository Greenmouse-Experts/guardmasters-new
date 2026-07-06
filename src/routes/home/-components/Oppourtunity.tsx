import {
  Star,
  Search,
  TrendingUp,
  Diamond,
  ShieldUser,
  Scale,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

interface Opportunity {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const opportunities: Opportunity[] = [
  {
    Icon: Star,
    title: "Corporate Security Manager",
    description:
      "Develop strategies and operations to protect people, assets, and organizational value.",
  },
  {
    Icon: Search,
    title: "Fraud Investigator / Forensic Analyst",
    description:
      "Investigate fraud, misconduct, and financial crimes using forensic techniques.",
  },
  {
    Icon: TrendingUp,
    title: "Risk & Resilience Consultant",
    description:
      "Assess risks and build resilience frameworks for organizations.",
  },
  {
    Icon: Diamond,
    title: "Security Trainer / Educator",
    description:
      "Design and deliver training programs to build security awareness.",
  },
  {
    Icon: ShieldUser,
    title: "Information Security Specialist",
    description: "Protect digital assets and manage cybersecurity risks.",
  },
  {
    Icon: Scale,
    title: "Compliance & Governance Officer",
    description:
      "Ensure adherence to laws, regulations, standards, and ethics.",
  },
];

export default function Opportunity() {
  return (
    <section className="bg-accent px-6 py-20 md:px-16">
      <div className="container mx-auto">
        {/* Heading */}
        <h2 className="mb-4 text-4xl font-bold text-accent-content md:text-5xl">
          Career <span className="text-primary">Opportunities</span>
        </h2>
        <p className="mb-12 max-w-lg text-base leading-relaxed text-accent-content/60">
          Our programs can help you build the expertise and credentials to
          advance in today's dynamic security landscape.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {opportunities.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 px-6 py-6 transition-colors hover:bg-white/10"
            >
              {/* Icon box */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Icon className="h-5 w-5 text-accent-content/80" />
              </div>

              {/* Text */}
              <div>
                <h3 className="mb-1.5 font-bold text-accent-content">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-accent-content/55">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
