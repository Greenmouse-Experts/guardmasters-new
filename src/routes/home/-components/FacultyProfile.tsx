import { useRef } from "react";
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
  type LucideIcon,
} from "lucide-react";
import Modal, { type ModalHandle } from "#/components/modals/DialogModal.tsx";

const credentials =
  "PHD, MSC, MBA, PGCERT · CA, CFE, CFI, CAMS, CFCS, LPC, CHLPS, CPSM, CCLP, CPO, CPOI, CBRM, CBCS, ABCP, CC, CSCE, CSP, CSL, C-CSP, MSYI, M.ISRM, CMGR, MCMI, CPP®";

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

export default function FacultyProfile() {
  const modalRef = useRef<ModalHandle>(null);

  return (
    <section className="bg-base-200 px-6 pt-20 md:px-16 relative">
      <div className="container mx-auto grid grid-cols-3 gap-12  lg:gap-16">
        {/* Photo + areas of expertise */}
        <div className="h-fit rounded-2xl bg-accent p-5 pb-48">
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

        {/* Bio (preview) */}
        <div className="col-span-2">
          <div className="font-pop font-bold text-3xl mb-4">
            Lead Faculty &amp; Programs Director
          </div>
          <h2 className="text-lg text-accent font-semibold md:text-5xl">
            Dr. Adegbenga <span className="text-accent">William Koko</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed tracking-wide text-base-content/50 uppercase">
            {credentials}
          </p>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-base-content/90">
            <p>
              An accomplished corporate security, risk, business continuity
              management, and loss prevention expert with over{" "}
              <strong className="font-semibold text-base-content">
                15 years
              </strong>{" "}
              of progressive experience spanning corporate security operations,
              auditing, regulatory compliance, financial forensics,
              investigations, and anti-money laundering.
            </p>
            <p>
              As a distinguished trainer, consultant, and thought leader, he is
              dedicated to shaping the next generation of security and risk
              professionals through immersive professional education and
              strategic advisory. Dual-licensed by the Ontario Ministry of the
              Solicitor General as a security professional and private
              investigator, he leads the development and delivery of Guardmaster
              Institute's cutting-edge professional training and certification
              programs.
            </p>
            <p>
              He serves as an Accredited Trainer and Faculty Member with the{" "}
              <strong className="font-semibold text-base-content">
                Global Compliance Institute (GCI), Australia
              </strong>{" "}
              delivering specialized certification training in AML, CTF, and
              regulatory compliance frameworks. He is also an accredited trainer
              by the{" "}
              <strong className="font-semibold text-base-content">
                CPD Group, UK.
              </strong>
            </p>

            {/* Read more → opens modal */}
            <button
              onClick={() => modalRef.current?.open()}
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent/80"
            >
              Read more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
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

      {/* ── Full bio modal ── */}
      <Modal ref={modalRef} title="Dr. Adegbenga William Koko">
        <div className="space-y-5 text-base leading-relaxed text-base-content/70">
          <p>
            An accomplished corporate security, risk, business continuity
            management, and loss prevention expert with over{" "}
            <strong className="font-semibold text-base-content">
              15 years
            </strong>{" "}
            of progressive experience spanning corporate security operations,
            auditing, regulatory compliance, financial forensics,
            investigations, and anti-money laundering.
          </p>
          <p>
            As a distinguished trainer, consultant, and thought leader, he is
            dedicated to shaping the next generation of security and risk
            professionals through immersive professional education and strategic
            advisory. Dual-licensed by the Ontario Ministry of the Solicitor
            General as a security professional and private investigator, he
            leads the development and delivery of Guardmaster Institute's
            cutting-edge professional training and certification programs.
          </p>
          <p>
            He serves as an Accredited Trainer and Faculty Member with the{" "}
            <strong className="font-semibold text-base-content">
              Global Compliance Institute (GCI), Australia
            </strong>{" "}
            delivering specialized certification training in AML, CTF, and
            regulatory compliance frameworks. He is also an accredited trainer
            by the{" "}
            <strong className="font-semibold text-base-content">
              CPD Group, UK.
            </strong>
          </p>
          <p>
            He holds a{" "}
            <strong className="font-semibold text-base-content">
              Doctor of Philosophy (PhD) in Management
            </strong>
            , a Master of Science (MSc) in International Security &amp; Risk
            Management, an MBA in Finance &amp; Corporate Strategy, an MSc in
            Forensic Accounting &amp; Audit, and a Bachelor's degree (BBA) in
            Corporate Security Management. He also holds Postgraduate
            Certificates in Forensic Accounting, Project Management, Emergency
            Management, Supply Chain Management, Global Logistics, and Risk
            Management.
          </p>
          <p>
            He is an alumnus of the{" "}
            <strong className="font-semibold text-base-content">
              University of West London, UK
            </strong>
            ; SMC University, Switzerland; Charisma University, Turks &amp;
            Caicos Islands; Obafemi Awolowo University, Nigeria; George Brown
            Polytechnic, Fanshawe College, Seneca Polytechnic, Algonquin
            College, Centennial College, and York University — all in
            Ontario/Canada; as well as Texila American University, Guyana. He is
            also an alumnus of{" "}
            <strong className="font-semibold text-base-content">
              Zenith Bank International
            </strong>{" "}
            and{" "}
            <strong className="font-semibold text-base-content">
              PwC Canada
            </strong>
            .
          </p>
          <p>
            His professional credentials reflect a rare depth of
            multidisciplinary expertise: ASIS Board-Certified Protection
            Professional (CPP), ISO-KLG Certified Physical Security Manager
            (CPSM), IFPO Certified Protection Officer (CPO) &amp; Instructor
            (CPOI), Certified Anti-Money Laundering Specialist (CAMS), Certified
            Financial Crime Specialist (CFCS), Certified Business Resilience
            Manager (CBRM), Associate Business Continuity Professional (ABCP),
            Certified Business Continuity Specialist (CBCS), Certified Safety
            Management Professional (CSMP), Certified Internal Controls Auditor
            (CICA), Certified Fraud Examiner (CFE), Certified Compliance Manager
            (CCM), Certified Forensic Investigator (CFI), Chartered Loss
            Prevention Specialist (ChLPS), CITT Certified Logistics Professional
            (CCLP), Loss Prevention Certified (LPC), Chartered Accountant (CA),
            ISC² Certified in Cybersecurity (CC), Certified Converged Security
            Professional (CSP), Converged Security Leader (CSL), Chartered
            Converged Security Professional (C-CSP), and Professional Strategic
            Risk Manager (M.ISRM). He is a Certified Lead Auditor and Lead
            Implementer in{" "}
            <strong className="font-semibold text-base-content">
              ISO 27001, ISO 18788, ISO 31000, ISO 28000, ISO 22301, and ISO
              42001
            </strong>
            , and holds the Chartered Manager (CMgr, MCMI) designation in both
            the United Kingdom and Canada.
          </p>
        </div>
      </Modal>
    </section>
  );
}
