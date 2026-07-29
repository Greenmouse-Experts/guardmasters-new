import type { ReactNode } from "react";
import {
  ShieldCheck,
  TriangleAlert,
  BadgeCheck,
  Leaf,
  Scale,
  Lock,
  RefreshCw,
  ClipboardCheck,
  HardHat,
  Lightbulb,
  Shield,
  CreditCard,
  CalendarDays,
  Globe,
  IdCard,
  Users,
  UserRound,
  GraduationCap,
  Award,
  PenLine,
  type LucideIcon,
} from "lucide-react";

const credentials = `ISO Committee Professional | CMSA | U.S Data Privacy Officer`;
const acoolades = `ISO/IEC 27001 | ISO 9001 | ISO 14001 | ISO 37001 | ISO/IEC 27701 | ISO 31000 | ISO 45001
ISO 56001 | ISO/IEC 27002 | ISO/IEC 27005 | ISO/IEC 27032 | ISO/IEC 27034 | ISO/IEC 27035
ISO/IEC 42001 | ISO 26000 | ISO 21502 | ESG & Sustainability | DORA | SOC 2 | PCI DSS`;

const expertise: { icon: LucideIcon; label: string }[] = [
  {
    icon: ShieldCheck,
    label: "Information Security Management (ISO/IEC 27001)",
  },
  { icon: BadgeCheck, label: "Quality Management (ISO 9001)" },
  { icon: Leaf, label: "Environmental Management (ISO 14001)" },
  { icon: Scale, label: "Anti-Bribery Management (ISO 37001)" },
  { icon: Lock, label: "Privacy Information Management (ISO/IEC 27701)" },
  { icon: TriangleAlert, label: "Risk Management (ISO 31000)" },
  { icon: RefreshCw, label: "Business Continuity & Disaster Recovery" },
  { icon: HardHat, label: "Occupational Health & Safety (ISO 45001)" },
  { icon: Lightbulb, label: "Innovation Management (ISO 56001)" },
  { icon: Shield, label: "Data Privacy & Governance" },
  { icon: CreditCard, label: "SOC 2 & PCI DSS Compliance" },
  { icon: ClipboardCheck, label: "Audit, Compliance & Assurance" },
];

const stats: { icon: LucideIcon; value: string; label: string }[] = [
  {
    icon: CalendarDays,
    value: "18+",
    label: "Years of International Professional Experience",
  },
  {
    icon: Globe,
    value: "20+",
    label: "Organizations Consulted",
  },
  // {
  //   icon: BadgeCheck,
  //   value: "Accredited",
  //   label: "Trainer & Faculty Member, Global Compliance Institute",
  // },
  {
    icon: Award,
    value: "U.S. Data Privacy Officer",
    label: "Certified Data Privacy Professional",
  },
  {
    icon: Users,
    value: "Global Expertise",
    label: "Fintech | Oil & Gas | Government | Payments | Data Centers | More",
  },
];

const bio: { icon: LucideIcon; content: ReactNode }[] = [
  {
    icon: UserRound,
    content: (
      <>
        <strong className="font-semibold text-black">Femi Awosedo</strong> is a
        seasoned professional member of ISO Committee with over 18 years of
        expertise spanning a wide range of ISO standards, governance frameworks,
        data privacy, risk management, auditing, and organizational resilience.
      </>
    ),
  },
  {
    icon: GraduationCap,
    content: (
      <>
        <strong className="font-semibold text-black">
          As Lead Faculty and Programs Director He has consulted for more than
          20 organizations
        </strong>{" "}
        across fintech, oil and gas, card payment, government, and data center
        sectors, providing strategic guidance on training, implementation,
        certification, recertification, and continuous improvement of Management
        Systems.
      </>
    ),
  },
  {
    icon: Globe,
    content: (
      <>
        <strong className="font-semibold text-black">
          His expertise covers
        </strong>{" "}
        ISO/IEC 27001, ISO 9001, ISO 14001, ISO 37001, ISO/IEC 27701, ISO/IEC
        27002, ISO/IEC 27005, ISO/IEC 27032, ISO/IEC 27034, ISO/IEC 27035,
        ISO/IEC 42001, ISO 26001, ISO 31000, ISO 21502, ISO 45001, ESG and
        Sustainability, DORA, ISO 56001, SOC 2, Disaster Recovery, and PCI DSS.
      </>
    ),
  },
  {
    icon: IdCard,
    content: (
      <>
        <strong className="font-semibold text-black">
          He is a Certified IPC Management Systems Auditor (CMSA),
        </strong>{" "}
        U.S Data Privacy Officer, and proficient in both internal and external
        audit, ensuring compliance, performance, and operational excellence.
      </>
    ),
  },
  {
    icon: Award,
    content: (
      <>
        <strong className="font-semibold text-black">Femi is passionate</strong>{" "}
        about helping organizations strengthen governance, manage risk, ensure
        compliance, and build resilient systems that drive sustainable growth
        and long-term value.
      </>
    ),
  },
  {
    icon: PenLine,
    content: (
      <>
        <strong className="font-semibold text-black">
          His practical approach,
        </strong>{" "}
        deep technical knowledge, and commitment to excellence make him a
        trusted advisor, trainer, and partner in building world-class management
        systems.
      </>
    ),
  },
];

export default function NewFacProf() {
  return (
    <section className="relative bg-base-200 px-6 pt-20 md:px-16">
      <div className="container mx-auto grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
        {/* Photo + areas of expertise */}
        <div className="bg-accent p-5 pb-8 lg:pb-48">
          <div className="overflow-hidden rounded-xl border-2 border-primary/60">
            <img
              src="/femi_2.png"
              alt="Femi Awosedo"
              className="h-full w-full object-cover"
            />
          </div>

          <h3 className="mt-8 font-pop font-bold tracking-[0.2em] text-primary uppercase">
            Areas of Expertise
          </h3>
          <div className="mt-3 h-px w-full bg-white/10" />

          <ul className="mt-2">
            {expertise.map((item) => (
              <li key={item.label} className="flex items-center gap-3 py-1">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-primary">
                  <item.icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="text-white/80">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bio */}
        <div className="lg:col-span-2 ">
          {/* Eyebrow with rule */}
          <div className="mb-6 flex items-center gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <UserRound className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="font-pop text-sm font-bold tracking-[0.18em] text-accent uppercase md:text-base">
              Lead ISO Consultant & Trainer
            </span>
            <span className="hidden h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent sm:block" />
          </div>

          <h2 className="font-pop text-2xl font-bold text-accent md:text-3xl lg:text-5xl">
            Femi Awosedo
          </h2>
          <p className="mt-4 text-base font-semibold text-accent max-w-xl md:text-lg">
            {credentials}
          </p>
          <p className="mt-4 text-base font-semibold text-accent/80  ">
            {acoolades}
          </p>
          <div className="mt-8 divide-y divide-base-300 pb-8 lg:pb-48">
            {bio.map((item, i) => (
              <div key={i} className="flex gap-4 py-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <item.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <p className="leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar — inline on mobile, floating on desktop */}
      <div className="lg:absolute lg:inset-x-0 lg:bottom-8">
        <div className="container mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 divide-y divide-base-300 rounded-2xl border border-primary/50 bg-base-100 shadow-xl sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x lg:divide-y-0">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="flex items-center gap-4 px-6 py-6"
              >
                <stat.icon
                  className="h-9 w-9 shrink-0 text-primary"
                  strokeWidth={1.75}
                />
                <div>
                  <div className="font-pop text-xl font-bold text-accent">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 leading-snug text-black/55">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
