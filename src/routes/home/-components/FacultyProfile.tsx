import { useState } from "react";

const credentials =
  "PHD, MSC, MBA, PGCERT · CA, CFE, CFI, CAMS, CFCS, LPC, CHLPS, CPSM, CCLP, CPO, CPOI, CBRM, CBCS, ABCP, CC, CSCE, CSP, CSL, C-CSP, MSYI, M.ISRM, CMGR, MCMI, CPP®";

const certifications = [
  "Chartered Converged Security Practitioner",
  "Chartered Loss Prevention Specialist",
  "Chartered Manager (CMgr, MCMI) — UK & Canada",
  "ASIS Board-Certified Protection Professional (CPP)",
  "Certified Anti-Money Laundering Specialist (CAMS)",
  "Certified Fraud Examiner (CFE) & Certified Forensic Investigator (CFI)",
  "ISO Lead Auditor & Lead Implementer— 27001, 22301, 18788, 31000, 28000, 42001",
  "Certified Business Resilience Manager (CBRM) & Business Continuity Specialist (CBCS)",
];

export default function FacultyProfile() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="bg-base-200 px-6 py-20 md:px-16">
      <div className="container mx-auto grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-16">
        <div className="overflow-hidden rounded-2xl">
          <img
            src="/dr.png"
            alt="Dr. Adegbenga William Koko"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <div className="font-pop font-bold text-3xl mb-4">
            Lead Faculty &amp; Programs Director
          </div>
          <h2 className="text-lg text-accent font-semibold  md:text-5xl">
            Dr. Adegbenga <span className="text-accent">William Koko</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed tracking-wide text-base-content/50 uppercase">
            {credentials}
          </p>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-base-content/70">
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

            {/* Expandable section */}
            <div
              className={`grid transition-all duration-500 ease-in-out ${
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-5 pt-5">
                  <p>
                    He holds a{" "}
                    <strong className="font-semibold text-base-content">
                      Doctor of Philosophy (PhD) in Management
                    </strong>
                    , a Master of Science (MSc) in International Security &amp;
                    Risk Management, an MBA in Finance &amp; Corporate Strategy,
                    an MSc in Forensic Accounting &amp; Audit, and a Bachelor's
                    degree (BBA) in Corporate Security Management. He also holds
                    Postgraduate Certificates in Forensic Accounting, Project
                    Management, Emergency Management, Supply Chain Management,
                    Global Logistics, and Risk Management.
                  </p>
                  <p>
                    He is an alumnus of the{" "}
                    <strong className="font-semibold text-base-content">
                      University of West London, UK
                    </strong>
                    ; SMC University, Switzerland; Charisma University, Turks
                    &amp; Caicos Islands; Obafemi Awolowo University, Nigeria;
                    George Brown Polytechnic, Fanshawe College, Seneca
                    Polytechnic, Algonquin College, Centennial College, and York
                    University — all in Ontario/Canada; as well as Texila
                    American University, Guyana. He is also an alumnus of{" "}
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
                    Professional (CPP), ISO-KLG Certified Physical Security
                    Manager (CPSM), IFPO Certified Protection Officer (CPO)
                    &amp; Instructor (CPOI), Certified Anti-Money Laundering
                    Specialist (CAMS), Certified Financial Crime Specialist
                    (CFCS), Certified Business Resilience Manager (CBRM),
                    Associate Business Continuity Professional (ABCP), Certified
                    Business Continuity Specialist (CBCS), Certified Safety
                    Management Professional (CSMP), Certified Internal Controls
                    Auditor (CICA), Certified Fraud Examiner (CFE), Certified
                    Compliance Manager (CCM), Certified Forensic Investigator
                    (CFI), Chartered Loss Prevention Specialist (ChLPS), CITT
                    Certified Logistics Professional (CCLP), Loss Prevention
                    Certified (LPC), Chartered Accountant (CA), ISC² Certified
                    in Cybersecurity (CC), Certified Converged Security
                    Professional (CSP), Converged Security Leader (CSL),
                    Chartered Converged Security Professional (C-CSP), and
                    Professional Strategic Risk Manager (M.ISRM). He is a
                    Certified Lead Auditor and Lead Implementer in{" "}
                    <strong className="font-semibold text-base-content">
                      ISO 27001, ISO 18788, ISO 31000, ISO 28000, ISO 22301, and
                      ISO 42001
                    </strong>
                    , and holds the Chartered Manager (CMgr, MCMI) designation
                    in both the United Kingdom and Canada.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              {expanded ? "Read less" : "Read more"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`size-4 transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
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
      {/*<div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 container mx-auto">
        {certifications.map((cert) => (
          <span
            key={cert}
            className="flex items-center bg-secondary px-4 rounded-xl py-5 text-sm font-medium text-secondary-content"
          >
            {cert}
          </span>
        ))}
      </div>*/}
    </section>
  );
}
