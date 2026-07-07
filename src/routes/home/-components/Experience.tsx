import { useState } from "react";
import { GraduationCap, LayoutList } from "lucide-react";
import { Link } from "@tanstack/react-router";

const testimonials = [
  {
    quote:
      "The Mini-MBA changed the trajectory of my career. I walked in as a guard supervisor, I walked out leading enterprise security strategy for a multinational.",
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

  return (
    <section className="bg-base-200 px-6 py-20 md:px-16">
      <div className="container mx-auto">
        {/* ── Heading ── */}
        <div className="mb-12 text-center">
          <h2 className="font-pop text-4xl font-bold text-accent md:text-5xl">
            Hear From <span className="text-primary">Our Learners</span>
          </h2>

          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-base-content/60">
            Real stories from security professionals who have advanced their
            careers and made an impact through our programs.
          </p>
        </div>

        {/* ── Testimonial card ── */}
        <div className="overflow-hidden rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2">
          {/* Left: quote */}
          <div className="flex flex-col bg-accent px-10 py-14">
            {/* Stylised opening quote */}
            <span className="mb-6 font-pop text-6xl font-black leading-none text-primary">
              &#8220;
            </span>

            <blockquote className="flex-1 text-lg leading-relaxed text-accent-content md:text-xl">
              {active.quote}
            </blockquote>

            {/* Divider */}
            <div className="my-8 h-0.5 w-10 bg-primary" />

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-content">
                {active.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-accent-content">{active.name}</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-content/50">
                  {active.role}
                </p>
              </div>
            </div>
          </div>

          {/* Right: image + dots */}
          <div className="relative min-h-72">
            <img
              src={active.image}
              alt={active.name}
              className="h-full w-full object-cover"
            />

            {/* Dot navigation */}
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-7 bg-white"
                      : "w-2.5 bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
