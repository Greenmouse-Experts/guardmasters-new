import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import type { ReactNode } from "react";

interface SimpleHeroProps {
  title: ReactNode;
  description: string;
  image?: string;
  imageAlt?: string;
  features?: string[];
  cardEyebrow?: string;
  cardText?: string;
}

const default_features = [
  "Accredited programs",
  "Flexible learning",
  "Career-focused",
];

export default function SimpleHero({
  title,
  description,
  image,
  imageAlt,
  features = default_features,
  cardEyebrow = "Learn with purpose",
  cardText = "Industry-relevant learning for real-world impact.",
}: SimpleHeroProps) {
  function scrollToPrograms() {
    document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      className="relative overflow-hidden bg-accent pt-8
      "
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: copy */}
          <div className="flex flex-col justify-center  pt-32 pb-16 md:pt-40 md:pb-20">
            <h1 className="font-pop text-5xl leading-[1.05] font-bold text-white md:text-7xl">
              {title}
            </h1>

            <p className="mt-6 max-w-md leading-relaxed text-white/50">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={scrollToPrograms}
                className="btn h-auto gap-2 rounded-md border-none bg-primary px-6 py-4 text-base font-bold text-accent hover:bg-primary/90"
              >
                Explore Programs
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <Link
                to="/home/contact"
                className="btn h-auto gap-2 rounded-md border-none bg-white px-6 py-4 text-base font-medium text-accent hover:bg-white/90"
              >
                Speak with an Advisor
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary">
                    <Check className="h-3 w-3 text-accent" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-white/70">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image space */}
          <div className="relative min-h-[360px] lg:min-h-[640px] ">
            <img
              src={"/program.png"}
              alt={imageAlt ?? ""}
              className="h-full w-full object-contain"
            />
            <div className="absolute inset-0 bg-linear-90 from-accent to-transparent"></div>

            {/* Floating card */}
            <div className="absolute bottom-8 left-0 max-w-xs bg-base-100 p-6 shadow-xl lg:left-8">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="text-xs font-bold tracking-[0.18em] text-accent uppercase">
                  {cardEyebrow}
                </span>
              </div>
              <p className="text-lg leading-snug font-medium text-accent">
                {cardText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
