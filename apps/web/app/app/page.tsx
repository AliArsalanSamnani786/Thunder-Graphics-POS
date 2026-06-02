import { BarChart3, Boxes, ReceiptText, ShieldCheck } from "lucide-react";
import Link from "next/link";

const stats = [
  ["Today Sales", "$1,284"],
  ["Trial Status", "Active"],
  ["Low Stock", "12"],
  ["Open Shifts", "3"]
];

const modules = [
  { icon: ReceiptText, label: "POS Billing" },
  { icon: Boxes, label: "Inventory" },
  { icon: BarChart3, label: "Reports" },
  { icon: ShieldCheck, label: "Security" }
];

export default function AppDashboardPage() {
  return (
    <main className="min-h-screen bg-white">
      <aside className="fixed hidden h-screen w-64 border-r border-thunder-ink/10 bg-thunder-ink p-6 text-white lg:block">
        <h1 className="font-display text-3xl font-bold">Thunder POS</h1>
        <nav className="mt-10 grid gap-3 font-semibold">
          <Link href="/app">Dashboard</Link>
          <Link href="/app/pos">POS</Link>
          <Link href="/app/inventory">Inventory</Link>
          <Link href="/app/accounting">Accounting</Link>
          <Link href="/app/reports">Reports</Link>
        </nav>
      </aside>
      <section className="p-5 lg:ml-64 lg:p-10">
        <h2 className="font-display text-4xl font-bold">Business Dashboard</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {stats.map(([label, value]) => (
            <article key={label} className="border border-thunder-ink/10 p-5">
              <p className="text-sm text-thunder-storm">{label}</p>
              <p className="mt-2 text-3xl font-bold">{value}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {modules.map(({ icon: Icon, label }) => (
            <div key={label} className="border border-thunder-ink/10 p-6">
              <Icon className="text-thunder-ember" />
              <p className="mt-4 font-bold">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
