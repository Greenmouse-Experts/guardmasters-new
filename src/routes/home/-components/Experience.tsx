import { useState } from "react";
import { ArrowRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "The Mini-MBA changed the trajectory of my career. I walked in a guard supervisor, I walked out leading enterprise security strategy for a multinational.",
    name: "A. Mensah, CPP",
    role: "Head of Corporate Security · Cohort 2024",
    image: "/experience/experience.png",
  },
  {
    quote:
      "The faculty bring real-world depth you can't get from a textbook. Every module mapped directly to challenges I face on the job the very next week.",
    name: "R. Okafor",
    role: "Risk & Resilience Lead · Cohort 2023",
    image: "/experience/experience.png",
  },
  {
    quote:
      "Globally recognised, rigorously practical, and genuinely career-defining. The CPO certification opened doors I didn't think were possible.",
    name: "S. Adeyemi",
    role: "Asset Protection Manager · Cohort 2024",
    image: "/experience/experience.png",
  },
];

export default function Experience() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section data-theme="guard" className="bg-base-200 px-6 py-20 md:px-16">
      <div className="container mx-auto">
        <div className="mb-12 flex items-start justify-between gap-6">
          <div>
            <span className="mb-6 inline-block rounded-full border border-base-content/20 px-4 py-1.5 text-[11px] font-medium tracking-[0.18em] text-secondary uppercase">
              Our Mission
            </span>
            <h2 className="text-4xl leading-tight font-light text-base-content md:text-5xl">
              Hear From <span className="text-secondary">Our Graduates</span>
            </h2>
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="btn btn-circle hidden h-14 w-14 shrink-0 border-none bg-secondary text-secondary-content hover:bg-secondary/90 md:inline-flex"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden">
            <img
              src={active.image}
              alt={active.name}
              className="aspect-square w-full object-cover lg:aspect-[5/4]"
            />
          </div>

          <div>
            <Quote className="mb-6 h-10 w-10 fill-secondary text-secondary" />
            <blockquote className="mb-10 text-2xl leading-snug font-medium text-base-content md:text-3xl">
              {active.quote}
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-content">
                {active.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-base-content">{active.name}</div>
                <div className="text-xs font-medium tracking-[0.12em] text-base-content/50 uppercase">
                  {active.role}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-end gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-primary" : "w-4 bg-base-content/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
