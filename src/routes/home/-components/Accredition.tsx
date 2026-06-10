const accreditations = [
  {
    image: "/accredition/asis.png",
    name: "ASIS International",
    role: "Preferred CPE Provider",
  },
  {
    image: "/accredition/ifpo.png",
    name: "IFPO — USA",
    role: "Approved Training Centre",
  },
  {
    image: "/accredition/chlps.png",
    name: "ChLPS Canada",
    role: "Accredited Provider",
  },
  {
    image: "/accredition/actd.png",
    name: "ACTD — USA",
    role: "Accredited Institution",
  },
  {
    image: "/accredition/csi.png",
    name: "CSI Spain",
    role: "Approved Training Centre",
  },
  {
    image: "/accredition/iso.png",
    name: "ISO Standards",
    role: "Accredited Trainer",
  },
];

export default function Accredition() {
  return (
    <section data-theme="guard" className="bg-base-100 px-6 py-20 md:px-16">
      <div className="container mx-auto">
        <div className="mb-14 text-center">
          <span className="mb-8 inline-block rounded-full border border-base-content/20 px-4 py-1.5 text-[11px] font-medium tracking-[0.18em] text-secondary uppercase">
            Trusted Globally
          </span>
          <h2 className="text-4xl leading-tight font-light text-base-content md:text-5xl">
            Accredited by the bodies that
            <br />
            <em className="italic text-accent">matter most.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 border-t border-l border-base-300 sm:grid-cols-2 lg:grid-cols-3">
          {accreditations.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center border-r border-b border-base-300 px-6 py-12 text-center transition-colors hover:bg-base-200"
            >
              <div className="mb-8 flex h-36 items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-base-content">
                {item.name}
              </h3>
              <p className="mt-2 text-xs font-medium tracking-[0.15em] text-base-content/50 uppercase">
                {item.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
