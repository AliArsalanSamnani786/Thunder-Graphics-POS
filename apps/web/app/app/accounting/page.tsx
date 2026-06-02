import { BookOpenCheck, Landmark, ListChecks, Scale } from "lucide-react";

const ledgerRows = [
  ["1000", "Cash", "$18,420", "$0"],
  ["1200", "Inventory", "$42,900", "$0"],
  ["4000", "Sales Revenue", "$0", "$64,280"],
  ["5000", "Cost of Goods Sold", "$31,100", "$0"]
];

export default function AccountingPage() {
  return (
    <main className="min-h-screen bg-thunder-rain p-5 lg:p-8">
      <section className="mx-auto max-w-7xl bg-white p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-thunder-ember">Double-entry accounting</p>
            <h1 className="font-display text-4xl font-bold">Ledger and Financial Controls</h1>
          </div>
          <button className="inline-flex h-11 items-center justify-center gap-2 bg-thunder-bolt px-4 font-bold text-thunder-ink">
            <BookOpenCheck size={18} /> New Journal
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            ["Trial Balance", "Balanced", Scale],
            ["Cash Position", "$18,420", Landmark],
            ["Open Journals", "4", BookOpenCheck],
            ["Month Close Tasks", "9", ListChecks]
          ].map(([label, value, Icon]) => (
            <article key={label as string} className="border border-thunder-ink/10 p-5">
              <Icon className="text-thunder-ember" />
              <p className="mt-4 text-sm text-thunder-storm">{label as string}</p>
              <p className="mt-1 text-3xl font-bold">{value as string}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className="overflow-x-auto border border-thunder-ink/10">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead className="bg-thunder-ink text-white">
                <tr>
                  {["Code", "Account", "Debit", "Credit"].map((heading) => (
                    <th key={heading} className="p-4 text-sm">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ledgerRows.map((row) => (
                  <tr key={row[0]} className="border-t border-thunder-ink/10">
                    {row.map((cell) => (
                      <td key={cell} className="p-4">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <aside className="bg-thunder-ink p-5 text-white">
            <h2 className="font-display text-2xl font-bold">Financial Statements</h2>
            <div className="mt-5 grid gap-3">
              {["Profit and Loss", "Balance Sheet", "Cash Flow", "General Ledger"].map((report) => (
                <button key={report} className="h-12 bg-white text-sm font-bold text-thunder-ink">{report}</button>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
