export default function TrialExpiredPage() {
  const businessId = "TP-000001";
  const message = encodeURIComponent(`Hello Thunder POS,\nI would like to activate my subscription.\n\nBusiness ID: ${businessId}`);

  return (
    <main className="grid min-h-screen place-items-center px-5">
      <section className="max-w-xl border border-thunder-ink/10 bg-white p-8 text-center shadow-xl">
        <p className="font-mono text-sm text-thunder-ember">{businessId}</p>
        <h1 className="mt-4 font-display text-4xl font-bold">Your trial has expired.</h1>
        <p className="mt-4 text-thunder-storm">Please contact Thunder POS support on WhatsApp to activate your subscription.</p>
        <a className="mt-8 inline-flex bg-thunder-bolt px-6 py-4 font-bold text-thunder-ink" href={`https://wa.me/0000000000?text=${message}`}>
          Activate Subscription
        </a>
      </section>
    </main>
  );
}

