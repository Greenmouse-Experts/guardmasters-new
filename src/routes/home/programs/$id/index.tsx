import { createFileRoute } from "@tanstack/react-router";
import ProgramHero from "./-components/Programhero";
import ProgramCertificate from "./-components/ProgramCertificate";
import EnrollMore from "./-components/EnrollMore";
import ProgramInfo from "./-components/ProgramInfo";
import Modules from "./-components/Modules";
import { defaultProgramId, programs } from "./-info/programs";

export const Route = createFileRoute("/home/programs/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const program = programs[id] ?? programs[defaultProgramId];

  return (
    <>
      <ProgramHero
        badge={program.number}
        title={program.fullTitle}
        description={program.description}
        price={program.formattedPrice}
        image={program.image}
        imageAlt={program.imageAlt}
        stats={program.stats}
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
              Guardmaster {program.fullTitle}
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
        outcomes={program.outcomes}
      />
      <Modules modules={program.modules} />
      <EnrollMore
        badge="Enroll"
        title={
          <>
            One investment.{" "}
            <em className="text-secondary italic">Career-long</em> dividends.
          </>
        }
        description="Talk to admissions about cohort dates, corporate group rates, and continuing-education credit transfer."
        price={program.formattedPrice}
        priceNote={program.priceNote}
        includes={program.includes}
        relatedBadge="More courses"
        relatedTitle="Continue your pathway."
        relatedCourses={program.relatedCourses}
      />
    </>
  );
}
