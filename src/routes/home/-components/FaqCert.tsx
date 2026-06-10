import { ChevronDown, ArrowUpRight } from "lucide-react";

const faqs = [
  {
    q: "Do I need prior security experience to take a course?",
    a: "Not necessarily. We offer programs from entry-level through advanced, so beginners and seasoned professionals alike can find the right starting point.",
  },
  {
    q: "How long do the training programs take?",
    a: "Most programs run between 32 and 60 hours of content, delivered flexibly so you can complete them around your work schedule.",
  },
  {
    q: "Are your courses accredited or certified?",
    a: "Yes. We are an ASIS International Preferred CPE Provider, an IFPO Approved Training Centre, and ACTD accredited, among others.",
  },
  {
    q: "Can organizations enroll multiple employees?",
    a: "Absolutely. We offer group and corporate enrollment with tailored cohorts and volume options — talk to our admissions team.",
  },
  {
    q: "How are the courses delivered?",
    a: "Through live webinars, real-case analysis, and integrative workshop sessions — immersive learning, never just slides.",
  },
  {
    q: "Are there flexible payment options available?",
    a: "Yes. Flexible installment plans are available for most programs. Reach out and we'll find an option that works for you.",
  },
];

export default function FaqCert() {
  return (
    <section data-theme="guard" className="px-6 py-20 text-white md:px-16">
      <div className="container mx-auto">
        {/* FAQ header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="mb-6 inline-block rounded-full border border-white/20 px-4 py-1.5 text-[11px] font-medium tracking-[0.18em] text-info uppercase">
              FAQs
            </span>
            <h2 className="text-4xl leading-tight font-light md:text-5xl">
              Got Questions?{" "}
              <span className="text-info">We've Got Answers</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/50">
            Find answers to common questions about our courses, certifications,
            enrollment process, and learning experience.
          </p>
        </div>

        {/* FAQ grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-lg bg-base-200 px-5 py-4 text-base-content [&_svg]:open:rotate-180"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="font-medium">{q}</span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-secondary/30 text-secondary">
                  <ChevronDown className="h-4 w-4 transition-transform" />
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-base-content/60">
                {a}
              </p>
            </details>
          ))}
        </div>

        {/* CTA card */}
        <div className="mt-16 overflow-hidden rounded-2xl bg-secondary px-8 py-12 md:px-12 md:py-14">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-6 inline-block text-[11px] font-medium tracking-[0.18em] text-white/50 uppercase">
                Cohort Opens Monthly
              </span>
              <h3 className="mb-8 max-w-md text-4xl leading-[1.1] font-light text-white md:text-5xl">
                Start your path to a rewarding career in corporate security
                today.
              </h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn gap-2 rounded-none border-none bg-white px-6 font-medium text-black hover:bg-white/90">
                  Apply Now
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <button className="btn rounded-none border-white/30 bg-transparent px-6 font-medium text-white hover:border-white hover:bg-white/10">
                  Talk to us
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg shadow-2xl">
              <img
                src="/certificate.png"
                alt="Guardmaster Institute certificate"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
