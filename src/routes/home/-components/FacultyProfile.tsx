import type { ReactNode } from "react";
import {
  ShieldCheck,
  TriangleAlert,
  RefreshCw,
  PackageCheck,
  Search,
  ClipboardCheck,
  Banknote,
  FileWarning,
  ShieldBan,
  CalendarDays,
  Globe,
  BadgeCheck,
  IdCard,
  Users,
  UserRound,
  GraduationCap,
  BookOpen,
  Award,
  PenLine,
  type LucideIcon,
} from "lucide-react";

const credentials =
  "PhD, MSc, MBA, CFE, CFCS, CAMS, ChLPS, LPC, CPO, CPOI, CBRM, ABCP, CMgr, CPP";

const expertise: { icon: LucideIcon; label: string }[] = [
  { icon: ShieldCheck, label: "Corporate Security Management" },
  { icon: TriangleAlert, label: "Risk Management" },
  { icon: RefreshCw, label: "Business Continuity & Resilience" },
  { icon: PackageCheck, label: "Loss Prevention & Asset Protection" },
  { icon: Search, label: "Investigations & Forensics" },
  { icon: ClipboardCheck, label: "Regulatory Compliance" },
  { icon: Banknote, label: "Anti-Money Laundering (AML)" },
  { icon: FileWarning, label: "Financial Crime Prevention" },
  { icon: ShieldBan, label: "Counter Terrorist Financing (CTF)" },
];

const stats: { icon: LucideIcon; value: string; label: string }[] = [
  {
    icon: CalendarDays,
    value: "15+",
    label: "Years of International Professional Experience",
  },
  {
    icon: Globe,
    value: "Global",
    label: "Trainer, Consultant & Thought Leader",
  },
  {
    icon: BadgeCheck,
    value: "Accredited",
    label: "Trainer & Faculty Member, Global Compliance Institute",
  },
  {
    icon: IdCard,
    value: "Dual Licensed",
    label: "Security Guard & Private Investigator — Ontario",
  },
  {
    icon: Users,
    value: "Trusted",
    label: "By Organizations & Professionals Across Multiple Sectors",
  },
];

const bio: { icon: LucideIcon; content: ReactNode }[] = [
  {
    icon: UserRound,
    content: (
      <>
        <strong className="font-semibold text-base-content">
          Dr. Adegbenga William Koko
        </strong>{" "}
        is an accomplished corporate security executive, educator, and
        management consultant with more than 15 years of international
        professional experience spanning corporate security management, risk
        management, business continuity, loss prevention, investigations,
        regulatory compliance, financial crime prevention, and anti-money
        laundering.
      </>
    ),
  },
  {
    icon: GraduationCap,
    content: (
      <>
        <strong className="font-semibold text-base-content">
          As Lead Faculty and Programs Director
        </strong>{" "}
        at{" "}
        <strong className="font-semibold text-base-content">
          Guardmaster Institute Canada
        </strong>
        , he leads the design and delivery of executive education, Specialist
        Mini MBA programs, professional certification courses, and corporate
        training initiatives. He is recognized for combining academic excellence
        with extensive industry experience to develop practical, globally
        relevant learning programs.
      </>
    ),
  },
  {
    icon: Globe,
    content: (
      <>
        <strong className="font-semibold text-base-content">
          A dual-licensed Security Guard and Private Investigator
        </strong>{" "}
        in Ontario, Canada, Dr. Koko is an accredited international trainer and
        consultant who has delivered professional education and advisory
        services across multiple sectors. He is also an Accredited Trainer and
        Faculty Member of the Global Compliance Institute, Australia.
      </>
    ),
  },
  {
    icon: BookOpen,
    content: (
      <>
        <strong className="font-semibold text-base-content">
          His academic foundation
        </strong>{" "}
        includes doctoral and postgraduate qualifications in Strategic
        Management, International Security and Risk Management, Business
        Administration, Finance and Corporate Strategy, Forensic Accounting, and
        Business Continuity, earned across respected institutions in Canada, the
        United Kingdom, Nigeria, and the United States.
      </>
    ),
  },
  {
    icon: Award,
    content: (
      <>
        <strong className="font-semibold text-base-content">
          His professional credentials
        </strong>{" "}
        include internationally respected designations in corporate security,
        investigations, fraud examination, financial crime compliance, business
        continuity, information security, cyber security, logistics security,
        occupational health and safety, and management. He is also a Chartered
        Manager in the United Kingdom and Canada.
      </>
    ),
  },
  {
    icon: PenLine,
    content: (
      <>
        <strong className="font-semibold text-base-content">
          As a trainer, author, and thought leader,
        </strong>{" "}
        Dr. Koko is dedicated to advancing professional excellence through
        world-class education, practical research, and innovative learning
        solutions that prepare security professionals to lead with confidence in
        an increasingly complex global environment.
      </>
    ),
  },
];

export default function FacultyProfile() {
  return (
    <section className="bg-base-200 px-6 pt-20 md:px-16 relative">
      <div className="container mx-auto grid grid-cols-3 gap-12  lg:gap-16">
        {/* Photo + areas of expertise */}
        <div className="  bg-accent p-5 pb-48">
          <div className="overflow-hidden  border-2 border-primary/60">
            <img
              src="/dr.png"
              alt="Dr. Adegbenga William Koko"
              className="h-full w-full object-cover"
            />
          </div>

          <h3 className="mt-8 font-pop text-sm font-bold tracking-[0.2em] text-primary uppercase">
            Areas of Expertise
          </h3>
          <div className="mt-3 h-px w-full bg-white/10" />

          <ul className="mt-2 ">
            {expertise.map((item) => (
              <li key={item.label} className="flex items-center gap-3 py-1">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg  text-primary">
                  <item.icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="text-sm text-white/80">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bio */}
        <div className="col-span-2">
          {/* Eyebrow with rule */}
          <div className="mb-6 flex items-center gap-3">
            <UserRound className="h-6 w-6 shrink-0 text-primary" />
            <span className="font-pop text-sm font-bold tracking-[0.2em] text-primary uppercase whitespace-nowrap">
              Lead Faculty and Programs Director
            </span>
            <span className="h-px flex-1 bg-primary/30" />
          </div>

          <h2 className="font-pop text-4xl font-bold text-accent md:text-6xl">
            Dr. Adegbenga William Koko
          </h2>
          <p className="mt-4 text-lg font-semibold text-primary">
            {credentials}
          </p>

          <div className="mt-8 divide-y divide-base-300 pb-48">
            {bio.map((item, i) => (
              <div key={i} className="flex gap-4 py-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <item.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <p className="leading-relaxed text-base-content/70">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating stats bar */}
      <div className="absolute inset-x-0 md:bottom-8">
        <div className="container mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 divide-y divide-base-300 rounded-2xl border border-primary/50 bg-base-100 shadow-xl sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
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
                  <div className="mt-0.5 text-xs leading-snug text-base-content/55">
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
