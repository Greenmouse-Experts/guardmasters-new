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
    <section
      className="relative overflow-hidden py-24 bg-accent"
      style={{
        backgroundImage: "url('pattern.png')",
        backgroundSize: "auto 100%",
        backgroundPosition: "left center",
        backgroundRepeat: "repeat-x",
      }}
    >
      <div className="relative mb-14 px-6 text-center md:px-16">
        <h2 className="text-3xl font-semibold text-white md:text-4xl font-pop">
          Affiliations &amp; Partnerships
        </h2>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 px-6 md:gap-12">
        {accreditations.map((item) => (
          <div
            key={item.name}
            className="flex shrink-0 items-center justify-center "
          >
            <img
              src={item.image}
              alt={item.name}
              className="size-42 object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
