import { create } from "zustand";

export interface CartItem {
  variantId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discountAmount?: number;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clear: () => void;
  getTotals: () => CartTotals;
}

const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export function calculateCartTotals(items: CartItem[]): CartTotals {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discount = items.reduce((sum, item) => sum + (item.discountAmount ?? 0) * item.quantity, 0);
  const taxableBase = items.reduce(
    (sum, item) => sum + Math.max(item.unitPrice - (item.discountAmount ?? 0), 0) * item.quantity * item.taxRate,
    0
  );
  const total = subtotal - discount + taxableBase;

  return {
    subtotal: roundMoney(subtotal),
    discount: roundMoney(discount),
    tax: roundMoney(taxableBase),
    total: roundMoney(total)
  };
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((cartItem) => cartItem.variantId === item.variantId);

      if (!existing) {
        return { items: [...state.items, item] };
      }

      return {
        items: state.items.map((cartItem) =>
          cartItem.variantId === item.variantId
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      };
    }),
  updateQuantity: (variantId, quantity) =>
    set((state) => ({
      items: state.items
        .map((item) => (item.variantId === variantId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    })),
  removeItem: (variantId) => set((state) => ({ items: state.items.filter((item) => item.variantId !== variantId) })),
  clear: () => set({ items: [] }),
  getTotals: () => calculateCartTotals(get().items)
}));
