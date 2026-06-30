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
    <section className="relative overflow-hidden bg-[linear-gradient(100deg,#0b1a4d_0%,#13235a_18%,#3a3550_38%,#6c5639_58%,#bb8a2e_80%,#e9a31f_100%)] py-32">
      <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(45deg,transparent_0_70px,rgba(255,255,255,0.12)_70px_140px),repeating-linear-gradient(-45deg,transparent_0_70px,rgba(255,255,255,0.12)_70px_140px)]" />

      <div className="relative mb-14 px-6 text-center md:px-16">
        <h2 className="text-3xl font-semibold text-white md:text-4xl">
          Affiliation &amp; Partnership
        </h2>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="flex w-max animate-marquee gap-6 pr-6 py">
          {[...accreditations, ...accreditations].map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex w-80 shrink-0 items-center gap-4 rounded-2xl bg-white px-6 py-5 shadow-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-12 w-12 shrink-0 rounded-full object-contain"
              />
              <div className="text-left">
                <h3 className="text-base font-semibold text-base-content">
                  {item.name}
                </h3>
                <p className="mt-1 text-[10px] font-medium tracking-[0.15em] text-base-content/80 uppercase">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
