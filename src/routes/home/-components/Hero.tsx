import { Link } from "@tanstack/react-router";
import { Clock, Users, GraduationCap } from "lucide-react";

const stats = [
  { icon: Clock, value: "1536+", lines: ["HOURS OF CONTENT"] },
  { icon: Users, value: "250+", lines: ["ACTIVE LEARNERS"] },
  { icon: GraduationCap, value: "40+", lines: ["CPE CREDITS"] },
];

export default function Hero() {
  return (
    <section className="relative min-h-[480px] overflow-hidden md:min-h-[560px] py-22">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 bg-black" />
      <img
        src="/home/hero.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover blur-[2px]"
      />
      {/* Dark overlay — heavier on left for legibility */}

      <div className="relative z-10 container mx-auto flex h-full min-h-[inherit] flex-col justify-center px-6 pt-28 pb-24 md:px-16 md:pt-36 md:pb-28">
        {/* Heading */}
        <h1 className="mb-8 max-w-xl text-4xl leading-[1.1] font-bold text-white md:text-6xl font-pop">
          Master the craft of
          <br />
          <span className="text-primary italic">Corporate Security.</span>
        </h1>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/home/programs"
            className="btn btn-primary gap-2 rounded-lg px-6 font-semibold"
          >
            Explore Programs
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>
          <Link
            to="/home/auth/signup"
            className="btn rounded-lg border-white/40 bg-transparent px-6 font-semibold text-white hover:border-white hover:bg-white/10"
          >
            Enroll Now
          </Link>
        </div>

        {/* Stats pill */}
        <div className="mt-12 flex w-full items-center divide-x divide-primary rounded-2xl bg-accent/80 px-4 py-4 shadow-xl backdrop-blur-sm ring ring-primary md:absolute md:bottom-12 md:right-16 md:mt-0 md:w-auto md:px-6">
          {stats.map(({ icon: Icon, value, lines }) => (
            <div
              key={value}
              className="flex flex-1 items-center justify-center gap-2 px-2 py-1 md:flex-none md:px-4 md:py-2"
            >
              <Icon
                className="size-7 shrink-0 text-primary md:size-9"
                strokeWidth={1.5}
              />
              <div>
                <div className="text-base font-bold leading-none text-white md:text-lg">
                  {value}
                </div>
                <div className="mt-0.5 text-[8px] font-semibold tracking-widest text-white/50 uppercase md:text-[9px]">
                  {lines[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
