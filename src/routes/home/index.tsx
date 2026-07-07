import { createFileRoute } from "@tanstack/react-router";
import { Crown, Target, User, Music, Square, Star } from "lucide-react";
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
import Opportunity from "./-components/Oppourtunity";

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
    icon: Crown,
    tile: "bg-accent",
    description:
      "Learn from seasoned industry professionals and academic experts.",
  },
  {
    icon: Target,
    tile: "bg-[#7A1F2B]",
    description:
      "Courses are designed for working professionals and practical application.",
  },
  {
    icon: User,
    tile: "bg-[#1F6B4A]",
    description: "Join a global community of like-minded professionals.",
  },
  {
    icon: Music,
    tile: "bg-accent",
    description: "Receive support throughout your learning journey.",
  },
  {
    icon: Square,
    tile: "bg-[#4B2E83]",
    description:
      "Certifications are trusted by employers and aligned with standards.",
  },
  {
    icon: Star,
    tile: "bg-[#0F766E]",
    description:
      "Study flexibly with programs built around your professional goals.",
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
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="text-5xl font-bold tracking-[0.18em] text-primary uppercase font-pop">
              Trusted. Accredited. Recognized Worldwide.
            </span>
          </div>
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

      <Opportunity />

      <section className="bg-accent px-6 py-20 md:px-16">
        <div className="container mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl leading-tight font-bold font-pop md:text-5xl">
              <span className="text-white">Why Choose</span>
              <br />
              <span className="text-primary">Guardmaster Institute</span>
            </h2>
            <p className="mt-4 max-w-xl text-white/60">
              We are committed to raising the standard of professional
              excellence through world-class education and globally recognized
              certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {features.map(({ icon: Icon, tile, description }) => (
              <div
                key={description}
                className="flex items-center gap-6 rounded-2xl bg-base-100 p-5"
              >
                <div
                  className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-xl ${tile}`}
                >
                  <Icon className="h-9 w-9 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="mb-3 h-1 w-8 rounded-full bg-primary" />
                  <p className="leading-relaxed text-base-content/70">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*<Courses />*/}
      {/*<ForeFront />*/}
      <Experience />
      {/*<Accredition />*/}

      <FaqCert />
      {/*<Footer />*/}
    </>
  );
}
