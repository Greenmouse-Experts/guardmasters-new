import { ArrowUpRight } from "lucide-react";

const courses = [
  {
    image: "/courses/mba.png",
    title: "Mini – MBA Programs",
  },
  {
    image: "/courses/masters.png",
    title: "Masterclass Programs",
  },
  {
    image: "/courses/certificate.png",
    title: "Professional Certification Programs",
  },
  {
    image: "/courses/credential.png",
    title: "Micro Credential Programs",
  },
];

export default function Courses() {
  return (
    <section data-theme="guard" className="bg-base-200 px-6 py-20 md:px-16">
      <div className="container mx-auto">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-6 inline-block rounded-full border border-base-content/20 px-4 py-1.5 text-[11px] font-medium tracking-[0.18em] text-base-content/60 uppercase">
              Our Programs
            </span>
            <h2 className="max-w-xl text-4xl leading-tight font-light text-secondary md:text-5xl">
              Browse Courses by Category
              <br />
              <em className="italic font-light">real-world impact.</em>
            </h2>
          </div>
          <button className="btn btn-outline border-secondary text-secondary hover:bg-secondary hover:text-secondary-content self-start rounded-full px-6 md:self-auto">
            View All Programs
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course.title}
              className="group cursor-pointer rounded-2xl bg-base-300/60 p-4 transition-colors hover:bg-base-300"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="py-8 text-center text-2xl font-bold text-secondary">
                {course.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
