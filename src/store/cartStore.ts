import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

export interface CartItem {
  id: string;
  coverImg: string;
  title: string;
  price: number;
  fmprice: string;
}

interface CartState {
  // Keyed by course id so adding the same course twice is a no-op (dedup).
  items: Record<string, CartItem>;
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: {},
      isOpen: false,
      addItem: (item) =>
        set((state) => ({
          items: { ...state.items, [item.id]: item },
          isOpen: true,
        })),
      removeItem: (id) =>
        set((state) => {
          const next = { ...state.items };
          delete next[id];
          return { items: next };
        }),
      clearCart: () => set({ items: {} }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "guard-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

// Convenience selectors derived from the keyed map.
// `useShallow` keeps the derived array stable across renders (Object.values
// returns a fresh reference each call, which would otherwise loop forever).
export const useCartItems = () =>
  useCartStore(useShallow((state) => Object.values(state.items)));

export const useCartCount = () =>
  useCartStore((state) => Object.keys(state.items).length);

export const useCartSubtotal = () =>
  useCartStore((state) =>
    Object.values(state.items).reduce((sum, item) => sum + item.price, 0),
  );

export const useIsInCart = (id: string) =>
  useCartStore((state) => id in state.items);
