import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  ClipboardList,
  Target,
  GraduationCap,
  Globe,
  Truck,
} from "lucide-react";
import HomeNav from "./-components/HomeNav";
import Hero from "./-components/Hero";
import Courses from "./-components/Courses";
import Featured from "./-components/Featured";
import ForeFront from "./-components/ForeFront";
import Accredition from "./-components/Accredition";
import Experience from "./-components/Experience";
import FaqCert from "./-components/FaqCert";
import Footer from "./-components/Footer";

export const Route = createFileRoute("/home/")({
  component: RouteComponent,
});

const features = [
  {
    icon: Award,
    title: "Accredited Programs",
    description:
      "Internationally accredited training combining business knowledge with advanced corporate security expertise.",
  },
  {
    icon: ClipboardList,
    title: "Tailored Certifications",
    description:
      "Entry-level to advanced certifications, Mini-MBAs, and Masterclasses across the corporate security spectrum.",
  },
  {
    icon: Target,
    title: "Career-Focused",
    description:
      "Results-focused education that sharpens problem-solving and prepares you for global certifications.",
  },
  {
    icon: GraduationCap,
    title: "Expert Faculty",
    description:
      "Real-world expertise from leading corporate security, risk, and continuity practitioners.",
  },
  {
    icon: Globe,
    title: "ISO-Integrated",
    description:
      "Curriculum aligned with ISO international standards — implement and audit with confidence.",
  },
  {
    icon: Truck,
    title: "Immersive Delivery",
    description:
      "Live webinars, real-case analysis, integrative workshops — never just slides.",
  },
];

function RouteComponent() {
  return (
    <>
      <HomeNav />
      <Hero />

      <section className="container mx-auto py-8">
        <div className="container mx-auto flex flex-col gap-12 md:flex-row md:items-start md:gap-20">
          <div className="md:w-1/2">
            <span className="mb-6 inline-block rounded-full border border-base-content/20 px-4 py-1.5  font-medium tracking-[0.18em] text-accent uppercase">
              Our Mission
            </span>
            <h2 className="text-4xl leading-tight font-light  md:text-5xl">
              The certifications
              <br />
              you need for the
              <br />
              <em className="italic font-light text-secondary">
                career you want.
              </em>
            </h2>
          </div>

          <div className="md:w-1/2">
            <p className="mb-8 text-base leading-relaxed text-base-content/70">
              We equip corporate security and allied professionals with the
              knowledge, skills, and support they need through cutting-edge
              education, relevant professional certifications, ISO standards
              training, forward-looking research, and strategic advisory.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "ASIS-International Preferred CPE Provider",
                "IFPO-USA Approved Training Centre",
                "ChLPS-Canada Accredited Provider",
                "ACTD-USA Accredited Institution",
                "ISO Standards Accredited Trainer",
                "Converged Security Institute Partner",
              ].map((badge) => (
                <span
                  key={badge}
                  className=" bg-secondary px-4 py-2 text-sm font-medium text-secondary-content"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-base-200 py-8">
        <section
          data-theme=""
          className="py-8  mx-auto container bg-transparent"
        >
          <div className="mb-12 ">
            <span className="mb-6 inline-block rounded-full border border-base-content/20 px-4 py-1.5 text-accent font-medium tracking-[0.18em] uppercase">
              The Guardmaster Advantage
            </span>
            <h2 className="max-w-5xl text-4xl leading-tight font-light  md:text-5xl">
              Empowering the Next Generation
              <br />
              of Security Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 border-t border-l border-base-300 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="border-r border-b border-base-300 bg-base-100 p-10"
              >
                <div className="mb-8 inline-flex bg-primary items-center justify-center rounded border border-base-300 p-2.5">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-xl font-semibold ">{title}</h3>
                <p className="text-sm leading-relaxed text-base-content/60">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Courses />
      <Featured />
      <ForeFront />
      <Accredition />
      <Experience />
      <FaqCert />
      <Footer />
    </>
  );
}
