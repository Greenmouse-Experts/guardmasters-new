import { ArrowUpRight } from "lucide-react";

const advantages = [
  "Immersive learning and real case analysis",
  "Distinguished faculty and course leaders",
  "Interactive webinars and workshop sessions",
  "Integrative training programs",
  "ISO global standards integration",
];

export default function ForeFront() {
  return (
    <div className="bg-black">
      <section className="grid grid-cols-1 bg-black text-white lg:grid-cols-2  mx-auto container">
        {/* Left content */}
        <div className="order-2 flex flex-col justify-center px-6 py-16 md:px-16 md:py-24 lg:order-1 ">
          <span className="mb-8 self-start rounded-full border border-white/25 px-4 py-1.5   tracking-[0.18em] text-accent font-bold uppercase bg-white">
            Level Up
          </span>

          <h2 className="mb-7 text-4xl leading-[1.1] font-light md:text-5xl lg:text-6xl">
            At the forefront of corporate security{" "}
            <em className="italic text-primary">since day one.</em>
          </h2>

          <p className="mb-10 max-w-lg leading-relaxed text-white/60">
            Our faculty and training facilitators are subject matter experts —
            among the leading trainers in their fields globally. The result:
            professionals who lead, not follow.
          </p>

          <ul className="mb-12 flex flex-col">
            {advantages.map((item, i) => (
              <li
                key={item}
                className="flex items-center gap-5 border-b border-white/10 py-4 first:border-t"
              >
                <span className="text-xs font-medium tracking-widest text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-white/85">{item}</span>
              </li>
            ))}
          </ul>

          <button className="btn h-auto gap-2 self-start rounded-none border-none bg-white px-8 py-4 font-medium text-black hover:bg-white/90">
            Browse all programs
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Right image */}
        <div className="order-1 flex items-center justify-center p-6 py-12 lg:order-2 lg:p-10">
          <div className="relative h-full w-full overflow-hidden rounded-3xl">
            <img
              src="/new_image.png"
              alt="Faculty leading a strategy session"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
