import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import ImageHeader from "../-components/headers/ImageHeader";
import FacultyProfile from "../-components/FacultyProfile";

export const Route = createFileRoute("/home/faculty/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div data-theme="guard">
      <ImageHeader
        badge="Faculty"
        image="/people.jpg"
        title={
          <>
            Taught by practitioners — not
            <br />
            <em className="text-primary italic">just academics.</em>
          </>
        }
      />

      <FacultyProfile />

      {/* CTA */}
      <section className="bg-black px-6 py-20 md:px-16 md:py-28">
        <div className="container mx-auto flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-xl text-4xl leading-[1.1] font-semibold text-primary md:text-6xl">
            Ready to write the next chapter?
          </h2>
          <button className="btn btn-primary gap-2 self-start rounded-md px-6 font-semibold text-primary-content md:self-auto">
            Explore programs
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
