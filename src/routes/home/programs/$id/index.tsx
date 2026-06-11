import { createFileRoute } from "@tanstack/react-router";
import { Award, Clock, GraduationCap } from "lucide-react";
import ProgramHero from "./-components/Programhero";
import ProgramCertificate from "./-components/ProgramCertificate";
import EnrollMore from "./-components/EnrollMore";
import ProgramInfo from "./-components/ProgramInfo";
import Modules from "./-components/Modules";

export const Route = createFileRoute("/home/programs/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const programTitle = decodeURIComponent(id);
  return (
    <>
      <ProgramHero
        badge="01/ Mini-MBA"
        title={
          <>
            Mini-MBA (Security
            <br />
            Project Management)
          </>
        }
        description="Plan, budget, and deliver complex security projects on time and on scope. Learn modern PM frameworks, risk control, and stakeholder leadership for security environments."
        price="CA$595"
        image="/features/mba.png"
        imageAlt="Mini-MBA (Security Project Management)"
        stats={[
          { icon: Clock, label: "Duration", value: "60 hrs" },
          { icon: GraduationCap, label: "Level", value: "Advanced" },
          { icon: Award, label: "CPE Credits", value: "40" },
        ]}
      />
      <ProgramCertificate
        badge="Credentials"
        title={
          <>
            You earn a credential
            <br />
            the industry <em className="text-white italic">already trusts.</em>
          </>
        }
        description={
          <>
            On successful completion you receive the{" "}
            <span className="font-medium text-white">
              Guardmaster Mini-MBA Certificate
            </span>
            , issued by Guardmaster Institute of Corporate Security Management
            Canada — an{" "}
            <span className="text-primary">
              ASIS-International Preferred CPE Provider
            </span>{" "}
            and ACTD-accredited training institution.
          </>
        }
        features={[
          "Up to 40 ASIS-International CPE credits",
          "Verifiable digital certificate of completion",
          "Issued under the Guardmaster Institute seal",
          "Recognized internationally by ASIS, IFPO, and ChLPS",
        ]}
        image="/students.jpg"
        imageAlt="Students learning together"
      />
      <ProgramInfo
        badge="Outcomes"
        title={
          <>
            What you'll{" "}
            <em className="text-secondary italic">walk away with.</em>
          </>
        }
        description="Practical, board-ready competencies — not just theory. Designed for direct application the day you return to your organization."
        outcomes={[
          `Earn the ${programTitle}`,
          "Up to 30 ASIS-International CPE credits toward your recertification.",
          `Apply ${programTitle} aligned to global best practice.`,
          "Build the strategic vocabulary expected by executives and boards.",
          "Translate theory into real-world organizational outcomes.",
          "Join a global cohort of practitioner-led peers.",
        ]}
      />
      <Modules
        modules={[
          {
            title: "Module 1 — Foundations of Asset and Protection Principles",
            description:
              "Business fundamentals, principles of management and leadership, organizational behaviour, and financial literacy for security managers.",
            topics: [
              "Asset Protection Concepts and Evolution",
              "The Protection Officer as a Leader",
              "The Role of the Professional Protection Officer",
              "Career Planning for Protection Officers",
              "The Security Officer of the 21st Century",
              "Professional Ethics and Conduct in Security Operations",
            ],
          },
          {
            title: "Module 2 — Communications",
            description:
              "This module focuses on effective communication as a critical operational skill for Protection Officers. It covers verbal and non-verbal communication, report writing, radio procedures, incident briefings, and professional interaction with clients, colleagues",
          },
          {
            title: "Module 3 — Protection Officer Functions",
            description:
              "This module examines the core duties and responsibilities of the Protection Officer in operational environments.",
          },
          {
            title: "Module 4 — Crime Prevention and Physical Security",
            description:
              "This module introduces crime prevention principles and practical physical security measures used to deter, detect, and respond to threats.",
          },
          {
            title: "Module 5 — Safety and Fire Protection",
            description:
              "This module addresses workplace safety responsibilities and fire protection fundamentals relevant to Protection Officers.",
          },
        ]}
      />
      <EnrollMore
        badge="Enroll"
        title={
          <>
            One investment.{" "}
            <em className="text-secondary italic">Career-long</em> dividends.
          </>
        }
        description="Talk to admissions about cohort dates, corporate group rates, and continuing-education credit transfer."
        price="CA$595"
        priceNote="One-time tuition"
        includes={[
          "60 hrs of immersive content",
          "40 ASIS CPE credits",
          "Lifetime access to materials",
          "Certificate on successful completion",
          "Practitioner-led faculty",
        ]}
        relatedBadge="More courses"
        relatedTitle="Continue your pathway."
        relatedCourses={[
          {
            id: "security-supervision-management",
            category: "Mini-MBA",
            level: "Intermediate",
            title: "Mini-MBA Security Supervision & Management",
            price: "CA$595",
          },
          {
            id: "security-project-management",
            category: "Mini-MBA",
            level: "Advanced",
            title: "Mini-MBA Security Project Management",
            price: "CA$595",
          },
          {
            id: "security-guard-force-management",
            category: "Mini-MBA",
            level: "Intermediate",
            title: "Mini-MBA Security Guard Force Management",
            price: "CA$595",
          },
        ]}
      />
    </>
  );
}
