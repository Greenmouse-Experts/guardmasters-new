import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
import ImagelessHeader from "../-components/headers/ImagelessHeader";

export const Route = createFileRoute("/home/accreditations/")({
  component: RouteComponent,
});

const accreditations = [
  {
    logo: "/accredition/ifpo.png",
    role: "Approved Training Centre (ATC)",
    name: "IFPO — USA",
    org: "International Foundation for Protection Officers",
    description:
      "Authorized to deliver IFPO programs including the Certified Protection Officer (CPO) and Certified in Security Supervision and Management (CSSM).",
  },
  {
    logo: "/accredition/asis.png",
    role: "Preferred CPE Provider",
    name: "ASIS",
    org: "ASIS International",
    description:
      "Learners earn up to 40 CPE credits from our Mini-MBA and Masterclass programs — globally recognized continuing education.",
  },
  {
    logo: "/accredition/actd.png",
    role: "Accredited Training Institution",
    name: "ACTD — USA",
    org: "American Council of Training and Development",
    description:
      "Accredited as a Professional Training Institution by ACTD — a mark of training quality and operational excellence.",
  },
  {
    logo: "/accredition/chlps.png",
    role: "Accredited Training Provider",
    name: "ChLPS — Canada",
    org: "Chartered Loss Prevention Specialists of Canada",
    description:
      "Authorized to deliver ChLPS certification courses in the loss prevention field across Canadian jurisdictions.",
  },
  {
    logo: "/accredition/csi.png",
    role: "Approved Training Centre",
    name: "CSI — Spain",
    org: "Converged Security Institute",
    description:
      "Approved Training Centre offering accredited trainings for CSI certifications in converged security.",
  },
  {
    logo: "/accredition/iso.png",
    role: "Accredited Trainer",
    name: "ISO",
    org: "ISO Standards",
    description:
      "Accredited to deliver specialized ISO-based training equipping security professionals to implement and audit ISO standards.",
  },
];

function RouteComponent() {
  return (
    <>
      <ImagelessHeader
        badge="Trust & Recognition"
        title={
          <>
            Our global{" "}
            <em className="text-primary italic">accreditations.</em>
          </>
        }
        description="Recognized and accredited by leading professional regulatory and certification bodies in the global security industry — affirming our commitment to excellence and international standards."
      />

      <section
        data-theme="guard"
        className="bg-base-200 px-6 py-16 md:px-16 md:py-20"
      >
        <div className="container mx-auto overflow-hidden border border-base-300 bg-base-100">
          {accreditations.map((item) => (
            <div
              key={item.name}
              className="grid grid-cols-1 items-start gap-6 border-b border-base-300 p-8 last:border-b-0 md:grid-cols-[120px_1fr_1.4fr_auto] md:gap-10 md:p-10"
            >
              <div className="flex h-24 w-24 items-center justify-center">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <div className="mb-2 text-[11px] font-medium tracking-[0.15em] text-base-content/50 uppercase">
                  {item.role}
                </div>
                <h3 className="text-2xl font-light text-accent md:text-3xl">
                  {item.name}
                </h3>
              </div>

              <div>
                <div className="mb-2 text-sm text-base-content/50">
                  {item.org}
                </div>
                <p className="leading-relaxed text-base-content/80">
                  {item.description}
                </p>
              </div>

              <BadgeCheck className="h-6 w-6 shrink-0 text-secondary md:justify-self-end" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
