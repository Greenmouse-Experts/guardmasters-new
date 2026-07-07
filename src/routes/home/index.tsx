import { createFileRoute } from "@tanstack/react-router";
import {
  GraduationCap,
  Target,
  Users,
  LifeBuoy,
  Award,
  Clock,
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
    icon: GraduationCap,
    title: "Learn from Experts",
    description:
      "Learn from seasoned industry professionals and academic experts with real-world experience in security, risk management, and resilience. Our programs combine global standards with practical insights.",
  },
  {
    icon: Target,
    title: "Practical & Career-Focused",
    description:
      "Learn from seasoned industry professionals seasoned practitioners, and academic experts with real-world experience in security, risk management, and resilience. Our programs combine global standards with practical insights.",
  },
  {
    icon: Users,
    title: "Global Professional Community",
    description:
      "Learn from seasoned industry professionals seasoned practitioners, and academic experts with real-world experience in security, risk management, and resilience. Our programs combine global standards with practical insights.",
  },
  {
    icon: LifeBuoy,
    title: "Dedicated Learner Support",
    description:
      "Learn from seasoned industry professionals seasoned practitioners, and academic experts with real-world experience in security, risk management, and resilience. Our programs combine global standards with practical insights.",
  },
  {
    icon: Award,
    title: "Recognized Certifications",
    description:
      "Learn from seasoned industry professionals seasoned practitioners, and academic experts with real-world experience in security, risk management, and resilience. Our programs combine global standards with practical insights.",
  },
  {
    icon: Clock,
    title: "Flexible Learning Pathways",
    description:
      "Learn from seasoned industry professionals seasoned practitioners, and academic experts with real-world experience in security, risk management, and resilience. Our programs combine global standards with practical insights.",
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
            <span className="text-4xl font-bold tracking-[0.18em] text-primary text-center uppercase font-pop">
              Trusted. Accredited. <br /> Recognized Worldwide.
            </span>
          </div>
          <p className="mx-auto mb-12 max-w-2xl text-center text-white/60 text-lg">
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

      <section className="bg-base-100 px-6 py-20 md:px-16">
        <div className="container mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl leading-tight font-bold font-pop text-center md:text-5xl">
              <span className="text-accnt">Why Choose</span>
              {/*<br />*/}{" "}
              <span className="text-primary">Guardmaster Institute</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-start gap-5 rounded-2xl bg-accent p-6"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary">
                  <Icon className="h-7 w-7 text-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="mb-2 font-pop font-bold text-accent-content">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-accent-content/60">
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
