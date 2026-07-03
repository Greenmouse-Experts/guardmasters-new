import { new_url } from "#/client/api.ts";
import type { ApiResponseV2 } from "#/types/api.js";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import axios from "axios";
import { ChevronDown, ArrowUpRight } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export default function FaqCert() {
  const query = useQuery<ApiResponseV2<FaqItem[]>>({
    queryKey: ["faq-cert"],
    queryFn: async () => {
      let resp = await axios.get(new_url + "faqs/published");
      return resp.data;
    },
  });

  const faqs = [...(query.data?.data ?? [])].sort((a, b) => a.order - b.order);

  return (
    <section className="px-6 py-8 text-white md:px-16 bg-base-200">
      <div className="container mx-auto">
        {/* FAQ header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="mb-6 inline-block rounded-full ring ring-current/40 px-4 py-1.5  tracking-[0.18em] font-semibold   uppercase text-accent">
              FAQs
            </span>
            <h2 className="text-4xl text-black font-semibold md:text-5xl font-pop">
              Got Questions?{" "}
              <span className="text-accent">We've Got Answers</span>
            </h2>
          </div>
          <p className="max-w-sm text-xl font-semibold leading-relaxed text-black/80">
            Find answers to common questions about our courses, certifications,
            enrollment process, and learning experience.
          </p>
        </div>

        {/* FAQ grid */}
        {faqs.length === 0 ? (
          <p className="py-10 text-center text-black/60">
            {query.isLoading ? "Loading FAQs..." : "No FAQs published yet."}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="group rounded-lg bg-[#D9D9D9] px-5 py-4 text-base-content [&_svg]:open:rotate-180"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-medium">{faq.question}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-secondary/30 text-secondary">
                    <ChevronDown className="h-4 w-4 transition-transform" />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-base-content/60">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        )}

        {/* CTA card */}
        <div className="mt-16 overflow-hidden rounded-2xl bg-accent px-8 py-12 md:px-12 md:py-14">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-6 inline-block text-[11px] font-medium tracking-[0.18em] text-white/50 uppercase">
                Cohort Opens Monthly
              </span>
              <h3
                className="max-w-xl text-4xl leading-[1.1] font-medium
                text-white md:text-5xl font-pop"
              >
                Start your path to a rewarding career in{" "}
                <span className="font-medium italic text-primary underline">
                  Corporate Security, Loss Prevention, Asset Protection
                </span>{" "}
                and{" "}
                <span className="font-medium italic text-primary underline ">
                  Business Continuity Management
                </span>{" "}
                today.
              </h3>
            </div>

            <div>
              <div className="overflow-hidden rounded-lg shadow-2xl relative isolate">
                <div className="bg-red-500 absolute left-14 right-12  top-8  bottom-17 z-10 rounded-xl">
                  <iframe
                    src="https://www.youtube.com/embed/7nE6xsvVE9U"
                    className="w-full h-full"
                    title="Guardmaster Institute"
                    allowFullScreen
                  ></iframe>
                </div>

                <img
                  src="/laptop.png"
                  alt="Guardmaster Institute certificate"
                  className="w-full object-cover"
                />
              </div>
              <div className="mt-6 flex flex-wrap justify-end gap-4">
                <Link
                  to="/home/programs"
                  className="btn gap-2  border-none bg-white px-6 font-medium text-black hover:bg-white/90"
                >
                  Apply Now
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/home/contact"
                  className="btn  border-white/30 bg-transparent px-6 font-medium text-white hover:border-white hover:bg-white/10"
                >
                  Talk to us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
