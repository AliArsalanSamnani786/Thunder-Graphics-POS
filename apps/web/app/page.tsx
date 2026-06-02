import { ArrowRight, BarChart3, Boxes, CreditCard, ShieldCheck, Store, Users } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: Store, title: "Touch POS", text: "Fast barcode, QR, split payments, holds, returns, refunds, and receipts." },
  { icon: Boxes, title: "Inventory Control", text: "Warehouses, variants, batches, serials, expiry, transfers, and stock audits." },
  { icon: CreditCard, title: "Accounting Ready", text: "Double-entry journals, ledgers, cash flow, profit and loss, and balance sheet." },
  { icon: Users, title: "Customer Growth", text: "Customer ledgers, loyalty, memberships, rewards, and purchase history." },
  { icon: ShieldCheck, title: "Tenant Security", text: "Workspace isolation, MFA, device verification, audit logs, and fraud detection." },
  { icon: BarChart3, title: "Business Insights", text: "Sales, profit, tax, inventory, employee reports, exports, and AI forecasting." }
];

const pricing = ["Starter", "Business", "Enterprise"];

export default function LandingPage() {
  return (
    <main>
      <section className="shell-grid min-h-screen px-5 py-6 md:px-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="font-display text-2xl font-bold">Thunder POS</Link>
          <div className="hidden items-center gap-6 text-sm font-semibold md:flex">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <Link href="/login">Login</Link>
          </div>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-10 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="mb-4 inline-flex w-fit rounded-full border border-thunder-ink/15 bg-white/70 px-4 py-2 text-sm font-bold">
              7 day free trial with full feature access
            </p>
            <h1 className="font-display text-5xl font-bold leading-tight md:text-7xl">
              Sell at the Speed of Thunder
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-thunder-storm">
              Manage sales, inventory, customers, employees, accounting, and business operations from a single secure platform.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="inline-flex items-center justify-center gap-2 bg-thunder-ink px-6 py-4 font-bold text-white">
                Start Free Trial <ArrowRight size={18} />
              </Link>
              <a href="#contact" className="inline-flex items-center justify-center border border-thunder-ink px-6 py-4 font-bold">
                Book Demo
              </a>
              <a href="https://wa.me/923152969396" className="inline-flex items-center justify-center bg-thunder-bolt px-6 py-4 font-bold">
                Contact on WhatsApp
              </a>
            </div>
          </div>

          <div className="min-h-[460px] border border-thunder-ink/15 bg-white/85 p-4 shadow-2xl">
            <div className="grid h-full grid-rows-[auto_1fr_auto] gap-4 bg-thunder-ink p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl">Live Checkout</span>
                <span className="bg-thunder-mint px-3 py-1 text-sm font-bold text-thunder-ink">Online</span>
              </div>
              <div className="grid gap-3">
                {["Barcode Scanner", "Customer Loyalty", "Split Payment", "Stock Sync"].map((item, index) => (
                  <div key={item} className="flex items-center justify-between border border-white/15 bg-white/10 p-4">
                    <span>{item}</span>
                    <span className="font-mono text-thunder-bolt">{(index + 1).toString().padStart(2, "0")}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white p-4 text-thunder-ink"><strong>$1,284</strong><span className="block text-xs">Sales</span></div>
                <div className="bg-white p-4 text-thunder-ink"><strong>98%</strong><span className="block text-xs">Stock OK</span></div>
                <div className="bg-thunder-bolt p-4 text-thunder-ink"><strong>0</strong><span className="block text-xs">Risk</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="px-5 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl font-bold">Built for multi-branch commerce</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="border border-thunder-ink/10 bg-white p-6">
                <feature.icon className="mb-5 text-thunder-ember" />
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-thunder-storm">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-thunder-ink px-5 py-16 text-white md:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {["Privacy-first tenant isolation", "Offline sales with background sync", "Super Admin controls with audit logs"].map((benefit) => (
            <div key={benefit} className="border border-white/15 p-6">
              <p className="font-display text-2xl font-bold">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="px-5 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl font-bold">Pricing</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {pricing.map((plan) => (
              <article key={plan} className="border border-thunder-ink/10 bg-white p-6">
                <h3 className="font-display text-3xl font-bold">{plan}</h3>
                <p className="mt-4 text-thunder-storm">Subscription activation through Thunder POS support.</p>
                <Link href="/register" className="mt-6 inline-flex bg-thunder-bolt px-5 py-3 font-bold text-thunder-ink">Start Free Trial</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-5 py-16 md:px-10">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-4xl font-bold">Frequently Asked Questions</h2>
          {["How long is the trial?", "What happens after expiry?", "Can multiple branches use one account?"].map((question) => (
            <details key={question} className="mt-4 border border-thunder-ink/10 bg-white p-5">
              <summary className="cursor-pointer font-bold">{question}</summary>
              <p className="mt-3 text-thunder-storm">Thunder POS is designed for secure, multi-tenant business workspaces with preserved data after trial expiry.</p>
            </details>
          ))}
        </div>
      </section>

      <footer id="contact" className="bg-thunder-storm px-5 py-10 text-white md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row">
          <p className="font-display text-2xl font-bold">Thunder POS</p>
          <p>Contact: support@thunderpos.local | WhatsApp: +0000000000</p>
        </div>
      </footer>
    </main>
  );
}
