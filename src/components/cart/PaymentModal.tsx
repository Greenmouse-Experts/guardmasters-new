import { forwardRef, useImperativeHandle, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import apiClient from "#/client/api.ts";
import Modal, { type ModalHandle } from "#/components/modals/DialogModal.tsx";
import { type CartItem } from "#/store/cartStore.ts";

interface PaymentModalProps {
  items: CartItem[];
  amount: number;
}

interface CreateOrderResponse {
  message?: string;
  data?: {
    reference?: string;
    status?: string;
    // Stripe Checkout Session hosted-page URL
    authorization_url?: string;
    url?: string;
  };
}

const PaymentModal = forwardRef<ModalHandle, PaymentModalProps>(
  ({ items, amount }, ref) => {
    const modalRef = useRef<ModalHandle>(null);
    useImperativeHandle(ref, () => ({
      open: () => modalRef.current?.open(),
      close: () => modalRef.current?.close(),
    }));

    const mutation = useMutation({
      mutationFn: async () => {
        const { data } = await apiClient.post<CreateOrderResponse>(
          "orders/create",
          {
            courses: items.map(({ id, price }) => ({ id, price })),
            amount,
            callback_url: `${window.location.origin}/payment/callback`,
          },
        );
        return data;
      },
      onSuccess: (data) => {
        // Backend creates the Stripe Checkout Session and returns its hosted
        // URL; send the user there. Stripe returns to `callback_url` after.
        const url = data?.data?.authorization_url ?? data?.data?.url;
        if (!url) {
          toast.error(data?.message ?? "Failed to initialize payment.");
          return;
        }
        // The reference is generated server-side and returned here, so it can't
        // be baked into callback_url beforehand. Stash it so the callback page
        // can confirm the payment when Stripe redirects the user back.
        const reference = data?.data?.reference;
        if (reference) {
          sessionStorage.setItem("gi_payment_reference", reference);
        }
        modalRef.current?.close();
        window.location.href = url;
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message ?? "Something went wrong. Try again.",
        );
      },
    });

    return (
      <Modal ref={modalRef} title="Checkout">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 text-secondary">
            <CreditCard className="h-7 w-7" />
          </span>
          <p className="mt-2 leading-relaxed text-base-content/70">
            You're about to pay{" "}
            <span className="font-semibold text-accent">
              ${amount.toLocaleString()}
            </span>{" "}
            for{" "}
            <span className="font-semibold text-accent">
              {items.length} item{items.length !== 1 ? "s" : ""}
            </span>
            .
          </p>

          <button
            type="button"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending || items.length === 0}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 font-semibold text-primary-content transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Initializing…
              </>
            ) : (
              "Proceed to Pay"
            )}
          </button>
        </div>
      </Modal>
    );
  },
);

PaymentModal.displayName = "PaymentModal";

export default PaymentModal;
