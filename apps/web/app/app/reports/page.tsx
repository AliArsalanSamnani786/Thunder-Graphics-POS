import { BarChart3, Download, FileSpreadsheet, Filter, Printer } from "lucide-react";

const reports = [
  ["Sales Summary", "Daily revenue, returns, refunds, and payment mix"],
  ["Inventory Valuation", "Warehouse stock value, movement, batches, and expiry"],
  ["Customer Ledger", "Credit balances, loyalty, visits, and purchase history"],
  ["Tax Report", "Collected tax by branch, product class, and period"],
  ["Employee Activity", "Shift sales, overrides, refunds, and attendance"],
  ["Profit Report", "Margin, COGS, discount impact, and category profit"]
];

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-thunder-rain p-5 lg:p-8">
      <section className="mx-auto max-w-7xl bg-white p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-thunder-ember">Reporting center</p>
            <h1 className="font-display text-4xl font-bold">Exports, Insights, and Compliance</h1>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              ["Filter", Filter],
              ["Export", Download],
              ["Print", Printer]
            ].map(([label, Icon]) => (
              <button key={label as string} className="inline-flex h-11 items-center justify-center gap-2 bg-thunder-ink px-3 text-sm font-bold text-white">
                <Icon size={17} /> {label as string}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Today Sales", "$1,284", BarChart3],
            ["Gross Margin", "38.4%", FileSpreadsheet],
            ["Refund Rate", "1.2%", Download]
          ].map(([label, value, Icon]) => (
            <article key={label as string} className="border border-thunder-ink/10 p-5">
              <Icon className="text-thunder-ember" />
              <p className="mt-4 text-sm text-thunder-storm">{label as string}</p>
              <p className="mt-1 text-3xl font-bold">{value as string}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reports.map(([title, description]) => (
            <article key={title} className="border border-thunder-ink/10 p-5">
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-3 leading-7 text-thunder-storm">{description}</p>
              <button className="mt-5 h-11 bg-thunder-bolt px-4 font-bold text-thunder-ink">Open Report</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
