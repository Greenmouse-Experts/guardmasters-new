const stats = [
  { value: "6+", label: "Accreditation Bodies" },
  { value: "236+", label: "Hours of Curriculum" },
  { value: "250+", label: "Active Learners" },
  { value: "40", label: "CPE Credits per Program" },
];

export default function Stats() {
  return (
    <section className="bg-base-100 px-6 py-16 md:px-16">
      <div className="container mx-auto grid grid-cols-2 border-t border-l border-base-300 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center border-r border-b border-base-300 px-6 py-12 text-center"
          >
            <span className="text-5xl font-semibold text-secondary md:text-6xl">
              {stat.value}
            </span>
            <span className="mt-4 font-medium tracking-[0.18em]  uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
