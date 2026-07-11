import { createFileRoute } from "@tanstack/react-router";
import {
  GraduationCap,
  Target,
  Users,
  Headphones,
  Briefcase,
  Award,
  ArrowUpRight,
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
import Testimonials from "./-components/Testimonials";

export const Route = createFileRoute("/home/")({
  component: RouteComponent,
});

const accreditations = [
  {
    logo: "/accredition/asis.png",
    name: "ASIS Preferred CPE Provider",
    description:
      "Guardmaster Institute is an ASIS Preferred CPE Provider. Learners earn up to 40 CPE credits from our Mini-MBA and Masterclass training programs.",
  },
  {
    logo: "/accredition/ifpo.png",
    name: "IFPO Approved Training Centre",
    description:
      "Guardmaster Institute is an IFPO Approved Training Centre authorized to deliver IFPO programs including CPO and CSSM certifications.",
  },
  {
    logo: "/accredition/csi.png",
    name: "CSI Approved Training Centre",
    description:
      "Guardmaster Institute is an Approved Training Centre of Converged Security Institute (CSI). We offer accredited trainings for CSI certifications.",
  },
  {
    logo: "/accredition/iso.png",
    name: "Accredited ISO Standards Trainer",
    description:
      "Guardmaster Institute is accredited to deliver specialized ISO based training that equips security professionals to implement and audit ISO standards.",
  },
  {
    logo: "/accredition/chlps.png",
    name: "ChLPS Accredited Training Provider",
    description:
      "Guardmaster Institute is an Accredited Training Provider of ChLPS-Canada for certification courses and programs in the loss prevention field.",
  },
  {
    logo: "/accredition/actd.png",
    name: "ACTD Accredited Training Institution",
    description:
      "Guardmaster Institute has been accredited as a Professional Training Institution by the American Council of Training and Development (ACTD).",
  },
];

const features = [
  {
    icon: GraduationCap,
    color: "bg-[#4338CA]",
    title: "Learn from Experts",
    description:
      "Learn from seasoned industry professionals and academic experts with real-world experience in security, risk management, and resilience. Our programs combine global standards with practical insights.",
  },
  {
    icon: Target,
    color: "bg-[#B91C1C]",
    title: "Real-World Application",
    description:
      "Our courses are designed for working professionals, focusing on practical tools, techniques, and strategies you can immediately apply to deliver results and create impact in your organization.",
  },
  {
    icon: Users,
    color: "bg-[#6D28D9]",
    title: "Build Your Network",
    description:
      "Join a global community of like-minded professionals across industries. Collaborate, share ideas, and build valuable connections that advance your career and expand your opportunities.",
  },
  {
    icon: Headphones,
    color: "bg-[#065F46]",
    title: "Excellent Support",
    description:
      "Receive comprehensive support throughout your learning journey — from expert faculty and career advisors to academic resources and wellbeing service. We are here to help you succeed.",
  },
  {
    icon: Briefcase,
    color: "bg-[#1D4ED8]",
    title: "Employer's Choice",
    description:
      "Our certifications are trusted by employers and aligned with industry standards, giving you a competitive edge and opening doors to new opportunities.",
  },
  {
    icon: Award,
    color: "bg-[#92400E]",
    title: "Made for Your Success",
    description:
      "Study flexibly, at your pace with programs built to fit your professional goals. We are committed to your success and long-term career growth.",
  },
];

function RouteComponent() {
  return (
    <>
      <HomeNav />

      <Hero />
      <div
        style={{
          backgroundImage: "url(/glass.jpeg)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
        className="bg-accent backdrop-blur-md w-full flex items-center bottom-0 py-4 px-4"
      >
        <div className="max-w-5xl mx-auto text-white text-center text-sm sm:text-base">
          Guardmaster Institute Canada is a professional certifications
          training, and consulting organization. We specialize in Corporate
          Security, Loss Prevention, Asset Protection, Compliance, Business
          Continuity Management, and ISO International Standards.
        </div>
      </div>
      <Programs />
      {/*<accreditations />*/}

      <section className="bg-accent px-6 py-16 md:px-16">
        <div className="container mx-auto">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="text-4xl font-bold tracking-[0.18em] text-primary text-center uppercase font-pop">
              Trusted. Accredited. <br /> Recognized Worldwide.
            </span>
          </div>
          <p className="mx-auto mb-12 max-w-2xl text-center text-white/60 t4ext">
            Our accreditations and partnerships reflect our commitment to
            delivering world-class education and training that meets global
            standards.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
            {accreditations.map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center rounded-2xl bg-base-100 px-5 py-8 text-center shadow-lg"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white ring-2 ring-primary overflow-hidden p-1">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
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

          <div className="flex mt-8">
            <button className="btn btn-xl btn-primary  mx-auto text-accent font-bold rounded-xl ">
              Learn More{" "}
              <span className="p-2 bg-white ml-2 rounded-md">
                <ArrowUpRight />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/*<Offerings />*/}
      <Featured />

      <Opportunity />

      <section className="bg-base-100 px-6 py-20 md:px-16">
        <div className="container mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl leading-tight font-bold font-pop text-center uppercase">
              <span className="text-accnt">Why Choose</span>
              {/*<br />*/}{" "}
              <span className="text-primary">Guardmaster Institute</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {features.map(({ icon: Icon, color, title, description }) => (
              <div
                key={title}
                className="flex items-start gap-5 rounded-2xl bg-accent p-6"
              >
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${color}`}
                >
                  <Icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="mb-2 font-pop font-bold text-accent-content">
                    {title}
                  </h3>
                  <div className="mb-3 h-0.5 w-6 rounded-full bg-primary" />
                  <p className="text-sm leading-relaxed text-accent-content/60">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Testimonials />

      <FaqCert />
    </>
  );
}
