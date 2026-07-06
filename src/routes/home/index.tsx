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
import Offerings from "./-components/Offerings";
import Programs from "./-components/Programs";

export const Route = createFileRoute("/home/")({
  component: RouteComponent,
});

const accreditations = [
  {
    initials: "AS",
    name: "ASIS Preferred CPE Provider",
    description:
      "Learners earn credits from our Mini-MBA and Masterclass training programs.",
  },
  {
    initials: "IF",
    name: "IFPO Approved Training Centre",
    description:
      "Authorized to deliver IFPO programs including CPO and CSSM certifications.",
  },
  {
    initials: "CS",
    name: "CSI Approved Training Centre",
    description:
      "Approved Training Centre for Covered Security Institute certifications.",
  },
  {
    initials: "ISO",
    name: "Accredited ISO Standards Trainer",
    description:
      "Accredited to deliver specialized ISO-based training for security professionals.",
  },
  {
    initials: "CL",
    name: "ChLPS Accredited Training Provider",
    description:
      "Accredited for certification courses and programs in loss prevention.",
  },
  {
    initials: "AC",
    name: "ACTD Accredited Training Institution",
    description:
      "Accredited by the American Council of Training and Development.",
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
      <Programs />

      <section className="bg-accent px-6 py-16 md:px-16">
        <div className="container mx-auto">
          <p className="mx-auto mb-12 max-w-2xl text-center text-white/60">
            Our accreditations and partnerships reflect our commitment to
            delivering world-class education and training that meets global
            standards.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {accreditations.map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center rounded-2xl bg-base-100 px-5 py-8 text-center shadow-lg"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent ring-2 ring-primary">
                  <span className="text-lg font-bold text-primary">
                    {item.initials}
                  </span>
                </div>
                <h3 className="mb-3 text-base font-bold leading-snug text-base-content font-pop">
                  {item.name}
                </h3>
                <p className="text-sm leading-relaxed text-base-content/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/20 px-6 py-5 text-center md:flex-row md:text-left">
            <p className="text-white/80">
              Our accreditations validate our commitment to excellence and
              globally recognized, industry-relevant training.
            </p>
            <button className="btn shrink-0 rounded-lg border-white/30 bg-transparent px-6 font-semibold text-white hover:border-white hover:bg-white/10">
              Learn More About Our Accreditations
            </button>
          </div>
        </div>
      </section>

      <Offerings />
      <Featured />

      <div
        className="py-8 bg-accent"
        style={{
          backgroundImage: "url('pattern.jpeg')",
          backgroundSize: "auto 100%",
          backgroundPosition: "left center",
          backgroundRepeat: "repeat-x",
        }}
      >
        <section
          data-theme=""
          className="py-8  mx-auto container bg-transparent"
        >
          <div className="mb-12 text-accent-content">
            {/*<span className="mb-6 inline-block rounded-full border border-accent-content/20 px-4 py-1.5   tracking-[0.18em] uppercase bg-white text-accent font-semibold">
              The Guardmaster Advantage
            </span>*/}
            <h2 className=" text-4xl font-pop leading-tight font-semibold  md:text-5xl text-center">
              At Guardmaster Institute, We are Empowering the Next Generation of
              Corporate Security Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="relative pt-10 flex flex-col drop-shadow-2xl "
              >
                <div className="absolute -top-0 left-1/2 -translate-x-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-xl">
                  <Icon className="size-8 text-accent" strokeWidth={1.5} />
                </div>
                <div
                  className="flex flex-1 flex-col rounded-2xl px-8 pb-10 pt-14 text-center text-accent-content  shadow-2xl bg-accent ring ring-current/50"
                  // style={{
                  //   backgroundImage: "url(card_frame.png)",
                  //   backgroundSize: "100% 100%",
                  //   backgroundRepeat: "no-repeat",
                  // }}
                >
                  <h3 className="mb-4 text-xl font-semibold">{title}</h3>
                  <p className="leading-relaxed ">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Courses />
      <ForeFront />
      <Experience />
      <Accredition />

      <FaqCert />
      {/*<Footer />*/}
    </>
  );
}
