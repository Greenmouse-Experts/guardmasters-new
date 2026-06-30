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
          <span className="mb-5 inline-block rounded-full border border-base-content/20 px-4 py-1.5  text-secondary uppercase">
            Lead Faculty &amp; Programs Director
          </span>
          <h2 className="text-4xl font-semibold text-base-content md:text-5xl">
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
