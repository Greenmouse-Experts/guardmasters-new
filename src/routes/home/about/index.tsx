import { createFileRoute } from "@tanstack/react-router";
import ImagelessHeader from "../-components/headers/ImagelessHeader";
import ImageHeader from "../-components/headers/ImageHeader";
import FlexSkeleton from "../-components/FlexSkeleton";
import AboutIntro from "../-components/AboutIntro";
import Principles from "../-components/Principles";
import Stats from "../-components/Stats";
import FacultyProfile from "../-components/FacultyProfile";
import YearsOfExperience from "../-components/YearsOfExperience";
import Cta from "../-components/Cta";
import NewFacProf from "../-components/NewFacProfile";

export const Route = createFileRoute("/home/about/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <ImageHeader
        image="/about.png"
        // badge="About Guardmaster Institute"
        title={
          <>
            Career-focused.
            <br />
            Specialized. <em className="text-primary italic">Future-ready</em>
          </>
        }
        description=" Guardmaster Institute Canada™ is a Canadian federally incorporated professional certification, corporate training, and consulting organization."
      />
      {/*<FlexSkeleton></FlexSkeleton>*/}
      <AboutIntro />
      <Principles />

      {/*<Stats />*/}
      <FacultyProfile />
      <NewFacProf />
      <YearsOfExperience />
      {/*<Cta />*/}
    </>
  );
}
