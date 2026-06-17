import { Link } from "@tanstack/react-router";

const stats = [
  { value: "236+", lines: ["HOURS OF", "CONTENT"] },
  { value: "250+", lines: ["ACTIVE", "LEARNERS"] },
  { value: "40", lines: ["CPE", "CREDITS"] },
];

const tickerItems = [
  "ASIS INTERNATIONAL · PREFERRED CPE PROVIDER",
  "IFPO — USA · APPROVED TRAINING CENTRE",
  "CHLPS CANADA · ACCREDITED PROVIDER",
  "ISO 18788 · CERTIFIED TRAINER",
];

export default function Hero() {
  return (
    <>
      <style>{`
        @keyframes ticker { to { transform: translateX(-50%); } }
        .ticker-track { animation: ticker 30s linear infinite; }
      `}</style>

      <section className="relative flex min-h-screen flex-col  bg-black">
        <img
          src="/home/hero.png"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover   blur-[2px] brightness-75"
        />
        {/*<div className="absolute inset-0 bg-black/65" />*/}

        <div className="relative z-10 container mx-auto flex flex-1 flex-col justify-center px-6 pt-36 pb-28 md:px-12 md:py-28 mt-18">
          <span className="mb-8 self-start rounded-full border border-white/30 px-4 py-1.5 text-[11px] font-medium tracking-[0.18em] text-white/75 uppercase bg-base-100/20">
            Certified Center for Learning
          </span>

          <h1 className="mb-6 max-w-3xl text-5xl leading-[1.1] font-light text-white md:text-7xl">
            Master the craft of
            <br />
            <em className="text-primary italic">corporate security.</em>
          </h1>

          <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/70">
            Globally accredited Mini-MBA, Masterclass, and certification
            programs in Corporate Security, Loss Prevention, Asset Protection,
            ISO Standards, and Business Continuity Management.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/home/programs"
              className="btn btn-primary btn-lg  gap-2 px-6"
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
            <Link to="/home/auth/signup" className="btn btn-lg">
              Enroll Now
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap overflow-hidden self-start bg-white shadow-2xl md:absolute md:right-16 md:bottom-16 md:mt-0 md:flex-nowrap md:self-auto">
            {stats.map((stat, i) => (
              <div
                key={stat.value}
                className={`px-6 py-5 text-center sm:px-8 ${i < stats.length - 1 ? "border-r border-base-300" : ""}`}
              >
                <div className="text-3xl font-bold text-secondary">
                  {stat.value}
                </div>
                <div className="mt-1 text-[10px] font-medium tracking-widest  uppercase">
                  {stat.lines[0]}
                  <br />
                  {stat.lines[1]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*<div className="relative z-10 overflow-hidden bg-secondary/85 py-3 backdrop-blur-sm">
          <div className="ticker-track flex w-max whitespace-nowrap">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={i}
                className="mx-10 text-xs tracking-[0.15em] text-white/50 uppercase"
              >
                <span className="mr-4 tex">✦</span>
                {item}
              </span>
            ))}
          </div>
        </div>*/}
      </section>
    </>
  );
}
