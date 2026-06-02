"use client";

import {
  Banknote,
  Barcode,
  CreditCard,
  Minus,
  Pause,
  Plus,
  ReceiptText,
  RotateCcw,
  Search,
  Smartphone,
  Trash2,
  Wallet
} from "lucide-react";
import { useMemo, useState } from "react";
import { calculateCartTotals, type CartItem, useCartStore } from "./cart-store";

const catalog: CartItem[] = [
  { variantId: "rice-5kg", name: "Rice 5kg", quantity: 1, unitPrice: 24, taxRate: 0.1 },
  { variantId: "oil-1l", name: "Cooking Oil", quantity: 1, unitPrice: 8.5, taxRate: 0.08 },
  { variantId: "milk-pack", name: "Milk Pack", quantity: 1, unitPrice: 3.25, taxRate: 0.05 },
  { variantId: "notebook-a5", name: "Notebook", quantity: 1, unitPrice: 2.75, taxRate: 0.03 },
  { variantId: "charger-usb-c", name: "Phone Charger", quantity: 1, unitPrice: 14.99, taxRate: 0.1 },
  { variantId: "quick-sale", name: "Quick Sale", quantity: 1, unitPrice: 5, taxRate: 0 }
];

const paymentOptions = [
  { label: "Cash", icon: Banknote },
  { label: "Card", icon: CreditCard },
  { label: "Wallet", icon: Smartphone },
  { label: "Split", icon: Wallet }
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function PosWorkspace() {
  const [query, setQuery] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);
  const totals = useMemo(() => calculateCartTotals(items), [items]);

  const filteredCatalog = catalog.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="grid min-h-screen gap-4 bg-thunder-rain p-4 lg:grid-cols-[1fr_440px]">
      <section className="bg-white p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-thunder-ember">Live checkout</p>
            <h1 className="font-display text-4xl font-bold">POS Billing</h1>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm font-bold">
            <button className="inline-flex h-11 items-center justify-center gap-2 border border-thunder-ink/15 px-3">
              <Barcode size={17} /> Scan
            </button>
            <button className="inline-flex h-11 items-center justify-center gap-2 border border-thunder-ink/15 px-3">
              <Pause size={17} /> Hold
            </button>
            <button className="inline-flex h-11 items-center justify-center gap-2 border border-thunder-ink/15 px-3">
              <RotateCcw size={17} /> Return
            </button>
          </div>
        </div>

        <label className="mt-5 flex h-14 items-center gap-3 border border-thunder-ink/20 px-4">
          <Search className="shrink-0 text-thunder-steel" size={21} />
          <input
            className="h-full w-full bg-transparent text-lg outline-none"
            placeholder="Search product, scan barcode, or scan QR"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCatalog.map((product) => (
            <button
              key={product.variantId}
              className="min-h-32 border border-thunder-ink/10 bg-white p-4 text-left shadow-sm transition hover:border-thunder-ember hover:bg-thunder-rain"
              onClick={() => addItem(product)}
            >
              <span className="block text-lg font-bold">{product.name}</span>
              <span className="mt-3 block text-sm text-thunder-storm">{formatCurrency(product.unitPrice)}</span>
              <span className="mt-3 inline-flex bg-thunder-bolt px-3 py-1 text-sm font-bold text-thunder-ink">Add</span>
            </button>
          ))}
        </div>
      </section>

      <aside className="grid bg-thunder-ink p-5 text-white lg:h-[calc(100vh-2rem)] lg:grid-rows-[auto_1fr_auto]">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl font-bold">Cart</h2>
          <button className="inline-flex h-10 items-center justify-center gap-2 bg-white/10 px-3 text-sm font-bold" onClick={clear}>
            <Trash2 size={16} /> Clear
          </button>
        </div>

        <div className="mt-5 grid content-start gap-3 overflow-y-auto pr-1">
          {items.length === 0 ? (
            <div className="border border-white/15 p-5 text-sm text-white/75">No items added.</div>
          ) : (
            items.map((item) => (
              <div key={item.variantId} className="border border-white/15 p-4">
                <div className="flex justify-between gap-3">
                  <span className="font-bold">{item.name}</span>
                  <strong>{formatCurrency(item.unitPrice * item.quantity)}</strong>
                </div>
                <div className="mt-4 grid grid-cols-[40px_1fr_40px_40px] gap-2">
                  <button
                    className="inline-flex h-10 items-center justify-center bg-white/10"
                    onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                    aria-label={`Decrease ${item.name}`}
                  >
                    <Minus size={16} />
                  </button>
                  <div className="flex h-10 items-center justify-center border border-white/15 font-bold">
                    Qty {item.quantity}
                  </div>
                  <button
                    className="inline-flex h-10 items-center justify-center bg-white/10"
                    onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                    aria-label={`Increase ${item.name}`}
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    className="inline-flex h-10 items-center justify-center bg-white/10"
                    onClick={() => removeItem(item.variantId)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-5">
          <div className="grid gap-2 border-y border-white/15 py-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <strong>{formatCurrency(totals.subtotal)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <strong>{formatCurrency(totals.discount)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <strong>{formatCurrency(totals.tax)}</strong>
            </div>
          </div>
          <div className="mt-5 flex justify-between text-3xl font-bold">
            <span>Total</span>
            <span>{formatCurrency(totals.total)}</span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {paymentOptions.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className={`inline-flex h-14 items-center justify-center gap-2 font-bold ${
                  paymentMethod === label ? "bg-thunder-bolt text-thunder-ink" : "bg-white text-thunder-ink"
                }`}
                onClick={() => setPaymentMethod(label)}
              >
                <Icon size={18} /> {label}
              </button>
            ))}
          </div>
          <button
            className="mt-3 inline-flex h-14 w-full items-center justify-center gap-2 bg-thunder-mint font-bold text-thunder-ink disabled:cursor-not-allowed disabled:opacity-50"
            disabled={items.length === 0}
          >
            <ReceiptText size={19} /> Complete {paymentMethod} Sale
          </button>
        </div>
      </aside>
    </main>
  );
}
