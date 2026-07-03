import { Link } from "@tanstack/react-router";
import { User, HeartHandshake, Award, User2 } from "lucide-react";

const stats = [
  { icon: User2, value: "500+", label: "Satisfied Learners" },
  { icon: HeartHandshake, value: "90", label: "Certified Professionals" },
  { icon: Award, value: "10+", label: "Research Papers Published" },
];

export default function YearsOfExperience() {
  return (
    <section className="bg-base-100 px-6 py-20 md:px-16">
      <div className="container mx-auto">
        <div className="mb-14 flex flex-col items-center text-center">
          <h2 className="mb-4 text-4xl font-bold text-base-content md:text-5xl">
            15 Years of Experience
          </h2>
          <p className="mb-8 max-w-lg text-base text-lg">
            Equipping security professionals with practical training,
            certification readiness, and leadership-focused learning.
          </p>
          <Link to="/home/programs" className="btn btn-primary text-accent">
            Train With Us
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-2xl bg-accent px-8 py-12 text-center"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary ring ring-white ring-4">
                <Icon
                  className="h-8 w-8 text-accent"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </div>
              <span className="text-5xl font-extrabold text-base-100 md:text-6xl">
                {value}
              </span>
              <span className="mt-3 text-lg font-medium text-base-100/70">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
