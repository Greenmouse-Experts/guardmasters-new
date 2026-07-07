import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  cohort: string;
  image: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The Mini-MBA changed the trajectory of my career. I walked in as a guard supervisor, I walked out leading enterprise security strategy for a multinational.",
    name: "A. Mensah, CPP",
    role: "Head of Corporate Security",
    cohort: "Cohort 2024",
    image: "/testimonials/mensah.jpg",
    initials: "A",
  },
  {
    quote:
      "Guardmaster gave me the credentials and confidence to step into a C-suite advisory role. The curriculum is world-class and immediately applicable.",
    name: "T. Okafor, CSM",
    role: "Director of Security Operations",
    cohort: "Cohort 2023",
    image: "/testimonials/okafor.jpg",
    initials: "T",
  },
  {
    quote:
      "The Business Continuity certification opened doors I didn't even know existed. I now consult for Fortune 500 companies on resilience frameworks.",
    name: "S. Adeyemi, CBCP",
    role: "Business Continuity Consultant",
    cohort: "Cohort 2024",
    image: "/testimonials/adeyemi.jpg",
    initials: "S",
  },
  {
    quote:
      "I completed the ISO 27001 Lead Auditor program and within three months landed a role at a top-tier firm. The training was rigorous and exactly what the industry demands.",
    name: "R. Thompson, CISM",
    role: "Information Security Manager",
    cohort: "Cohort 2023",
    image: "/testimonials/thompson.jpg",
    initials: "R",
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="bg-base-200 px-6 py-20 md:px-16">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold font-pop md:text-5xl">
            <span className="text-accent">Hear From </span>
            <span className="text-primary">Our Learners</span>
          </h2>
          <p className="mt-4 mx-auto max-w-lg text-base-content/60">
            Real stories from satisfied professionals who have advanced their
            careers and made an impact through our programs.
          </p>
        </div>

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Prev button */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 z-10 -translate-x-4 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-lg transition hover:bg-accent/80 md:-translate-x-6"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Embla viewport */}
          <div className="overflow-hidden mx-6 md:mx-10" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t) => (
                <div key={t.name} className="min-w-0 flex-[0_0_100%] px-2">
                  <div className="flex overflow-hidden rounded-2xl bg-accent">
                    {/* Text side */}
                    <div className="flex flex-1 flex-col justify-between p-8 md:p-10">
                      <div>
                        <span className="mb-4 block text-4xl font-bold leading-none text-primary">
                          "
                        </span>
                        <p className="text-lg leading-relaxed text-white md:text-xl">
                          {t.quote}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-accent">
                          {t.initials}
                        </div>
                        <div>
                          <p className="font-bold text-white">{t.name}</p>
                          <p className="text-[11px] font-semibold tracking-widest text-white/50 uppercase">
                            {t.role} · {t.cohort}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Image side */}
                    <div className="w-2/5 h-110  bg-secondary/20">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display =
                            "none";
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 z-10 translate-x-4 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-lg transition hover:bg-accent/80 md:translate-x-6"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <DotIndicators emblaApi={emblaApi} count={testimonials.length} />
      </div>
    </section>
  );
}

function DotIndicators({
  emblaApi,
  count,
}: {
  emblaApi: ReturnType<typeof useEmblaCarousel>[1];
  count: number;
}) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  return (
    <div className="mt-8 flex justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => scrollTo(i)}
          className={`h-2.5 w-2.5 rounded-full transition-colors ${i === selected ? "bg-accent" : "bg-accent/30 hover:bg-accent/60"}`}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
}
