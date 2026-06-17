import type { ReactNode } from "react";

interface ImageHeaderProps {
  badge: string;
  title: ReactNode;
  image: string;
}

export default function ImageHeader({ badge, title, image }: ImageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-black px-6 pt-32 pb-40 md:px-16 md:pt-40 md:pb-56">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black" />

      <div className="relative container mx-auto">
        <span className="bg-white text-secondary p-2 rounded-full px-4  uppercase ">
          {badge}
        </span>
        <h1 className="max-w-3xl text-4xl leading-tight font-light text-white mt-4 md:text-6xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
