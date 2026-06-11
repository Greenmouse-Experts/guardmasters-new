import { ChevronDown, ChevronRight, Play } from "lucide-react";
import { useState } from "react";

interface Module {
  title: string;
  description: string;
  topics?: string[];
}

interface ModulesProps {
  modules: Module[];
}

export default function Modules({ modules }: ModulesProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section data-theme="guard" className="bg-base-100 px-6 md:px-16">
      <div className="container mx-auto">
        {modules.map((module, index) => (
          <ModuleAccordion
            key={module.title}
            number={String(index + 1).padStart(2, "0")}
            module={module}
            isOpen={openIndex === index}
            onToggle={() =>
              setOpenIndex((current) => (current === index ? -1 : index))
            }
          />
        ))}
      </div>
    </section>
  );
}

interface ModuleAccordionProps {
  number: string;
  module: Module;
  isOpen: boolean;
  onToggle: () => void;
}

function ModuleAccordion({
  number,
  module,
  isOpen,
  onToggle,
}: ModuleAccordionProps) {
  return (
    <div className="border-b border-base-300 py-8">
      <div className="flex items-start gap-6">
        <span className="mt-2 text-[11px] font-medium tracking-widest text-base-content/40">
          {number}
        </span>

        <button type="button" onClick={onToggle} className="flex-1 text-left">
          <h3 className="text-2xl leading-tight font-medium text-accent md:text-4xl">
            {module.title}
          </h3>
          <p className="mt-4 max-w-3xl leading-relaxed text-base-content/55">
            {module.description}
          </p>
        </button>

        <div className="flex shrink-0 flex-col gap-3">
          {isOpen ? (
            <>
              <button
                type="button"
                onClick={onToggle}
                aria-label="Collapse module"
                className="flex h-11 w-11 items-center justify-center rounded-sm bg-secondary text-secondary-content"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Preview module"
                className="flex h-11 w-11 items-center justify-center rounded-sm border border-base-300 text-base-content/50 hover:border-base-content/30"
              >
                <Play className="h-4 w-4" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onToggle}
              aria-label="Expand module"
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-base-300 text-base-content/50 hover:border-base-content/30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {isOpen && module.topics && module.topics.length > 0 && (
        <div className="mt-6 ml-12 border-t border-base-300 pt-6">
          <div className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2">
            {module.topics.map((topic) => (
              <div key={topic} className="flex items-start gap-3">
                <span className="mt-2.5 h-px w-4 shrink-0 bg-secondary" />
                <span className="text-base-content/70">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
