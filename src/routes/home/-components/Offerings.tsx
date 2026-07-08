import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  BookOpen,
  Layers,
  Globe,
} from "lucide-react";

const offerings = [
  {
    icon: GraduationCap,
    tile: "bg-primary text-accent",
    title: "Professional Certification Programs",
    description:
      "Internationally accredited certifications that validate your expertise and advance your career in corporate security.",
  },
  {
    icon: Briefcase,
    tile: "bg-[#7A1F2B] text-white",
    title: "Corporate Training & Consulting",
    description:
      "Tailored, in-house training and advisory services that strengthen organizational resilience and security posture.",
  },
  {
    icon: ShieldCheck,
    tile: "bg-[#1F6B4A] text-white",
    title: "Loss Prevention & Asset Protection",
    description:
      "Specialized programs focused on reducing shrinkage, safeguarding assets, and building effective prevention strategies.",
  },
  {
    icon: BookOpen,
    tile: "bg-[#4B2E83] text-white",
    title: "Masterclasses & Mini-MBAs",
    description:
      "Immersive, leadership-focused learning that transforms professionals into strategic thinkers and effective leaders.",
  },
  {
    icon: Layers,
    tile: "bg-[#0F766E] text-white",
    title: "Business Continuity Management",
    description:
      "Frameworks and certifications that prepare organizations to anticipate, withstand, and recover from disruption.",
  },
  {
    icon: Globe,
    tile: "bg-accent text-primary ring-1 ring-white/20",
    title: "ISO Standards & Compliance",
    description:
      "Lead auditor and implementer training across ISO 27001, 22301, 31000, and other globally recognized standards.",
  },
];

export default function Offerings() {
  return (
    <section className="bg-accent px-6 py-20 md:px-16">
      <div className="container mx-auto">
        <div className="mb-4">
          <h2 className="text-4xl text-primary text-center font-bold font-pop">
            Trusted. Accredited.
            <br /> Recognized Worldwide.
          </h2>
          <p className="mt-3  text-white/60 text-center">
            World-class education and training divisions designed to build
            expertise, advance careers, and drive organizational excellence.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offerings.map(({ icon: Icon, tile, title, description }, i) => (
            <div
              key={title}
              className="group relative rounded-2xl bg-base-100 p-6 shadow-lg transition-transform hover:-translate-y-1"
            >
              <span className="absolute top-6 right-6 flex h-7 w-7 items-center justify-center rounded-full bg-base-200 text-xs font-bold text-base-content/50">
                {i + 1}
              </span>

              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${tile}`}
              >
                <Icon className="h-7 w-7" strokeWidth={1.5} />
              </div>

              <h3 className="mb-2 pr-8 text-lg font-bold text-base-content font-pop">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-base-content/60">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
