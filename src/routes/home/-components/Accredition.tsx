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
      className="relative overflow-hidden py-32"
      style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0,30 Q25,10 50,30 T100,30 L100,0 L0,0 Z%22 fill=%22%23e5e5e5%22/%3E%3Cpath d=%22M0,50 Q25,30 50,50 T100,50 L100,20 Q50,0 0,20 Z%22 fill=%22%23d9d9d9%22/%3E%3Cpath d=%22M0,70 Q25,50 50,70 T100,70 L100,40 Q50,20 0,40 Z%22 fill=%22%23cdcdcd%22/%3E%3C/svg%3E')",
        backgroundSize: "auto 100%",
        backgroundPosition: "left center",
        backgroundRepeat: "repeat-x",
      }}
    >

      <div className="relative mb-14 px-6 text-center md:px-16">
        <h2 className="text-3xl font-semibold text-accent md:text-4xl">
          Affiliations &amp; Partnership
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
