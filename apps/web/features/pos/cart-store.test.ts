import { beforeEach, describe, expect, it } from "vitest";
import { calculateCartTotals, useCartStore } from "./cart-store";

describe("POS cart store", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it("merges matching variants and calculates checkout totals", () => {
    const store = useCartStore.getState();

    store.addItem({ variantId: "rice-5kg", name: "Rice 5kg", quantity: 1, unitPrice: 24, taxRate: 0.1 });
    store.addItem({ variantId: "rice-5kg", name: "Rice 5kg", quantity: 2, unitPrice: 24, taxRate: 0.1 });

    const state = useCartStore.getState();
    const totals = state.getTotals();

    expect(state.items).toHaveLength(1);
    expect(state.items[0]?.quantity).toBe(3);
    expect(totals).toEqual({ subtotal: 72, discount: 0, tax: 7.2, total: 79.2 });
  });

  it("removes an item when quantity is reduced to zero", () => {
    const store = useCartStore.getState();

    store.addItem({ variantId: "milk-pack", name: "Milk Pack", quantity: 1, unitPrice: 3.25, taxRate: 0.05 });
    useCartStore.getState().updateQuantity("milk-pack", 0);

    expect(useCartStore.getState().items).toEqual([]);
  });

  it("applies per-unit discounts before tax", () => {
    const totals = calculateCartTotals([
      { variantId: "charger-usb-c", name: "Phone Charger", quantity: 2, unitPrice: 14.99, taxRate: 0.1, discountAmount: 1 }
    ]);

    expect(totals).toEqual({ subtotal: 29.98, discount: 2, tax: 2.8, total: 30.78 });
  });
});
