import { ArrowUpRight } from "lucide-react";

export default function Cta() {
  return (
    <section data-theme="guard" className=" bg-black py-16  ">
      <div className="container mx-auto flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <h2 className="text-4xl leading-tight font-light text-primary md:text-5xl">
          Ready to write the
          <br />
          next chapter?
        </h2>

        <button className="btn h-auto gap-2 rounded-md border-none bg-secondary px-8 py-4 font-medium text-secondary-content hover:bg-secondary/90">
          Explore programs
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
