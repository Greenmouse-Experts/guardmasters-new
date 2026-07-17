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

      {/* Related courses */}
      <div className="bg-accent px-6 py-20 md:px-16 md:py-24">
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
              search={{
                search: "",
                programId: "",
              }}
              className="flex items-center gap-1.5 text-xl font-medium text-accent-content hover:underline"
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
                    <ProgramCard outline course={course} key={course.id} />
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
