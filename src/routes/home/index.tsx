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

const accreditations = [
  {
    image: "/accredition/asis.png",
    name: "ASIS International",
    role: "Preferred CPE Provider",
  },
  {
    image: "/accredition/ifpo.png",
    name: "IFPO — USA",
    role: "Approved Training Centre",
  },
  {
    image: "/accredition/chlps.png",
    name: "ChLPS Canada",
    role: "Accredited Provider",
  },
  {
    image: "/accredition/iso.png",
    name: "ISO Standards",
    role: "Accredited Trainer",
  },
  {
    image: "/accredition/csi.png",
    name: "CSI Spain",
    role: "Approved Training Centre",
  },
  {
    image: "/accredition/actd.png",
    name: "ACTD — USA",
    role: "Accredited Institution",
  },
];

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

      <section className="bg-base-200 px-6 py-16 md:px-16">
        <div className="container mx-auto grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: copy */}
          <div>
            <span className="mb-6 inline-block rounded-full border border-base-content/20 px-4 py-1.5  font-bold tracking-[0.18em] text-accent uppercase bg-secondary/10">
              Certifications
            </span>
            <h2 className="text-4xl leading-tight font-light text-base-content md:text-5xl">
              Certifications that build confidence,
              <br />
              credibility, and{" "}
              <em className="italic font-light text-accent">career growth.</em>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-base-content/70">
              We equip corporate security and allied professionals with
              industry-relevant education, recognized certifications,
              ISO-standard training, and strategic advisory support.
            </p>
          </div>

          {/* Right: credentials grid */}
          <div>
            <h3 className="text-xl font-semibold text-base-content">
              Recognized Training Credentials
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-base-content/55">
              A structured view of accreditation, provider status, and global
              training recognition.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {accreditations.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-4 rounded-2xl bg-base-10 p-4 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 shrink-0 object-contain"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-base-content">
                      {item.name}
                    </p>
                    <p className="text-xs font-medium tracking-[0.1em] text-base-content/45 uppercase">
                      {item.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="py-8 bg-accent">
        <section
          data-theme=""
          className="py-8  mx-auto container bg-transparent"
        >
          <div className="mb-12 text-accent-content">
            <span className="mb-6 inline-block rounded-full border border-accent-content/20 px-4 py-1.5   tracking-[0.18em] uppercase bg-white text-accent font-bold">
              The Guardmaster Advantage
            </span>
            <h2 className="max-w-5xl text-4xl leading-tight font-light  md:text-5xl">
              Empowering the Next Generation
              <br />
              of Security Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 border-t border-l border-secondary/50 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="border-r border-b border-secondary/50 bg-accent text-accent-content p-10"
              >
                <div className="mb-8 inline-flex  items-center justify-center rounded border border-secondary/20 bg-primary p-2.5">
                  <Icon className="size-8 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-xl font-semibold ">{title}</h3>
                <p className=" leading-relaxed text-accent-content/60">
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
      {/*<Footer />*/}
    </>
  );
}
