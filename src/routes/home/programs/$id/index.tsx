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
import type { CourseComment, CourseProgramSingle } from "#/types/courses.ts";

const comments: CourseComment[] = [
  {
    id: "1",
    name: "Adaeze Okonkwo",
    role: "Security Operations Manager",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    body: "The most practical security program I've taken. I walked back into my role with frameworks I could apply the very next morning — not abstract theory.",
    date: "Mar 2026",
  },
  {
    id: "2",
    name: "Daniel Mensah",
    role: "Corporate Risk Lead",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    body: "Worth every credit. The instructors clearly come from the field, and the ASIS CPE recognition made it an easy sell to my employer.",
    date: "Feb 2026",
  },
  {
    id: "3",
    name: "Fatima Bello",
    role: "Loss Prevention Supervisor",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 4,
    body: "Rigorous and well-structured. The curriculum moves fast, but the modules are organized so you never feel lost. The credential opened doors for me.",
    date: "Jan 2026",
  },
  {
    id: "4",
    name: "Kwame Asante",
    role: "Facility Security Officer",
    avatar: "https://i.pravatar.cc/150?img=68",
    rating: 5,
    body: "Internationally recognized and genuinely respected in our industry. My board signed off on the investment after seeing the accreditation.",
    date: "Dec 2025",
  },
  {
    id: "5",
    name: "Ngozi Eze",
    role: "Investigations Analyst",
    avatar: "https://i.pravatar.cc/150?img=24",
    rating: 5,
    body: "The verifiable digital certificate is a nice touch. Clients and recruiters can confirm my credentials instantly — it carries real weight.",
    date: "Nov 2025",
  },
  {
    id: "6",
    name: "Samuel Adeyemi",
    role: "Head of Physical Security",
    avatar: "https://i.pravatar.cc/150?img=51",
    rating: 4,
    body: "A career-defining program. The pathway into more advanced courses keeps you growing long after the cohort ends. Highly recommended.",
    date: "Oct 2025",
  },
];

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
          const modules = resp.contents.data.map((content) => ({
            title: content.title,
            description: content.courseContentSubs
              .map((s) => s.title)
              .join(", "),
          }));
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
                outcomes={program.outcomes}
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
                comments={comments}
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
                    <em className="text-secondary italic">Career-long</em>{" "}
                    dividends.
                  </>
                }
                description="Talk to admissions about cohort dates, corporate group rates, and continuing-education credit transfer."
                price={price}
                priceNote={program.priceNote}
                includes={program.includes}
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
