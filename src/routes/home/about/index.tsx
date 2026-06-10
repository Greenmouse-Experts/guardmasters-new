import { createFileRoute } from "@tanstack/react-router";
import ImagelessHeader from "../-components/headers/ImagelessHeader";
import ImageHeader from "../-components/headers/ImageHeader";
import FlexSkeleton from "../-components/FlexSkeleton";
import Principles from "../-components/Principles";
import Stats from "../-components/Stats";
import FacultyProfile from "../-components/FacultyProfile";

export const Route = createFileRoute("/home/about/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <ImagelessHeader
        badge="About Guardmaster Institute"
        title={
          <>
            Career-focused.
            <br />
            Specialized. <em className="text-primary italic">Future-ready</em>
          </>
        }
        description="A federally incorporated Canadian professional certification, training, and consulting organization — setting new benchmarks for excellence in corporate security education."
      />
      <FlexSkeleton></FlexSkeleton>
      <Principles />
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
      <Stats />
      <FacultyProfile />
    </>
  );
}
