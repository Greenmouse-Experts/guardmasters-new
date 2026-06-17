import { Compass, Lightbulb, Shield, Globe } from "lucide-react";

const principles = [
  {
    icon: Compass,
    title: "Direction",
    description:
      "We chart clear paths from entry-level to executive leadership in security.",
  },
  {
    icon: Lightbulb,
    title: "Insight",
    description:
      "Forward-looking research and case analysis grounded in real industry practice.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "Accredited by the bodies that matter — credentials you can stand behind.",
  },
  {
    icon: Globe,
    title: "Reach",
    description:
      "Global standards, Canadian roots, learners across continents.",
  },
];

export default function Principles() {
  return (
    <section className="bg-base-200 px-6 py-20 md:px-16">
      <div className="container mx-auto">
        <div className="mb-12">
          <span className="mb-6 inline-block rounded-full border border-current/20 px-4 py-1.5  font-medium tracking-[0.18em] text-secondary uppercase">
            What We Stand For
          </span>
          <h2 className="max-w-2xl text-4xl leading-tight font-light text-base-content md:text-5xl">
            Four principles.{" "}
            <em className="text-secondary italic">One mission.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 border-t border-l border-base-300 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="border-r border-b border-base-300 bg-base-200 p-10"
            >
              <div className="mb-8 inline-flex items-center justify-center bg-primary p-2.5">
                <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-base-content">
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
