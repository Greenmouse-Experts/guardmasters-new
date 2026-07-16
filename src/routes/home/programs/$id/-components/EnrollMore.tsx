import apiClient from "#/client/api.ts";
import QueryCompLayout from "#/components/layout/QueryCompLayout.tsx";
import { useCartStore, useIsInCart, type CartItem } from "#/store/cartStore.ts";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, ChevronRight, Lock } from "lucide-react";
import type { ReactNode } from "react";
import ProgramCard from "../../-components/ProgramCard";

interface RelatedCourse {
  id: string;
  title: string;
  shortDesc: string;
  coverImage: string;
  originalPriceFormat: string;
  discountPriceFormat: string | null;
  program: {
    id: string;
    title: string;
  };
}

interface RelatedResponse {
  data: RelatedCourse[];
  count: number;
}

interface EnrollMoreProps {
  badge: string;
  title: ReactNode;
  description: string;
  price: string;
  priceNote: string;
  includes: string[];
  relatedBadge: string;
  relatedTitle: string;
  programId: string;
  currentCourseId?: string;
  cartItem?: CartItem;
}

export default function EnrollMore({
  badge,
  title,
  description,
  price,
  priceNote,
  includes,
  relatedBadge,
  relatedTitle,
  programId,
  currentCourseId,
  cartItem,
}: EnrollMoreProps) {
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

  const related = useQuery<RelatedResponse>({
    queryKey: ["related", programId],
    queryFn: async () => {
      const resp = await apiClient.get("/courses/public", {
        params: { programId },
      });
      return resp.data;
    },
  });
  return (
    <section className="">
      {/* Enroll / pricing */}
      <div className="bg-accent/15 px-6 py-20 md:px-16 md:py-28">
        <div className="container mx-auto grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left: copy */}
          <div>
            <span className="mb-8 inline-block rounded-full border border-base-content/25 bg-base-100 px-5 py-1.5 text-xs font-bold tracking-[0.2em] text-accent uppercase">
              {badge}
            </span>

            <h2 className="mb-8 font-pop text-5xl font-bold leading-tight text-accent md:text-6xl lg:text-7xl">
              {title}
            </h2>

            <p className="max-w-md font-bold text-lg leading-relaxed text-accent">
              {description}
            </p>
          </div>

          {/* Right: dark pricing card */}
          <div className="relative overflow-hidden rounded-2xl bg-accent p-8 md:p-10">
            {/* Subtle circle decoration */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full border border-white/5" />
            <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full border border-white/5" />

            {/* Price row */}
            <div className="mb-8 flex items-start justify-between gap-4">
              <span className="font-pop text-5xl font-bold text-primary md:text-6xl">
                {price}
              </span>
              <span className="mt-2 text-[10px] font-semibold tracking-[0.2em] text-white/30 uppercase">
                {priceNote}
              </span>
            </div>

            {/* Includes list */}
            <ul className="mb-8 flex flex-col gap-3">
              {includes.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check
                    className="h-4 w-4 shrink-0 text-primary"
                    strokeWidth={3}
                  />
                  <span className="text-sm text-white/80">{item}</span>
                </li>
              ))}
            </ul>

            {/* Enroll button */}
            <button
              type="button"
              onClick={handleEnroll}
              className="btn btn-block h-auto gap-2 rounded-xl border-none bg-primary py-4 text-base font-bold text-accent hover:bg-primary/90"
            >
              {inCart ? (
                <>
                  Added to cart <Check className="h-4 w-4" />
                </>
              ) : (
                <>
                  Enroll now <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </button>

            {/* Advisor link */}
            <Link
              to="/home/contact"
              className="mt-4 flex items-center justify-center gap-1 text-sm text-white/50 transition-colors hover:text-white/80"
            >
              Speak to an advisor
              <ChevronRight className="h-4 w-4" />
            </Link>

            {/* Trust line */}
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-white/30">
              <Lock className="h-3 w-3" />
              Secure enrollment · Immediate confirmation
            </p>
          </div>
        </div>
      </div>

      {/* Related courses */}
      <div className="bg-base-200 px-6 py-20 md:px-16 md:py-24">
        <div className="container mx-auto">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-6 inline-block rounded-full border border-base-content/15 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
                {relatedBadge}
              </span>
              <h2 className="text-4xl leading-tight font-light text-accent md:text-5xl">
                {relatedTitle}
              </h2>
            </div>

            <Link
              to="/home/programs"
              className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:underline"
            >
              All programs
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <QueryCompLayout query={related}>
            {(resp) => {
              const courses = (resp.data ?? []).filter(
                (course) => course.id !== currentCourseId,
              );

              if (courses.length === 0) {
                return (
                  <p className="py-10 text-center text-base-content/50">
                    No related courses available.
                  </p>
                );
              }

              return (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {courses.map((course) => (
                    <ProgramCard course={course} key={course.id} />
                  ))}
                </div>
              );
            }}
          </QueryCompLayout>
        </div>
      </div>
    </section>
  );
}
