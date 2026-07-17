import { createFileRoute, Link } from "@tanstack/react-router";
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
import { ArrowUpRight, Check, ChevronRight, Lock } from "lucide-react";
import { useCartStore, useIsInCart } from "#/store/cartStore.ts";

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
          const cartItem = {
            id: String(course.id),
            coverImg: course.coverImage,
            title: course.title,
            price: course.price,
            fmprice: course.originalPriceFormat,
          };
          const addItem = useCartStore((s) => s.addItem);
          const openCart = useCartStore((s) => s.openCart);
          const inCart = useIsInCart(cartItem?.id ?? "");

          function handleEnroll() {
            if (!cartItem) return;
            if (inCart) {
              openCart();
              return;
            }
            addItem(cartItem);
          }
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
                // badge="Outcomes"
                title={
                  <>
                    What you'll{" "}
                    <em className="text-primary italic">walk away with.</em>
                  </>
                }
                description="Practical, board-ready competencies — not just theory. Designed for direct application the day you return to your organization."
                outcomes={[...(course.courseOutcomes ?? [])]
                  .sort((a, b) => a.order - b.order)
                  .map((o) => o.description)}
              />
              <Curriculum sections={resp.contents.data} />
              {/*<Modules modules={modules} />*/}

              <section className="">
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
              </section>
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
                    <em className="text-primary italic">are saying.</em>
                  </>
                }
                description="Real feedback from security professionals who've completed the program and applied it in the field."
                courseId={String(course.id)}
              />
              <div className="bg-accent/15 px-6 py-20 md:px-16 md:py-28">
                <div className="container mx-auto grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
                  {/* Left: copy */}
                  <div>
                    <span className="mb-8 inline-block rounded-full border border-base-content/25 bg-base-100 px-5 py-1.5 text-xs font-bold tracking-[0.2em] text-accent uppercase">
                      Enroll
                    </span>

                    <h2 className="mb-8 font-pop text-5xl font-bold leading-tight text-accent md:text-6xl lg:text-7xl">
                      One Investment.
                      <br />
                      Career-long
                      <br />
                      <span className="text-primary">dividend</span>
                    </h2>

                    <p className="max-w-md font-bold text-lg leading-relaxed text-accent">
                      Talk to admissions about cohort dates, corporate group
                      rates, and continuing-education credit transfer.
                    </p>
                  </div>

                  {/* Right: dark pricing card */}
                  <div className="relative overflow-hidden rounded-2xl bg-accent p-8 md:p-10">
                    {/* Subtle circle decoration */}
                    <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full border border-white/5" />
                    <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full border border-white/5" />

                    {/* Price row */}
                    <div className="mb-8 flex items-start justify-between gap-4">
                      <span className="font-pop text-5xl font-bold text-primary md:text-6xl">
                        {price}
                      </span>
                      <span className="mt-2 text-[10px] font-semibold tracking-[0.2em] text-white/30 uppercase">
                        per enrollment
                      </span>
                    </div>

                    {/* Includes list */}
                    <ul className="mb-8 flex flex-col gap-3">
                      {includes.map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <Check
                            className="h-4 w-4 shrink-0 text-primary"
                            strokeWidth={3}
                          />
                          <span className="text-sm text-white/80">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Enroll button */}
                    <button
                      type="button"
                      onClick={handleEnroll}
                      className="btn btn-block h-auto gap-2 rounded-xl border-none bg-primary py-4 text-base font-bold text-accent hover:bg-primary/90"
                    >
                      {inCart ? (
                        <>
                          Added to cart <Check className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Enroll now <ArrowUpRight className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    {/* Advisor link */}
                    <Link
                      to="/home/contact"
                      className="btn btn-block btn-ghost text-white btn-lg hover:text-black rounded-xl mt-4"
                    >
                      Speak to an advisor
                      <ChevronRight className="h-4 w-4" />
                    </Link>

                    {/* Trust line */}
                    <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-white/30">
                      <Lock className="h-3 w-3" />
                      Secure enrollment · Immediate confirmation
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </PageLoader>
    </>
  );
}
