import type { ReactNode } from "react";

interface ImageHeaderProps {
  badge?: string;
  title?: ReactNode;
  image?: string;
  badge_outline?: boolean;
  description?: any;
  fade?: boolean;
}

export default function ImageHeader({
  badge,
  title,
  image,
  badge_outline = false,
  description,
  fade = true,
}: ImageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-black px-6 pt-32 pb-40 md:px-16 md:pt-40 md:pb-22">
      <img
        src={image}
        alt=""
        className={
          "absolute inset-0 h-full w-full object-cover object-top " +
          (fade ? "opacity-60" : "")
        }
      />
      <div
        className={
          fade
            ? "absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black"
            : "absolute inset-0"
        }
      ></div>

      <div className="relative container mx-auto">
        {badge && (
          <>
            {badge_outline ? (
              <span className="bg-white/20 p-2 ring rounded-full px-4 text-white">
                {badge}
              </span>
            ) : (
              <span className="bg-white text-secondary p-2 rounded-full px-4 uppercase ">
                {badge}
              </span>
            )}
          </>
        )}
        <h1 className="max-w-3xl text-4xl font-pop leading-tight  text-white mt-4 md:text-6xl font-semibold">
          {title}
        </h1>
        {description && (
          <p className="max-w-3xl text-white mt-4 text-xl ">{description}</p>
        )}
      </div>
    </section>
  );
}
