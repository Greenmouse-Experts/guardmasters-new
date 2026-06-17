import { forwardRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import PaystackPop from "@paystack/inline-js";
import apiClient from "#/client/api.ts";
import Modal, { type ModalHandle } from "#/components/modals/DialogModal.tsx";
import { useCartStore, type CartItem } from "#/store/cartStore.ts";

interface PaymentModalProps {
  items: CartItem[];
  amount: number;
}

interface CreateOrderResponse {
  message?: string;
  data?: {
    reference?: string;
    access_code?: string;
    authorization_url?: string;
    status?: string;
  };
}

const PaymentModal = forwardRef<ModalHandle, PaymentModalProps>(
  ({ items, amount }, ref) => {
    const clearCart = useCartStore((s) => s.clearCart);

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
        // The server initializes the transaction; resume it inline with the
        // Paystack popup using its access code (last segment of the URL).
        const accessCode =
          data?.data?.access_code ??
          data?.data?.authorization_url?.split("/").pop();

        if (!accessCode) {
          toast.error(data?.message ?? "Failed to initialize payment.");
          return;
        }

        const paystack = new PaystackPop();
        paystack.resumeTransaction(accessCode, {
          onSuccess: (trx) => {
            clearCart();
            window.location.href = `${window.location.origin}/payment/callback?reference=${trx.reference}`;
          },
          onCancel: () => toast.info("Payment was cancelled."),
          onError: (err) =>
            toast.error(err?.message ?? "Payment could not be completed."),
        });
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message ?? "Something went wrong. Try again.",
        );
      },
    });

    return (
      <Modal ref={ref} title="Checkout">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 text-secondary">
            <CreditCard className="h-7 w-7" />
          </span>
          <p className="mt-2 leading-relaxed text-base-content/70">
            You're about to pay{" "}
            <span className="font-bold text-accent">
              ${amount.toLocaleString()}
            </span>{" "}
            for{" "}
            <span className="font-bold text-accent">
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
