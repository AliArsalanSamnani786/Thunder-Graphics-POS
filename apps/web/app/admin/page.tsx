const actions = ["Suspend Business", "Activate Business", "Extend Trial", "Change Plan", "Force Logout", "Support Mode"];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-white p-5 md:p-10">
      <h1 className="font-display text-4xl font-bold">Super Admin Dashboard</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {["Total Businesses", "Active", "Trial", "Expired"].map((label) => (
          <article key={label} className="border border-thunder-ink/10 p-5">
            <p className="text-sm text-thunder-storm">{label}</p>
            <strong className="mt-2 block text-3xl">0</strong>
          </article>
        ))}
      </div>
      <section className="mt-8 border border-thunder-ink/10 p-5">
        <h2 className="font-display text-3xl font-bold">Business Management</h2>
        <input className="mt-5 w-full border border-thunder-ink/20 px-4 py-3" placeholder="Search businesses by ID, name, email, or phone" />
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {actions.map((action) => (
            <button key={action} className="border border-thunder-ink/10 px-4 py-3 font-bold">{action}</button>
          ))}
        </div>
      </section>
    </main>
  );
}

