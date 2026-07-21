import { createFileRoute } from "@tanstack/react-router";
import { new_url } from "#/client/api.ts";
import type { ApiResponseV2 } from "#/types/api.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronDown, Globe, Mail, Phone } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export const Route = createFileRoute("/home/faq/")({
  component: RouteComponent,
});

function RouteComponent() {
  const query = useQuery<ApiResponseV2<FaqItem[]>>({
    queryKey: ["faq-cert"],
    queryFn: async () => {
      let resp = await axios.get(new_url + "faqs/published", {
        params: { limit: 20 },
      });
      return resp.data;
    },
  });

  const faqs = [...(query.data?.data ?? [])].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-base-300">
      <section className="container mx-auto py-48">
        <div className="mb-8 overflow-hidden rounded bg-gradient-to-r from-accent to-accent px-8 py-12 md:px-12 md:py-16">
          <h2 className="text-4xl leading-tight font-bold font-pop md:text-6xl text-center">
            <span className="text-white">Frequently Asked</span>{" "}
            <span className="text-primary">Questions</span>
          </h2>
          <p className="leading-relaxed text-white mt-4 text-lg text-center max-w-xl mx-auto">
            Find answers to common questions about our programs, certifications,
            accreditations, and how we can help you advance your career.
          </p>
        </div>

        <section className="pt-8 ">
          <h2 className="text-3xl font-bold mb-4 text-accent">All Questions</h2>
          <div className="">
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
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent  font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="flex-1  font-bold text-base-content">
                        {faq.question}
                      </span>
                      <ChevronDown className="chevron h-4 w-4 shrink-0  transition-transform" />
                    </summary>
                    <p className="mt-3 pl-10  leading-relaxed text-base-content/60">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            )}

            {/* Still have questions banner */}
            <div className="mt-20 flex flex-col gap-6 overflow-hidden rounded-2xl   px-6 py-6 md:flex-row md:items-center bg-white">
              <div className="shrink-0 md:max-w-[200px]">
                <p className="font-pop font-bold text-primary">
                  Still have questions?
                </p>
                <p className="mt-1  leading-relaxed text-base-content/90">
                  Our admissions team is here to help you choose the right
                  program.
                </p>
              </div>

              <div className="hidden h-14 w-px shrink-0 bg-white/10 md:block" />

              <div className="flex flex-1 flex-col gap-5 sm:flex-row sm:items-center sm:justify-around">
                <div className="flex items-center gap-3">
                  <div className="p-3 ring rounded-full ring-primary bg-accent">
                    <Phone className="h-5 w-5 shrink-0 text-white" />
                  </div>
                  <div>
                    <p className=" ">Call Us</p>
                    <p className=" font-semibold ">+1 437 545 1684</p>
                  </div>
                </div>

                <div className="hidden h-10 w-px bg-white/10 sm:block" />

                <div className="flex items-center gap-3">
                  <div className="p-3 ring rounded-full ring-primary bg-accent">
                    <Mail className="h-5 w-5 shrink-0 text-white" />
                  </div>
                  <div>
                    <p className=" ">Email Us</p>
                    <p className=" font-semibold text-base-content">
                      info@guardmasterinstitute.ca
                    </p>
                  </div>
                </div>

                <div className="hidden h-10 w-px bg-white/10 sm:block" />

                <div className="flex items-center gap-3">
                  <div className="p-3 ring rounded-full ring-primary bg-accent">
                    <Globe className="h-5 w-5 shrink-0 text-white" />
                  </div>
                  <div>
                    <p className=" ">Visit Our Website</p>
                    <p className=" font-semibold text-base-content">
                      guardmasterinstitute.ca
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-accent border-b border-primary/50">
          <div className="mt-16 overflow-hidden rounded-2xl bg-accent px-8 py-14 md:px-14 md:py-16 container mx-auto">
            <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-2">
              <div className="text-center lg:text-left">
                <h3 className="text-4xl leading-[1.1] font-bold text-white md:text-5xl lg:text-6xl font-pop italic">
                  Your Journey
                  <br />
                  <span className="text-primary">Starts Here.</span>
                </h3>
                <div className="mt-6 h-1 w-16 rounded-full bg-primary mx-auto lg:mx-0" />
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
    </div>
  );
}
