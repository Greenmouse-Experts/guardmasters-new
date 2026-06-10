import type { ReactNode } from "react";

interface ImageHeaderProps {
  badge: string;
  title: ReactNode;
  image: string;
}

export default function ImageHeader({ badge, title, image }: ImageHeaderProps) {
  return (
    <section
      data-theme="guard"
      className="relative overflow-hidden bg-black px-6 pt-32 pb-40 md:px-16 md:pt-40 md:pb-56"
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black" />

      <div className="relative container mx-auto">
        <span className="mb-6 inline-block rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-medium tracking-[0.18em] text-white/70 uppercase backdrop-blur-sm">
          {badge}
        </span>
        <h1 className="max-w-3xl text-4xl leading-tight font-light text-white md:text-6xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
