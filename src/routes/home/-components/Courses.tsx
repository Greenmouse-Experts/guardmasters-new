import apiClient from "#/client/api.ts";
import QueryCompLayout from "#/components/layout/QueryCompLayout.tsx";
import type { ApiResponseV2 } from "#/types/api.js";
import type { CourseProgram } from "#/types/courses.ts";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
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
  const query = useQuery<ApiResponseV2<CourseProgram[]>>({
    queryKey: ["categories"],
    queryFn: async () => {
      let resp = await apiClient.get("/programs/public?page=1");
      return resp.data;
    },
  });
  return (
    <section className="bg-primary px-6 py-8 md:px-16">
      <div className="container mx-auto">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-6 inline-block rounded-full border border-base-content/20 px-4 py-1.5  font-medium tracking-[0.18em] text-accent uppercase">
              Explore Courses
            </span>
            <h2 className="max-w-3xl text-4xl leading-tight font-light  md:text-5xl">
              Browse Courses by Category
            </h2>
          </div>
          <button className="btn btn-outline border-secondary text-secondary hover:bg-secondary hover:text-secondary-content self-start rounded-full px-6 md:self-auto">
            View All Programs
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <QueryCompLayout query={query}>
          {(data) => {
            return (
              <>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-4 mb-22">
                  {data.data.map((course) => (
                    <Link
                      key={course.title}
                      to={`/home/programs/`}
                      className="group cursor-pointer rounded-2xl ring ring-current/20  transition-colors hover:bg-accent/80 bg-accent "
                    >
                      <div className="overflow-hidden w-full aspect-square rounded-t-xl bg-base-300">
                        <img
                          src={course.courses[0].coverImage}
                          alt={course.title}
                          className="object-contain size-full transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="py-8 text-center p-4 text-2xl font-bold text-accent-content">
                        {course.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </>
            );
          }}
        </QueryCompLayout>
      </div>
    </section>
  );
}
