import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import ImageHeader from "../home/-components/headers/ImageHeader";

export const Route = createFileRoute("/accreditations/")({
  component: RouteComponent,
});

const accreditations = [
  {
    logo: "/accredition/ifpo.png",
    role: "Approved Training Centre (ATC)",
    name: "IFPO — USA",
    org: "International Foundation for Protection Officers",
    description:
      "Guardmaster Institute is an authorized training centre for the delivery of International Foundation for Protection Officers (IFPO) programs, including the Certified Protection Officer (CPO) and Certified in Security Supervision and Management (CSSM). These internationally recognized programs equip security professionals with practical knowledge, leadership competence, and industry relevant skills for career advancement.",
  },
  {
    logo: "/accredition/asis.png",
    role: "Preferred CPE Provider",
    name: "ASIS",
    org: "ASIS International",
    description:
      "Guardmaster Institute is an ASIS International Preferred CPE Provider, reflecting our commitment to delivering high quality, industry relevant professional education. Eligible learners can earn up to 40 Continuing Professional Education credits through our Mini MBA and Masterclass programs, strengthening their professional competence, supporting certification maintenance, and advancing their careers within the global security profession.",
  },
  {
    logo: "/accredition/actd.png",
    role: "Accredited Training Institution",
    name: "ACTD — USA",
    org: "American Council of Training and Development",
    description:
      "Guardmaster Institute is accredited by the American Council of Training and Development, ACTD USA, as a Professional Training Institution. This accreditation demonstrates our commitment to delivering high quality, industry relevant education through effective learning practices, qualified instruction, rigorous professional standards, and operational excellence across our entire portfolio of training and certification programs.",
  },
  {
    logo: "/accredition/chlps.png",
    role: "Accredited Training Provider",
    name: "ChLPS — Canada",
    org: "Chartered Loss Prevention Specialists of Canada",
    description:
      "Guardmaster Institute is an authorized training provider for the Association of Chartered Loss Prevention Specialists of Canada. We deliver professional certification courses in loss prevention, and asset protection, equipping learners with practical knowledge, recognized credentials, and specialized competencies for successful careers in loss prevention, asset protection, retail security, and related fields.",
  },
  {
    logo: "/accredition/csi.png",
    role: "Approved Training Centre",
    name: "CSI — Spain",
    org: "Converged Security Institute",
    description:
      "Guardmaster Institute is an approved training centre for the Converged Security Institute, CSI-Spain, offering accredited training for CSI professional certifications. Our programs equip security professionals with the knowledge and practical competencies required to integrate physical security, information security, cybersecurity, risk management, and business continuity into a unified security strategy.",
  },
  {
    logo: "/accredition/iso.png",
    role: "Accredited Trainer",
    name: "ISO",
    org: "Standards and Best Practices Global Network",
    description:
      "Guardmaster Institute is an accredited training partner of the Standards and Best Practices Global Network. Through this partnership, we deliver specialized ISO standards training designed to equip security and allied professionals with the practical knowledge, technical competence, and professional confidence required to implement, maintain, evaluate, and audit ISO management systems across diverse industries and organizational environments.",
  },
];

function RouteComponent() {
  return (
    <>
      <ImageHeader
        image="/acc.png"
        badge="Trust & Recognition"
        title={
          <>
            Our global <em className="text-primary italic">accreditations.</em>
          </>
        }
        description="Recognized and accredited by leading professional regulatory and certification bodies in the global security industry — affirming our commitment to excellence and international standards."
      />

      <section className="bg-base-200 px-6 py-16 md:px-16 md:py-20">
        <div className="container mx-auto overflow-hidden border border-base-300 bg-base-100 divide-y divide-primary/80">
          {accreditations.map((item) => (
            <div
              key={item.name}
              className="grid grid-cols-1 items-start gap-6  p-8 last:border-b-0 md:grid-cols-[120px_1fr_1.4fr_auto] md:gap-10 md:p-10"
            >
              <div className="flex h-full items-center justify-center">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="my-auto">
                <div className="mb-2  text-sm  font-medium tracking-[0.15em] uppercase">
                  {item.role}
                </div>
                <h3 className="text-2xl  text-black md:text-3xl font-bold">
                  {item.org}
                </h3>
              </div>

              <div>
                <div className="mb-2  ">{item.org}</div>
                <p className="leading-relaxed text-lg">{item.description}</p>
              </div>

              <BadgeCheck className="h-6 w-6 shrink-0 text-secondary md:justify-self-end" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-base-200 px-6 pb-16 md:px-16 md:pb-20">
        <div className="container mx-auto flex flex-col items-start justify-between gap-8 rounded-2xl bg-base-300 px-8 py-12 md:flex-row md:items-center md:px-14">
          <h2 className="font-pop text-3xl font-bold leading-tight text-accent md:text-4xl lg:text-5xl">
            Credentials that travel with you —{" "}
            <span className="text-primary">everywhere your career goes.</span>
          </h2>

          <Link
            to="/courses"
            search={{ search: "", programId: "" }}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-accent-content transition-colors hover:bg-accent/90"
          >
            Browse certifications
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
