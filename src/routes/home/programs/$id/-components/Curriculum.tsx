export default function Curriculum() {
  return (
    <section data-theme="guard" className="bg-base-100 px-6 md:px-16  pb-8">
      <div className="container mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
        <div>
          <span className="mb-8 inline-block rounded-full border border-base-content/15 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
            Curriculum
          </span>

          <h2 className="text-4xl leading-tight font-light text-accent md:text-5xl">
            A structured path from{" "}
            <em className="text-secondary italic">foundation to capstone.</em>
          </h2>
        </div>

        <p className="leading-relaxed text-base-content/55">
          Each module combines lecture material, case studies, video, and
          assessments progressing learners from foundational concepts to
          applied, organization-level decision making.
        </p>
      </div>
    </section>
  );
}
