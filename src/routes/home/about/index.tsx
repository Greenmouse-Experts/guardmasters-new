import { createFileRoute } from "@tanstack/react-router";
import ImagelessHeader from "../-components/headers/ImagelessHeader";
import ImageHeader from "../-components/headers/ImageHeader";
import FlexSkeleton from "../-components/FlexSkeleton";
import AboutIntro from "../-components/AboutIntro";
import Principles from "../-components/Principles";
import Stats from "../-components/Stats";
import FacultyProfile from "../-components/FacultyProfile";
import Cta from "../-components/Cta";

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
      <AboutIntro />
      <Principles />

      <Stats />
      <FacultyProfile />
      <Cta />
    </>
  );
}
