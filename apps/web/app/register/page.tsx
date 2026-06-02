"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    mobileNumber: "",
    whatsappNumber: "",
    country: "",
    password: "",
    acceptedTerms: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/v1/auth/register-business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful! Redirecting to login...");
        router.push("/login");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-5 py-10 md:px-10">
      <div className="mx-auto max-w-3xl border border-thunder-ink/10 bg-white p-6 shadow-xl">
        <Link href="/" className="font-bold text-thunder-ember">Thunder POS</Link>
        <h1 className="mt-6 font-display text-4xl font-bold">Start your 7 day free trial</h1>
        <p className="mt-3 text-thunder-storm">Full feature access with automatic workspace creation.</p>

        <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-bold">
            Business Name
            <input name="businessName" className="border border-thunder-ink/20 px-4 py-3 font-normal" onChange={(e) => setFormData({...formData, businessName: e.target.value})} required />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Owner Name
            <input name="ownerName" className="border border-thunder-ink/20 px-4 py-3 font-normal" onChange={(e) => setFormData({...formData, ownerName: e.target.value})} required />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Email Address
            <input name="email" type="email" className="border border-thunder-ink/20 px-4 py-3 font-normal" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Mobile Number
            <input name="mobileNumber" className="border border-thunder-ink/20 px-4 py-3 font-normal" onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})} required />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            WhatsApp Number
            <input name="whatsappNumber" className="border border-thunder-ink/20 px-4 py-3 font-normal" onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})} required />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Country
            <input name="country" className="border border-thunder-ink/20 px-4 py-3 font-normal" onChange={(e) => setFormData({...formData, country: e.target.value})} required />
          </label>
          <label className="grid gap-2 text-sm font-bold md:col-span-2">
            Password
            <input name="password" type="password" className="border border-thunder-ink/20 px-4 py-3 font-normal" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          </label>
          <label className="flex gap-3 text-sm md:col-span-2">
            <input type="checkbox" onChange={(e) => setFormData({...formData, acceptedTerms: e.target.checked})} required />
            I accept the Terms and Privacy Policy.
          </label>
          <button className="bg-thunder-ink px-6 py-4 font-bold text-white md:col-span-2 disabled:opacity-50" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Trial Workspace"}
          </button>
        </form>
      </div>
    </main>
  );
}

