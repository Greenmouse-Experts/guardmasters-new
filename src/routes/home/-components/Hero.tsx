import { Link } from "@tanstack/react-router";
import { Clock, Users, GraduationCap } from "lucide-react";

const stats = [
  { icon: Clock, value: "1536+", lines: ["HOURS", "OF CONTENT"] },
  { icon: Users, value: "250+", lines: ["ACTIVE", "LEARNERS"] },
  { icon: GraduationCap, value: "40+", lines: ["CPE", "CREDITS"] },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-accent px-6 py-16 md:px-16 md:py-24">
      <div
        className="container mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 pt-22
        "
      >
        {/* Left — copy */}
        <div>
          <h1 className="mb-6 text-4xl leading-[1.1] font-bold text-white md:text-6xl font-pop">
            Master Your Craft in{" "}
            <span className="text-primary italic">Corporate Security</span>
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-white/70">
            Advance your career with world-class education, industry expertise,
            and globally recognized certifications designed for professionals
            who lead, protect, and make a difference.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/home/programs"
              className="btn btn-primary btn-lg gap-2 px-6"
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
              className="btn btn-lg border-white/40 bg-transparent px-6 text-white hover:border-white hover:bg-white/10"
            >
              Enroll Now
            </Link>
          </div>
        </div>

        {/* Right — image + stats overlay */}
        <div className="relative">
          <div className="">
            <img
              src="/hero.png"
              alt="Students at Guardmaster Institute"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          {/*<div className="mx-4 -mt-16 flex flex-wrap justify-around gap-4 rounded-2xl border border-primary/40 bg-accent/90 px-6 py-5 shadow-xl backdrop-blur-sm sm:flex-nowrap md:mx-6">
            {stats.map(({ icon: Icon, value, lines }) => (
              <div key={value} className="flex items-center gap-3">
                <Icon
                  className="h-8 w-8 shrink-0 text-primary"
                  strokeWidth={1.5}
                />
                <div>
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-[10px] font-medium tracking-widest text-white/60 uppercase">
                    {lines[0]}
                    <br />
                    {lines[1]}
                  </div>
                </div>
              </div>
            ))}
          </div>*/}
        </div>
      </div>
    </section>
  );
}
