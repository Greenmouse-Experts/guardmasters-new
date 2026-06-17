import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { default_outcomes } from "../-info/programs";

interface ProgramInfoProps {
  badge: string;
  title: ReactNode;
  description: string;
  outcomes: string[];
}

export default function ProgramInfo({
  badge,
  title,
  description,
  outcomes,
}: ProgramInfoProps) {
  return (
    <section className="bg-base-100 px-6 py-20 md:px-16 md:py-28">
      <div className="container mx-auto grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div>
          <span className="mb-8 inline-block rounded-full border border-base-content/15 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
            {badge}
          </span>

          <h2 className="mb-6 text-4xl leading-tight font-light text-accent md:text-5xl">
            {title}
          </h2>

          <p className="max-w-sm leading-relaxed text-base-content/50">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-12 md:col-span-2 md:grid-cols-2">
          {outcomes.length > 0 ? (
            outcomes.map((outcome) => (
              <div
                key={outcome}
                className="flex items-start gap-4 border-t border-base-300 py-6"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-primary/40">
                  <Check className="h-4 w-4 text-secondary" strokeWidth={3} />
                </span>
                <p className="leading-relaxed text-base-content/80">
                  {outcome}
                </p>
              </div>
            ))
          ) : (
            <>
              {default_outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="flex items-start gap-4 border-t border-base-300 py-6"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-primary/40">
                    <Check className="h-4 w-4 text-secondary" strokeWidth={3} />
                  </span>
                  <p className="leading-relaxed text-base-content/80">
                    {outcome}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
