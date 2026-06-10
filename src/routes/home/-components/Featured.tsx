import { ArrowUpRight } from "lucide-react";

const programs = [
  {
    number: "01",
    category: "MINI-MBA",
    hours: "60 HRS",
    image: "/features/mba.png",
    title: "Mini-MBA (Security Project Management)",
    description:
      "This program equips professionals to plan, execute, and oversee complex security projects with precision.",
  },
  {
    number: "02",
    category: "MASTERCLASS",
    hours: "40 HRS",
    image: "/features/cpo.png",
    title: "Certified Protection Officer (CPO)",
    description:
      "The globally recognized IFPO certification — the gold standard for protection professionals.",
  },
  {
    number: "03",
    category: "MINI-MBA",
    hours: "32 HRS",
    image: "/features/mini-mba.png",
    title: "Mini-MBA (Business Interruption and Emergency Management)",
    description:
      "Implement, audit, and lead BCM programs aligned with ISO international standards.",
  },
];

export default function Featured() {
  return (
    <section data-theme="guard">
      {/* Featured programs */}
      <div className="bg-base-100 px-6 py-20 md:px-16">
        <div className="container mx-auto">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <span className="mb-6 inline-block rounded-full border border-base-content/20 px-4 py-1.5 text-[11px] font-medium tracking-[0.18em] text-base-content/60 uppercase">
                Featured Programs
              </span>
              <h2 className="text-4xl leading-tight font-light text-secondary md:text-5xl">
                Start here.{" "}
                <em className="italic text-secondary">Go places.</em>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-base-content/60">
              Comprehensive Mini-MBA security programs, IFPO certifications, and
              specialized courses — built around global best practices and ISO
              standards.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {programs.map((program) => (
              <div
                key={program.title}
                className="group flex flex-col rounded-2xl border border-base-300 bg-base-100 p-4 transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex items-center justify-between text-[11px] font-medium tracking-[0.15em] text-base-content/50 uppercase">
                  <span>
                    {program.number} / {program.category}
                  </span>
                  <span>{program.hours}</span>
                </div>

                <div className="mb-5 overflow-hidden rounded-xl">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-secondary">
                  {program.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-base-content/60">
                  {program.description}
                </p>

                <button className="btn btn-block mt-auto gap-2 rounded-md bg-secondary text-secondary-content hover:bg-secondary/90">
                  Enroll
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
