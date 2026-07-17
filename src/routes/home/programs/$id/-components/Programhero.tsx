import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { default_stats } from "../-info/programs";
import { useCartStore, useIsInCart, type CartItem } from "#/store/cartStore.ts";

interface ProgramStat {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface ProgramHeroProps {
  badge: string;
  title: ReactNode;
  description: string;
  price: string;
  image: string;
  imageAlt?: string;
  stats: ProgramStat[];
  cartItem?: CartItem;
}

export default function ProgramHero({
  badge,
  title,
  description,
  price,
  image,
  imageAlt,
  stats,
  cartItem,
}: ProgramHeroProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const inCart = useIsInCart(cartItem?.id ?? "");

  function handleEnroll() {
    if (!cartItem) return;
    if (inCart) {
      openCart();
      return;
    }
    addItem(cartItem);
  }

  return (
    <div className="bg-accent">
      <section className="relative overflow-hidden from-accent -bg-linear-90 to-black/80 px-6 pt-32 pb-16 text-white md:px-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-size-[28px_28px]" />

        <div className="relative container mx-auto">
          <div className="mb-8 flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-white/50 uppercase">
            <Link to="/home" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              search={{ search: "" }}
              to="/home/programs"
              className="hover:text-white"
            >
              Programs
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="lg:col-span-1">
              {badge && (
                <span className="mb-6 inline-block rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium tracking-[0.15em] text-white/70 uppercase">
                  {badge}
                </span>
              )}

              <h1 className="mb-6 text-4xl leading-tight font-light md:text-6xl">
                {title}
              </h1>

              <p className="mb-10 max-w-xl leading-relaxed text-white/50">
                {description}
              </p>

              <div className="mb-12 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={handleEnroll}
                  className="btn h-auto gap-2 rounded-md border-none bg-primary px-6 py-4 font-bold text-lg text-accent"
                >
                  {inCart ? (
                    <>
                      Added to cart
                      <Check className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      {price ? `Enroll — ${price}` : "Enroll"}
                      <ArrowUpRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("curriculum")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="btn h-auto gap-2 rounded-md border border-white/20 bg-transparent px-6 py-4 font-medium text-white hover:bg-white/10 text-lg"
                >
                  Explore curriculum
                </button>
              </div>

              {stats.length > 0 ? (
                <div className="grid ring p-6 rounded-xl ring-primary grid-cols-3 gap-6 border-t border-white/10 pt-8 divide divide-x divide-base-content/90">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex gap-4 items-center">
                      <stat.icon className="size-12 text-primary/80" />
                      <div>
                        <div className="text-sm font-medium tracking-[0.15em] text-white/70 uppercase">
                          {stat.label}
                        </div>
                        <div className="mt-1 text-lg font-semibold">
                          {stat.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                  {default_stats.map((stat) => (
                    <div key={stat.label}>
                      <stat.icon className="mb-2 h-5 w-5 text-primary" />
                      <div className="text-[10px] font-medium tracking-[0.15em] text-white/50 uppercase">
                        {stat.label}
                      </div>
                      <div className="mt-1 text-xl font-semibold">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {image && (
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={image}
                  alt={imageAlt ?? ""}
                  className="w-full h-[500px] lg:h-[600px] object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
