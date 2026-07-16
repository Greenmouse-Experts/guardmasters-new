import { createFileRoute } from "@tanstack/react-router";
import ProgramHero from "./-components/Programhero";
import ProgramCertificate from "./-components/ProgramCertificate";
import EnrollMore from "./-components/EnrollMore";
import ProgramInfo from "./-components/ProgramInfo";
import Modules from "./-components/Modules";
import Curriculum from "./-components/Curriculum";
import Comments from "./-components/Comments";
import { defaultProgramId, programs } from "./-info/programs";
import { useQuery } from "@tanstack/react-query";
import apiClient from "#/client/api.ts";
import PageLoader from "#/components/layout/PageLoader.tsx";
import type { CourseProgramSingle } from "#/types/courses.ts";

export const Route = createFileRoute("/home/programs/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const program = programs[id] ?? programs[defaultProgramId];
  // const query = useQuery({
  //   queryKey: ["course"],
  // });
  const query = useQuery<CourseProgramSingle>({
    queryFn: async () => {
      let resp = await apiClient.get(`course-content/public/${id}`);
      return resp.data;
    },
    queryKey: ["course-content", id],
  });
  return (
    <>
      {(query.isLoading || query.isError) && (
        <>
          <div className="from-black bg-linear-180 via-black/80 to-black/80 h-30"></div>
        </>
      )}
      <PageLoader query={query}>
        {(resp) => {
          const course = resp.course;
          const price =
            course.discountPriceFormat ?? course.originalPriceFormat;
          const totalDuration = resp.contents.totalDuration;
          const durationLabel =
            totalDuration >= 60
              ? `${(totalDuration / 60).toFixed(1)} hours of on-demand content`
              : `${totalDuration} minutes of on-demand content`;
          const includes = [
            durationLabel,
            "Certificate of completion",
            "Full lifetime access",
            "Access on mobile and desktop",
          ];
          return (
            <>
              <ProgramHero
                badge={course.program.title}
                title={course.title}
                description={course.shortDesc}
                price={price}
                image={course.coverImage || program.image}
                imageAlt={course.title}
                stats={program.stats}
                cartItem={{
                  id: String(course.id),
                  coverImg: course.coverImage,
                  title: course.title,
                  price: course.price,
                  fmprice: course.originalPriceFormat,
                }}
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
                outcomes={[...(course.courseOutcomes ?? [])]
                  .sort((a, b) => a.order - b.order)
                  .map((o) => o.description)}
              />
              <Curriculum sections={resp.contents.data} />
              {/*<Modules modules={modules} />*/}
              <ProgramCertificate
                badge="Credentials"
                title={
                  <>
                    You earn a credential
                    <br />
                    the industry{" "}
                    <em className="text-white italic">already trusts.</em>
                  </>
                }
                description={
                  <>
                    On successful completion you receive the{" "}
                    <span className="font-medium text-white">
                      Guardmaster {course.title}
                    </span>
                    , issued by Guardmaster Institute of Corporate Security
                    Management Canada — an{" "}
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
              <Comments
                badge="Reviews"
                title={
                  <>
                    What graduates{" "}
                    <em className="text-secondary italic">are saying.</em>
                  </>
                }
                description="Real feedback from security professionals who've completed the program and applied it in the field."
                courseId={String(course.id)}
              />
              <EnrollMore
                badge="Enroll"
                programId={resp.course.program.id}
                currentCourseId={String(resp.course.id)}
                cartItem={{
                  id: String(course.id),
                  coverImg: course.coverImage,
                  title: course.title,
                  price: course.price,
                  fmprice: course.originalPriceFormat,
                }}
                title={
                  <>
                    One investment.{" "}
                    <em className="text-accent italic">Career-long</em>{" "}
                    <em className="text-primary">dividends.</em>
                  </>
                }
                description="Talk to admissions about cohort dates, corporate group rates, and continuing-education credit transfer."
                price={price}
                priceNote="per enrollment"
                includes={includes}
                relatedBadge="More courses"
                relatedTitle="Continue your pathway."
              />
            </>
          );
        }}
      </PageLoader>
    </>
  );
}
