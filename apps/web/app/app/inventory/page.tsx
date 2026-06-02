import { ArrowDownUp, Boxes, PackageSearch, Plus, Warehouse } from "lucide-react";

const stockRows = [
  ["Rice 5kg", "Main Warehouse", "124", "18", "Healthy"],
  ["Cooking Oil", "Main Warehouse", "36", "24", "Watch"],
  ["Phone Charger", "Electronics Shelf", "9", "12", "Low"],
  ["Milk Pack", "Cold Storage", "42", "30", "Healthy"]
];

const actions = [
  { label: "Stock In", icon: Plus },
  { label: "Transfer", icon: ArrowDownUp },
  { label: "Audit", icon: PackageSearch }
];

export default function InventoryPage() {
  return (
    <main className="min-h-screen bg-thunder-rain p-5 lg:p-8">
      <section className="mx-auto max-w-7xl bg-white p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-thunder-ember">Inventory control</p>
            <h1 className="font-display text-4xl font-bold">Products, Warehouses, and Stock</h1>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {actions.map(({ label, icon: Icon }) => (
              <button key={label} className="inline-flex h-11 items-center justify-center gap-2 bg-thunder-ink px-3 text-sm font-bold text-white">
                <Icon size={17} /> {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            ["Active Products", "1,248", Boxes],
            ["Warehouses", "6", Warehouse],
            ["Low Stock", "18", PackageSearch],
            ["Transfers Today", "7", ArrowDownUp]
          ].map(([label, value, Icon]) => (
            <article key={label as string} className="border border-thunder-ink/10 p-5">
              <Icon className="text-thunder-ember" />
              <p className="mt-4 text-sm text-thunder-storm">{label as string}</p>
              <p className="mt-1 text-3xl font-bold">{value as string}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto border border-thunder-ink/10">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead className="bg-thunder-ink text-white">
              <tr>
                {["Product", "Location", "On Hand", "Reorder At", "Status"].map((heading) => (
                  <th key={heading} className="p-4 text-sm">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stockRows.map((row) => (
                <tr key={row[0]} className="border-t border-thunder-ink/10">
                  {row.map((cell) => (
                    <td key={cell} className="p-4">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
