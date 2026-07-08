import {
  ScrollText,
  Gem,
  Award,
  Columns3,
  SquareStack,
  Target,
} from "lucide-react";

const programs = [
  {
    icon: ScrollText,
    title: "Professional Certification Programs",
    description:
      "Industry-recognized certifications that validate your skills, boost credibility, and open doors to global career opportunities.",
  },
  {
    icon: Gem,
    title: "Specialist Mini-MBA Programs",
    description:
      "Executive-level learning that integrates strategy, leadership, and security expertise to drive impact and long-term growth.",
  },
  {
    icon: Award,
    title: "Masterclass Programs",
    description:
      "Intensive, expert-led programs that deliver practical knowledge and advanced skills in a focused, high-impact experience.",
  },
  {
    icon: Columns3,
    title: "Corporate Training Programs",
    description:
      "Tailored solutions designed to strengthen team performance, build resilience, and align learning with business objectives.",
  },
  {
    icon: SquareStack,
    title: "Microcredentials Programs",
    description:
      "Flexible, stackable credentials that help you upskill quickly and demonstrate expertise.",
  },
  {
    icon: Target,
    title: "ISO Standards Training Programs",
    description:
      "Gain knowledge of global ISO standards and best practices to enhance compliance and excellence.",
  },
];

export default function Programs() {
  return (
    <section className="bg-base-300 px-6 py-20 md:px-16">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="text-4xl font-bold tracking-[0.18em] text-accent uppercase font-pop">
              Our Program Offerings
            </span>
          </div>
          <p className="mx-auto max-w-2xl text-lg text-base-content/60">
            Comprehensive learning solutions tailored to empower security and
            risk professionals at every stage of their career.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="relative rounded-2xl bg-base-100 p-6 shadow-lg ring ring-primary/50 h-full"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              </div>

              <h3 className="mb-3 pr-6 text-lg font-bold leading-snug text-base-content font-pop">
                {title}
              </h3>
              <div className="mb-4 h-1 w-10 rounded-full bg-primary" />
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
