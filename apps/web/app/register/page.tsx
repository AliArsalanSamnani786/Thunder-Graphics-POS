import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen px-5 py-10 md:px-10">
      <div className="mx-auto max-w-3xl border border-thunder-ink/10 bg-white p-6 shadow-xl">
        <Link href="/" className="font-bold text-thunder-ember">Thunder POS</Link>
        <h1 className="mt-6 font-display text-4xl font-bold">Start your 7 day free trial</h1>
        <p className="mt-3 text-thunder-storm">Full feature access with automatic workspace creation.</p>

        <form className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            "Business Name",
            "Owner Name",
            "Email Address",
            "Mobile Number",
            "WhatsApp Number",
            "Country"
          ].map((label) => (
            <label key={label} className="grid gap-2 text-sm font-bold">
              {label}
              <input className="border border-thunder-ink/20 px-4 py-3 font-normal" placeholder={label} />
            </label>
          ))}
          <label className="grid gap-2 text-sm font-bold md:col-span-2">
            Password
            <input type="password" className="border border-thunder-ink/20 px-4 py-3 font-normal" placeholder="Minimum 10 characters" />
          </label>
          <label className="flex gap-3 text-sm md:col-span-2">
            <input type="checkbox" />
            I accept the Terms and Privacy Policy.
          </label>
          <div className="md:col-span-2 border border-thunder-ink/10 bg-thunder-rain p-4 text-sm">
            Thunder POS requests your location for security verification, fraud prevention, duplicate trial detection, and account protection.
          </div>
          <button className="bg-thunder-ink px-6 py-4 font-bold text-white md:col-span-2" type="button">
            Create Trial Workspace
          </button>
        </form>
      </div>
    </main>
  );
}

