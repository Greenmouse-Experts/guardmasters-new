import { forwardRef } from "react";

const FlexSkeleton = forwardRef<HTMLDivElement, any>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className="flex flex-col md:flex-row items-center justify-between gap-8 py-8 bg-white container mx-auto"
    >
      <div className="w-full md:w-1/3 ">
        <span className="uppercase  tracking-widest border border-blue-200 rounded-full px-3 py-1 text-secondary">
          Our Story
        </span>
        <h2 className="text-4xl md:text-5xl mt-6 text-slate-900 leading-tight">
          Built for a complex security{" "}
          <span className="italic text-secondary ">environment.</span>
        </h2>
      </div>
      <div className="w-full md:w-1/2 text-slate-600 space-y-6 leading-relaxed">
        <p>
          Guardmaster Institute Canada™ specializes in Corporate Security
          Management, Loss Prevention, Corporate Forensics, Business Continuity
          Management, and Asset Protection education. As a trusted leader in
          professional development, we deliver globally recognized,
          practice-focused certification programs that equip professionals with
          the skills, credentials, and confidence to lead.
        </p>
        <p>
          Our programs combine academic rigor with industry relevance — designed
          not just to train but to transform security and allied professionals
          into strategic thinkers and effective leaders. We offer Mini-MBAs,
          Masterclasses, and accredited certification programs.
        </p>
      </div>
    </div>
  );
});

export default FlexSkeleton;
