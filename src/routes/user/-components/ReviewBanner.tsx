import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import apiClient from "#/client/api.ts";
import Modal, { type ModalHandle } from "#/components/modals/DialogModal.tsx";
import { extract_message } from "#/helpers/apihelpers.tsx";

export default function ReviewBanner() {
  const modalRef = useRef<ModalHandle>(null);

  return (
    <div className="relative overflow-hidden rounded-lg bg-accent px-8 py-10 text-accent-content">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/people.jpg')" }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-lg">
        <h2 className="text-2xl font-semibold">Leave Us A Review</h2>
        <p className="mt-2 text-accent-content/70">
          Add your take to the hundreds of testimonials we've received.
        </p>
        <button
          type="button"
          onClick={() => modalRef.current?.open()}
          className="mt-6 rounded-sm bg-secondary px-6 py-3  font-medium text-secondary-content transition-colors hover:bg-secondary/90"
        >
          Write a Review
        </button>
      </div>

      <Modal ref={modalRef} title="Write a testimony">
        <TestimonyForm onDone={() => modalRef.current?.close()} />
      </Modal>
    </div>
  );
}

interface TestimonyFields {
  testimony: string;
}

function TestimonyForm({ onDone }: { onDone: () => void }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestimonyFields>();

  const mutation = useMutation({
    mutationFn: async (values: TestimonyFields) => {
      const { data } = await apiClient.post("testimonials", values);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message ?? "Thank you for your testimony!");
      reset();
      onDone();
    },
    onError: (err) => toast.error(extract_message(err)),
  });

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
    >
      <div>
        <label className="mb-2 block  font-medium text-accent">Testimony</label>
        <textarea
          {...register("testimony", {
            required: "Please write your testimony",
          })}
          rows={5}
          placeholder="Tell us about your experience…"
          className="w-full rounded-md border border-base-300 bg-base-100 p-3  text-base-content placeholder:text-base-content/40 focus:border-secondary focus:outline-none"
        />
        {errors.testimony && (
          <p className="mt-1  text-error">{errors.testimony.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="btn btn-block h-auto rounded-md border-none bg-secondary py-3 font-medium text-secondary-content hover:bg-secondary/90 disabled:opacity-60"
      >
        {mutation.isPending ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}
