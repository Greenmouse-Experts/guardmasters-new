import { createFileRoute } from "@tanstack/react-router";
import ImagelessHeader from "../-components/headers/ImagelessHeader";
import ProgramCard from "./-components/ProgramCard";

export const Route = createFileRoute("/home/programs/")({
  component: RouteComponent,
});

const programs = [
  {
    id: "01",
    category: "Mini-MBA",
    duration: "60 hrs",
    image: "mini-mba.png",
    title: "Mini-MBA (Security Project Management)",
    description:
      "This program equips professionals to plan, execute, and oversee complex security projects with precision.",
  },
  {
    id: "02",
    category: "Masterclass",
    duration: "40 hrs",
    image: "cpo.png",
    title: "Certified Protection Officer (CPO)",
    description:
      "The globally recognized IFPO certification — the gold standard for protection professionals.",
  },
  {
    id: "03",
    category: "Mini-MBA",
    duration: "32 hrs",
    image: "",
    title: "Mini-MBA (Business Interruption and Emergency Management)",
    description:
      "This Mini-MBA equips professionals with the skills to plan for and manage business interruptions and emergencies.",
  },
  {
    id: "04",
    category: "Masterclass",
    duration: "60 hrs",
    image: "",
    title:
      "Certified in Security Supervision and Management (CSSM) - Masterclass",
    description:
      "This IFPO Certified in Security Supervision and Management (CSSM) program delivers comprehensive security training.",
  },
  {
    id: "05",
    category: "Mini-MBA",
    duration: "40 hrs",
    image: "",
    title: "Mini-MBA (Private Security Business Management)",
    description:
      "This Mini-MBA in Private Security Business Management delivers essential training for running a private security business.",
  },
  {
    id: "06",
    category: "Mini-MBA",
    duration: "32 hrs",
    image: "",
    title: "Mini-MBA (Loss Prevention Management)",
    description:
      "Implement, audit, and lead BCM programs aligned with ISO international standards.",
  },
  {
    id: "07",
    category: "Masterclass",
    duration: "60 hrs",
    image: "",
    title: "Professional Security Officer Certification - Masterclass",
    description:
      "The Professional Security Officer Program (PSOP) is an advanced IFPO certification designed for security officers.",
  },
  {
    id: "08",
    category: "Mini-MBA",
    duration: "40 hrs",
    image: "",
    title: "Mini-MBA (Business Continuity Management)",
    description:
      "This Mini-MBA in Business Continuity Management provides comprehensive training in business continuity.",
  },
  {
    id: "09",
    category: "Masterclass",
    duration: "32 hrs",
    image: "",
    title: "Initial Security Officer Certification - Masterclass",
    description:
      "The Initial Security Officer Program (ISOP) Certification is awarded by the International Foundation for Protection Officers.",
  },
  {
    id: "10",
    category: "Mini-MBA",
    duration: "60 hrs",
    image: "",
    title: "Mini-MBA (Security Audit and Assessment)",
    description:
      "This Mini-MBA in Security Audit and Assessment delivers comprehensive training in security audit and assessment.",
  },
  {
    id: "11",
    category: "Mini-MBA",
    duration: "40 hrs",
    image: "",
    title: "Mini-MBA (Information Security Management)",
    description:
      "This Mini-MBA in Information Security Management delivers advanced training in information security management.",
  },
  {
    id: "12",
    category: "Mini-MBA",
    duration: "32 hrs",
    image: "",
    title: "Mini-MBA (Strategic Security and Investigation Management)",
    description:
      "Master the art and science of investigative leadership in today's high-risk environments.",
  },
  {
    id: "13",
    category: "Masterclass",
    duration: "60 hrs",
    image: "",
    title:
      "Certified Transportation & Trucking Security Specialist (CTTSS™) Certification - Masterclass",
    description:
      "This Certified Transportation and Trucking Security Specialist (CTTSS) program covers transportation security management.",
  },
  {
    id: "14",
    category: "Mini-MBA",
    duration: "40 hrs",
    image: "",
    title: "Mini-MBA (Corporate Security Management)™",
    description:
      "The Mini-MBA (Corporate Security Management)™ is an executive program combining business leadership with security strategy.",
  },
  {
    id: "15",
    category: "Mini-MBA",
    duration: "32 hrs",
    image: "",
    title: "Mini-MBA (Security Supervision & Management)™",
    description:
      "The Mini-MBA (Security Supervision & Management)™ is an executive program combining business leadership principles.",
  },
];

function RouteComponent() {
  return (
    <>
      <ImagelessHeader
        title={
          <>
            <h2>
              Start here. Get certified.{" "}
              <span className="text-primary italic">Go places.</span>
            </h2>
          </>
        }
        description="Programs aligned with IFPO, ASIS, ChLPS, and ISO frameworks — developed for
        relevance, credibility, and career advancement."
        badge="training & certification"
      />
      <section className="container mx-auto px-6 py-16 md:px-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard
              key={program.id}
              id={program.id}
              category={program.category}
              duration={program.duration}
              title={program.title}
              description={program.description}
              image={program.image}
            />
          ))}
        </div>
      </section>
    </>
  );
}
