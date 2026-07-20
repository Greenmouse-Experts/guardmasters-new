import {
  ShieldCheck,
  Search,
  ClipboardList,
  GraduationCap,
  Lock,
  Landmark,
  Camera,
  Users,
  UserCog,
  Plane,
  Truck,
  Lightbulb,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

interface Opportunity {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
  title: string;
  description: string;
}

const opportunities: Opportunity[] = [
  {
    Icon: ShieldCheck,
    color: "bg-[#5B3FA0]",
    title: "Corporate Security Manager",
    description:
      "Oversee and develop security strategies, policies, and operation to protect people, assets and organizational value.",
  },
  {
    Icon: Search,
    color: "bg-[#1F6B4A]",
    title: "Fraud Investigator / Forensic Analyst",
    description:
      "Investigate fraud, misconduct, and financial crimes using forensic techniques.",
  },
  {
    Icon: ClipboardList,
    color: "bg-[#1E3A5F]",
    title: "Risk & Resilience Consultant",
    description:
      "Assess risks and build resilience frameworks to help organization anticipate, prepare for, and adapt to disruptions",
  },
  {
    Icon: GraduationCap,
    color: "bg-[#7A3B1E]",
    title: "Security Trainer / Educator",
    description:
      "Design and deliver training programs to build security awareness, competence, and professional development across organizations.",
  },
  {
    Icon: Lock,
    color: "bg-[#3B4FAA]",
    title: "Information Security Specialist",
    description:
      "Protect digital asset, manage cybersecurity risks, and ensure compliance with information security standards and best practices.",
  },
  {
    Icon: Landmark,
    color: "bg-[#0F766E]",
    title: "Security Compliances & Governance Officer",
    description:
      "Ensure adherence to laws, regulations, and standards while strengthening governance, ethics, and corporate compliance.",
  },
  {
    Icon: Camera,
    color: "bg-[#166534]",
    title: "Physical Security Manager",
    description:
      "Manage physical security programs including access control, surveillance, guarding, and loss prevention initiatives.",
  },
  {
    Icon: Users,
    color: "bg-[#3D5A3E]",
    title: "Business Continuity Manager",
    description:
      "Lead business continuity and crisis management initiatives to ensure operational continuity during disruptions and emergencies.",
  },
  {
    Icon: UserCog,
    color: "bg-[#6B2D2D]",
    title: "Security Operations Manager",
    description:
      "Lead day-to-day security operations, teams, and technology to ensure efficiency, effectiveness, and continuous improvement.",
  },
  {
    Icon: Plane,
    color: "bg-[#C05621]",
    title: "Travel Security Manager",
    description:
      "dentify risks and implement security controls across supply chains to safeguard goods, information, and business continuity.",
  },
  {
    Icon: Truck,
    color: "bg-[#1D4ED8]",
    title: "Supply Chain Security Specialist",
    description:
      "Identify risks and implement security controls across supply chains to safeguard goods, information, and business continuity.",
  },
  {
    Icon: Lightbulb,
    color: "bg-[#6D28D9]",
    title: "Security Consultant / Advisor",
    description:
      "Provide expert advice and solutions to organizations on security strategy, risk management, and program improvement.",
  },
];

export default function Opportunity() {
  return (
    <section className="bg-accent px-6 py-20 md:px-16">
      <div className="container mx-auto">
        <h2 className="mb-4 text-4xl font-bold text-accent-content uppercase text-center font-pop">
          Career <span className="text-primary">Opportunities</span>
        </h2>
        <p className="mb-12 text-center text-base leading-relaxed text-accent-content/60">
          Our programs can help you build the expertise and credentials to
          advance in today's dynamic security landscape.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {opportunities.map(({ Icon, color, title, description }) => (
            <div
              key={title}
              className="flex items-start gap-5 rounded-2xl border border-primary/40 bg-white/5 px-6 py-6 transition-colors hover:bg-white/10"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>

              <div>
                <h3 className="mb-1.5 font-bold text-accent-content">
                  {title}
                </h3>
                <p className=" leading-relaxed text-accent-content/55">
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
