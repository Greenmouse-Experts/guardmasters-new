import { new_url } from "#/client/api.ts";
import type { ApiResponseV2 } from "#/types/api.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronDown } from "lucide-react";

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
        {/* FAQ header banner */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-accent to-accent/70 px-8 py-12 md:px-12 md:py-16">
          <h2 className="text-4xl leading-tight font-bold font-pop md:text-6xl">
            <span className="text-white">Frequently Asked</span>
            <br />
            <span className="text-primary">Questions</span>
          </h2>
          <div className="mt-3 mb-5 h-1 w-16 rounded-full bg-primary" />
          <p className="max-w-md leading-relaxed text-white/60">
            Find answers to common questions about our programs, certifications,
            accreditations, and how we can help you advance your career.
          </p>
        </div>

        {/* FAQ grid */}
        {faqs.length === 0 ? (
          <p className="py-10 text-center text-black/60">
            {query.isLoading ? "Loading FAQs..." : "No FAQs published yet."}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {faqs.map((faq, i) => (
              <details
                key={faq.id}
                className="group h-fit rounded-xl bg-base-100 px-5 py-4 text-base-content shadow-sm [&_.chevron]:open:rotate-180"
              >
                <summary className="flex cursor-pointer list-none items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm font-bold text-base-content">
                    {faq.question}
                  </span>
                  <ChevronDown className="chevron h-4 w-4 shrink-0 text-base-content/50 transition-transform" />
                </summary>
                <p className="mt-3 pl-10 text-sm leading-relaxed text-base-content/60">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        )}

        {/* CTA banner */}
        <div className="mt-16 overflow-hidden rounded-2xl bg-accent px-8 py-14 md:px-14 md:py-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-4xl leading-[1.1] font-bold text-white md:text-5xl font-pop italic">
                Your Journey
                <br />
                <span className="text-primary">Starts Here.</span>
              </h3>
              <div className="mt-6 h-1 w-16 rounded-full bg-primary" />
            </div>

            <div className="overflow-hidden rounded-lg relative isolate">
              <div className="absolute left-[10%] right-[9%] top-[9%] bottom-[15%] z-10 overflow-hidden rounded-sm bg-black">
                <iframe
                  src="https://www.youtube.com/embed/7nE6xsvVE9U"
                  className="w-full h-full"
                  title="Guardmaster Institute"
                  allowFullScreen
                ></iframe>
              </div>

              <img
                src="/laptop.png"
                alt="Guardmaster Institute Canada on YouTube"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
