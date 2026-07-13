import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Headphones, Loader2, Mail, MessageCircle, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import apiClient, { new_url } from "#/client/api.ts";
import Modal, { type ModalHandle } from "#/components/modals/DialogModal.tsx";
import { extract_message } from "#/helpers/apihelpers.tsx";
import { useProfile } from "#/store/authStore.ts";
import type { ApiResponseV2 } from "#/types/api.js";
import axios from "axios";

export const Route = createFileRoute("/user/support/")({
  component: RouteComponent,
});

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

const contactCards = [
  {
    icon: Mail,
    label: "Email us",
    value: "info@guardmasterinstitute.ca",
    href: "mailto:info@guardmasterinstitute.ca",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+1 905-452-2470",
    href: "tel:+19054522470",
  },
];

function RouteComponent() {
  const modalRef = useRef<ModalHandle>(null);

  const faqQuery = useQuery<ApiResponseV2<FaqItem[]>>({
    queryKey: ["faq-cert"],
    queryFn: async () => {
      const resp = await axios.get(new_url + "faqs/published");
      return resp.data;
    },
  });

  const faqs = [...(faqQuery.data?.data ?? [])].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-accent text-accent-content">
          <Headphones className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold text-accent">Support</h1>
          <p className="text-sm text-base-content/55">
            Need a hand? Reach out and our team will get back to you.
          </p>
        </div>
      </div>

      {/* Contact channels */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {contactCards.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            className="flex flex-col gap-3 rounded-lg border border-base-300 bg-base-100 p-6 transition-colors hover:border-secondary"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary/10 text-secondary">
              <channel.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-base-content/55">{channel.label}</p>
              <p className="font-medium text-accent">{channel.value}</p>
            </div>
          </a>
        ))}

        <button
          type="button"
          onClick={() => modalRef.current?.open()}
          className="flex flex-col gap-3 rounded-lg border border-base-300 bg-base-100 p-6 text-left transition-colors hover:border-secondary"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary/10 text-secondary">
            <MessageCircle className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm text-base-content/55">Send a message</p>
            <p className="font-medium text-accent">We'll reply by email</p>
          </div>
        </button>
      </div>

      <Modal ref={modalRef} title="Send a message">
        <MessageForm onDone={() => modalRef.current?.close()} />
      </Modal>

      {/* FAQ */}
      <div className="rounded-lg border border-base-300 bg-base-100 p-6">
        <h2 className="mb-4 text-lg font-semibold text-accent uppercase">
          Frequently asked questions
        </h2>
        {faqs.length === 0 ? (
          <p className="py-6 text-center text-sm text-base-content/50">
            {faqQuery.isLoading ? "Loading FAQs..." : "No FAQs available yet."}
          </p>
        ) : (
          <div className="divide-y divide-base-300">
            {faqs.map((faq) => (
              <details key={faq.id} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-accent ">
                  {faq.question}
                  <span className="text-base-content/40 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-base-content/60">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface MessageFields {
  name: string;
  email: string;
  message: string;
}

function MessageForm({ onDone }: { onDone: () => void }) {
  const [profile] = useProfile();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFields>({
    defaultValues: {
      name: [profile?.firstName, profile?.lastName].filter(Boolean).join(" "),
      email: profile?.email ?? "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: MessageFields) => {
      const { data } = await apiClient.post("contact-me", values);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message ?? "Message sent. We'll be in touch soon.");
      reset();
      onDone();
    },
    onError: (err) => toast.error(extract_message(err)),
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium text-accent">
          Name
        </label>
        <input
          {...register("name", { required: "Name is required" })}
          className="w-full rounded-md border border-base-300 bg-base-100 px-4 py-2.5 text-sm text-base-content focus:border-secondary focus:outline-none"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-error">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-accent">
          Email
        </label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full rounded-md border border-base-300 bg-base-100 px-4 py-2.5 text-sm text-base-content focus:border-secondary focus:outline-none"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-error">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-accent">
          Message
        </label>
        <textarea
          rows={5}
          {...register("message", { required: "Message is required" })}
          placeholder="How can we help?"
          className="w-full rounded-md border border-base-300 bg-base-100 px-4 py-2.5 text-sm text-base-content placeholder:text-base-content/40 focus:border-secondary focus:outline-none"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-error">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="btn btn-block h-auto gap-2 rounded-md border-none bg-secondary py-3 font-medium text-secondary-content hover:bg-secondary/90 disabled:opacity-60"
      >
        {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {mutation.isPending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
