import { useRef } from "react";
import apiClient from "#/client/api.ts";
import QueryCompLayout from "#/components/layout/QueryCompLayout.tsx";
import Modal, { type ModalHandle } from "#/components/modals/DialogModal.tsx";
import { extract_message } from "#/helpers/apihelpers.tsx";
import type { ApiResponseV2 } from "#/types/api.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Star } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface ReviewUser {
  firstName?: string;
  lastName?: string;
  picture?: string;
}

interface ReviewItem {
  id: string;
  rating: number | string;
  comment: string;
  user?: ReviewUser;
  createdDate?: string;
}

interface ReviewsData {
  results: ReviewItem[];
  totalRating: string;
  avgRating: string;
}

const LoadReviews = ({ id }: { id: string }) => {
  const modalRef = useRef<ModalHandle>(null);

  const query = useQuery<ApiResponseV2<ReviewsData>>({
    queryKey: ["reviews", id],
    queryFn: async () => {
      let resp = await apiClient.get(`reviews/fetch-course-reviews/${id}`);
      return resp.data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-semibold text-accent">Course reviews</h3>
        <button
          type="button"
          onClick={() => modalRef.current?.open()}
          className="flex items-center gap-1.5 rounded-md border border-base-300 px-3 py-1.5 text-sm font-medium text-base-content/70 transition-colors hover:bg-base-200"
        >
          <Plus className="h-4 w-4" />
          Add review
        </button>
      </div>

      <QueryCompLayout query={query} loadingText="Loading reviews...">
        {(resp) => {
          const results = resp.data?.results ?? [];
          const avg = Number(resp.data?.avgRating) || 0;

          return (
            <div className="space-y-6">
              {/* Summary */}
              <div className="flex items-center gap-4">
                <span className="text-4xl font-semibold text-accent">
                  {avg.toFixed(1)}
                </span>
                <div>
                  <Stars value={avg} />
                  <p className="mt-1 text-sm text-base-content/55">
                    {resp.count} review{resp.count !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* List */}
              {results.length === 0 ? (
                <p className="py-8 text-center text-sm text-base-content/50">
                  There are no reviews for this course yet.
                </p>
              ) : (
                <ul className="divide-y divide-base-300">
                  {results.map((review) => (
                    <ReviewRow key={review.id} review={review} />
                  ))}
                </ul>
              )}
            </div>
          );
        }}
      </QueryCompLayout>

      <Modal ref={modalRef} title="Add a review">
        <AddReview id={id} onDone={() => modalRef.current?.close()} />
      </Modal>
    </div>
  );
};

interface ReviewForm {
  rating: number;
  comment: string;
}

function AddReview({ id, onDone }: { id: string; onDone: () => void }) {
  const queryClient = useQueryClient();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewForm>({ defaultValues: { rating: 0, comment: "" } });

  const mutation = useMutation({
    mutationFn: async (values: ReviewForm) => {
      const { data } = await apiClient.post("reviews/create-course-review", {
        rating: values.rating,
        comment: values.comment,
        item: id,
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message ?? "Review submitted.");
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
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
        <label className="mb-2 block text-sm font-medium text-accent">
          Rating
        </label>
        <Controller
          control={control}
          name="rating"
          rules={{ min: { value: 1, message: "Please select a rating" } }}
          render={({ field }) => (
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => field.onChange(i + 1)}
                  aria-label={`${i + 1} star${i ? "s" : ""}`}
                >
                  <Star
                    className={`h-8 w-8 transition-transform hover:scale-110 ${
                      field.value >= i + 1
                        ? "fill-warning text-warning"
                        : "text-base-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        />
        {errors.rating && (
          <p className="mt-1 text-xs text-error">{errors.rating.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-accent">
          Review
        </label>
        <textarea
          {...register("comment", { required: "Please write a review" })}
          rows={4}
          placeholder="Share your experience with this course…"
          className="w-full rounded-md border border-base-300 bg-base-100 p-3 text-sm text-base-content placeholder:text-base-content/40 focus:border-secondary focus:outline-none"
        />
        {errors.comment && (
          <p className="mt-1 text-xs text-error">{errors.comment.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="btn btn-block h-auto rounded-md border-none bg-secondary py-3 font-medium text-secondary-content hover:bg-secondary/90 disabled:opacity-60"
      >
        {mutation.isPending ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}

function ReviewRow({ review }: { review: ReviewItem }) {
  const name =
    [review.user?.firstName, review.user?.lastName].filter(Boolean).join(" ") ||
    "Anonymous";
  const initials =
    `${review.user?.firstName?.[0] ?? ""}${review.user?.lastName?.[0] ?? ""}`.toUpperCase() ||
    "A";

  return (
    <li className="flex gap-4 py-4">
      {review.user?.picture ? (
        <img
          src={review.user.picture}
          alt={name}
          className="h-11 w-11 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-sm font-semibold text-secondary">
          {initials}
        </span>
      )}
      <div className="min-w-0">
        <p className="font-medium text-accent">{name}</p>
        <Stars value={Number(review.rating) || 0} />
        {review.comment && (
          <p className="mt-1.5 text-sm leading-relaxed text-base-content/65">
            {review.comment}
          </p>
        )}
      </div>
    </li>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.round(value)
              ? "fill-warning text-warning"
              : "text-base-300"
          }`}
        />
      ))}
    </div>
  );
}

export default LoadReviews;
