import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, LogIn, ShoppingBag, Trash2, UserPlus, X } from "lucide-react";
import { toast } from "sonner";
import apiClient from "#/client/api.ts";
import Modal, { type ModalHandle } from "#/components/modals/DialogModal.tsx";
import { useAuth } from "#/store/authStore.ts";
import {
  useCartItems,
  useCartStore,
  useCartSubtotal,
  type CartOrder,
} from "#/store/cartStore.ts";

interface CreateOrderResponse {
  message?: string;
  data?: {
    reference?: string;
    status?: string;
    authorization_url?: string;
    subAmount?: number;
    taxAmount?: number;
  };
}

interface PreviewOrderResponse {
  message?: string;
  data?: {
    subAmount?: number;
    taxAmount?: number;
    taxRate?: number;
    total?: number;
  };
}

function money(n: number) {
  return `$${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function CartSidebar() {
  const navigate = useNavigate();
  const [user] = useAuth();
  const closeCart = useCartStore((s) => s.closeCart);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const order = useCartStore((s) => s.order);
  const setOrder = useCartStore((s) => s.setOrder);
  const items = useCartItems();
  const subtotal = useCartSubtotal();
  const authModalRef = useRef<ModalHandle>(null);
  const token = user?.accessToken;

  // Create/refresh the order whenever the cart changes (authenticated only).
  const createOrder = useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post<CreateOrderResponse>(
        "orders/create",
        {
          courses: items.map(({ id, price }) => ({ id, price })),
          amount: subtotal,
          callback_url: `${window.location.origin}/payment/callback`,
        },
      );
      return data;
    },
    onSuccess: (data) => {
      const d = data?.data;
      if (!d) return;
      const next: CartOrder = {
        reference: d.reference ?? "",
        status: d.status ?? "",
        authorizationUrl: d.authorization_url ?? "",
        subAmount: d.subAmount ?? subtotal,
        taxAmount: d.taxAmount ?? 0,
        taxRate: 0,
        total: (d.subAmount ?? subtotal) + (d.taxAmount ?? 0),
      };
      setOrder(next);
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ?? "Could not calculate your order.",
      );
    },
  });

  const previewOrder = useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post<PreviewOrderResponse>(
        "orders/preview",
        {
          courses: items.map(({ id, price }) => ({ id, price })),
          amount: subtotal,
        },
      );
      return data;
    },
    onSuccess: (data) => {
      const d = data?.data;
      if (!d) return;
      setOrder({
        reference: "",
        status: "",
        authorizationUrl: "",
        subAmount: d.subAmount ?? subtotal,
        taxAmount: d.taxAmount ?? 0,
        taxRate: d.taxRate ?? 0,
        total: d.total ?? (d.subAmount ?? subtotal) + (d.taxAmount ?? 0),
      });
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ?? "Could not calculate your order.",
      );
    },
  });

  // Recompute preview when cart changes. Only calls orders/create at checkout.
  useEffect(() => {
    if (!token || items.length === 0) return;
    previewOrder.mutate();
  }, [items, token, previewOrder.mutate]);

  function handleCheckout() {
    // Keep the cart drawer open — the auth modal is nested inside it, so
    // closing the drawer would hide it. Require auth before checking out.
    if (!token) {
      authModalRef.current?.open();
      return;
    }
    // Order (with the Stripe URL) is created on cart changes — redirect to it.
    if (order?.authorizationUrl) {
      if (order.reference) {
        sessionStorage.setItem("gi_payment_reference", order.reference);
      }
      window.location.href = order.authorizationUrl;
      return;
    }
    // No order yet (e.g. just signed in) — create one, then redirect.
    createOrder.mutate(undefined, {
      onSuccess: (data) => {
        const d = data?.data;
        if (d?.reference) {
          sessionStorage.setItem("gi_payment_reference", d.reference);
        }
        if (d?.authorization_url) window.location.href = d.authorization_url;
      },
    });
  }

  function goToAuth(to: "/home/auth/login" | "/home/auth/signup") {
    authModalRef.current?.close();
    closeCart();
    navigate({ to });
  }

  return (
    <>
      <div className="flex h-full w-screen max-w-md flex-col bg-base-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-base-300 px-6 py-5">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-accent">Cart</h2>
            {items.length > 0 && (
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5  font-bold text-primary-content">
                {items.length}
              </span>
            )}{" "}
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="btn btn-circle btn-ghost btn-sm text-base-content/60"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-base-200 text-base-content/40">
              <ShoppingBag className="h-7 w-7" />
            </span>
            <p className="text-base-content/55">Your cart is empty</p>
            <button
              type="button"
              onClick={() => {
                closeCart();
                navigate({
                  to: "/courses",
                  search: { search: "", programId: "" },
                });
              }}
              className="rounded-sm bg-secondary px-6 py-2.5  font-medium text-secondary-content hover:bg-secondary/90"
            >
              Browse programs
            </button>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-base-200 overflow-y-auto px-6">
            {items.map((item) => (
              <li key={item.id} className="flex items-start gap-4 py-4">
                <div className="h-16 w-20 shrink-0 overflow-hidden rounded-md bg-base-200">
                  {item.coverImg && (
                    <img
                      src={item.coverImg}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2  font-semibold text-accent">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-bold text-secondary">
                    {item.fmprice}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.title}`}
                  className="shrink-0 text-error/70 transition-colors hover:text-error"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-base-300 px-6 py-5">
            <div className="mb-5 space-y-2">
              <div className="flex items-center justify-between text-base-content/60">
                <span>Subtotal</span>
                <span className="font-medium text-accent">
                  {money(order?.subAmount ?? subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-base-content/60">
                <span>Tax</span>
                <span className="font-medium text-accent">
                  {previewOrder.isPending && !order ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {money(order?.taxAmount ?? 0)}
                      {order?.taxRate ? ` (${order.taxRate}%)` : null}
                    </>
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-base-300 pt-2">
                <span className="text-base-content/60">Total</span>
                <span className="text-xl font-bold text-accent">
                  {money(order?.total ?? subtotal)}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={previewOrder.isPending || createOrder.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3.5 font-semibold text-primary-content transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {createOrder.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Checkout
            </button>
            <button
              type="button"
              onClick={clearCart}
              className="mt-3 w-full rounded-md bg-error py-3.5 font-semibold text-error-content transition-colors hover:bg-error/90"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>

      <Modal ref={authModalRef} title="Sign in to continue">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 text-secondary">
            <LogIn className="h-7 w-7" />
          </span>
          <p className="mt-2 leading-relaxed text-base-content/60">
            You need an account to complete your purchase. Sign in or create one
            to continue to checkout.
          </p>
          <div className="mt-6 flex w-full flex-col gap-3">
            <button
              type="button"
              onClick={() => goToAuth("/home/auth/login")}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-secondary py-3 font-semibold text-secondary-content hover:bg-secondary/90"
            >
              <LogIn className="h-4 w-4" />
              Sign in
            </button>
            <button
              type="button"
              onClick={() => goToAuth("/home/auth/signup")}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-secondary py-3 font-semibold text-secondary hover:bg-secondary/10"
            >
              <UserPlus className="h-4 w-4" />
              Create account
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
