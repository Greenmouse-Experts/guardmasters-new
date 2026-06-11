import { BadgeCheck } from "lucide-react";
import type { ReactNode } from "react";

interface ProgramCertificateProps {
  badge: string;
  title: ReactNode;
  description: ReactNode;
  features: string[];
  image: string;
  imageAlt?: string;
}

export default function ProgramCertificate({
  badge,
  title,
  description,
  features,
  image,
  imageAlt,
}: ProgramCertificateProps) {
  return (
    <section
      data-theme="guard"
      className="relative overflow-hidden bg-black px-6 py-20 text-white md:px-16 md:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,40,40,0.25),transparent_60%)]" />

      <div className="relative container mx-auto grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="mb-8 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            {badge}
          </span>

          <h2 className="mb-8 text-4xl leading-tight font-light md:text-5xl">
            {title}
          </h2>

          <p className="mb-10 max-w-xl leading-relaxed text-white/50">
            {description}
          </p>

          <ul className="flex flex-col gap-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-white/85">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <img
          src={"/certificate.png"}
          alt={imageAlt ?? "/certificate.png"}
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
