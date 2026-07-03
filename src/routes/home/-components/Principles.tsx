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
        <h2 className="mb-16 text-center text-4xl font-bold  md:text-5xl text-accent">
          Four principles. One mission.
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center shadow-lg rounded-xl"
            >
              <div className="relative z-10 -mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-accent shadow-lg">
                <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
              </div>
              <div className="flex w-full flex-col items-center rounded-2xl bg-base-100 px-8 pt-14 pb-10 shadow-sm">
                <h3 className="mb-3 text-2xl font-semibold text-base-content">
                  {title}
                </h3>
                <p className="text-center text-base leading-relaxed text-base-content/60">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
