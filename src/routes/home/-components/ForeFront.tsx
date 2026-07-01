import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Users } from "lucide-react";

const advantages = [
  "Immersive learning and real case analysis",
  "Distinguished faculty and course leaders",
  "Interactive webinars and workshop sessions",
  "Integrative training programs",
  "ISO global standards integration",
];

export default function ForeFront() {
  return (
    <div className="">
      <section className="grid grid-cols-1 text-white lg:grid-cols-2  mx-auto container py-6">
        {/* Left content */}
        <div
          className="order-2 flex flex-col justify-center rounded-xl px-6 py-16 md:px-16 md:py-24 lg:order-1 text-white"
          style={{
            backgroundImage: "url('level_up.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="mb-7 text-4xl leading-[1.1] font-light md:text-5xl lg:text-6xl">
            Level Up Your Professional Skills In Corporate Security Management
          </h2>

          <p className="mb-10 max-w-lg leading-relaxed text-white/60">
            Guardmaster Institute has been at the forefront of training
            corporate security, business continuity, and loss prevention
            professionals. Our faculty and training facilitators are subject
            matter experts and include some of the leading trainers in their
            fields globally.
          </p>

          <ul className="mb-12 flex flex-col">
            {advantages.map((item, i) => (
              <li
                key={item}
                className="flex items-center gap-5 border-b border-white/10 py-4 first:border-t"
              >
                <span className="font-medium tracking-widest text-primary">
                  <ArrowRight />
                  {/*{String(i + 1).padStart(2, "0")}*/}
                </span>
                <span className="text-white/85">{item}</span>
              </li>
            ))}
          </ul>

          <Link to="/home/programs" className="btn btn-primary btn-lg ">
            Explore Our Training Programs
            {/*<ArrowUpRight className="h-4 w-4" />*/}
          </Link>
        </div>

        {/* Right image */}
        <div className="order-1 flex items-center justify-center p-6 py-12 lg:order-2 lg:p-10 relative isolate">
          <div className="relative h-full w-full overflow-hidden rounded-3xl">
            <img
              src="/new_image.png"
              alt="Faculty leading a strategy session"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 p-4 bg-base-100  ring fade flex items-center z-10 pr-12 rounded-2xl">
            <div className="bg-accent p-4 rounded-2xl">
              <Users className=" bg-accent text-primary size-8" />
            </div>
            <div className="ml-4">
              <h2 className="text-black text-2xl font-bold">250+</h2>
              <p className="text-black/70">Learners</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
