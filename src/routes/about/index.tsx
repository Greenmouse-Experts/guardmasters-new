// import { createFileRoute } from "@tanstack/react-router";
// import ImagelessHeader from "../-components/headers/ImagelessHeader";
// import ImageHeader from "../-components/headers/ImageHeader";
// import FlexSkeleton from "../-components/FlexSkeleton";
// import AboutIntro from "../-components/AboutIntro";
// import Principles from "../-components/Principles";
// import Stats from "../-components/Stats";
// import FacultyProfile from "../-components/FacultyProfile";
// import YearsOfExperience from "../-components/YearsOfExperience";
// import Cta from "../-components/Cta";
// import NewFacProf from "../-components/NewFacProfile";

import { createFileRoute } from "@tanstack/react-router";
import ImageHeader from "../home/-components/headers/ImageHeader";
import AboutIntro from "../home/-components/AboutIntro";
import Principles from "../home/-components/Principles";
import FacultyProfile from "../home/-components/FacultyProfile";
import NewFacProf from "../home/-components/NewFacProfile";
import YearsOfExperience from "../home/-components/YearsOfExperience";

export const Route = createFileRoute("/about/")({
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
