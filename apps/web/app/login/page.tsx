import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <form className="w-full max-w-md border border-thunder-ink/10 bg-white p-6 shadow-xl">
        <Link href="/" className="font-display text-2xl font-bold">Thunder POS</Link>
        <h1 className="mt-6 text-3xl font-bold">Login</h1>
        <label className="mt-6 grid gap-2 text-sm font-bold">
          Email
          <input className="border border-thunder-ink/20 px-4 py-3 font-normal" />
        </label>
        <label className="mt-4 grid gap-2 text-sm font-bold">
          Password
          <input type="password" className="border border-thunder-ink/20 px-4 py-3 font-normal" />
        </label>
        <button type="button" className="mt-6 w-full bg-thunder-ink px-4 py-4 font-bold text-white">Continue</button>
      </form>
    </main>
  );
}

