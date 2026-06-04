"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

interface RegistrationFormData {
  businessName: string;
  ownerName: string;
  email: string;
  mobileNumber: string;
  whatsappNumber: string;
  country: string;
  password: string;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
}

const initialFormData: RegistrationFormData = {
  businessName: "",
  ownerName: "",
  email: "",
  mobileNumber: "",
  whatsappNumber: "",
  country: "",
  password: "",
  acceptedTerms: false,
  acceptedPrivacy: false
};

function getRegistrationError(payload: unknown, status: number) {
  if (
    payload &&
    typeof payload === "object" &&
    "message" in payload
  ) {
    const message = (payload as { message?: unknown }).message;

    if (Array.isArray(message)) {
      return message.join(" ");
    }

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  if (payload && typeof payload === "object" && "error" in payload) {
    const error = (payload as { error?: unknown }).error;

    if (typeof error === "string" && error.trim()) {
      return error;
    }
  }

  return `Registration failed with HTTP ${status}. Check API_URL and Vercel Function Logs.`;
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful! Redirecting to login...");
        router.push("/login");
      } else {
        const errorData = await response.json().catch(() => null);
        setErrorMessage(getRegistrationError(errorData, response.status));
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
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
            <input name="businessName" className="border border-thunder-ink/20 px-4 py-3 font-normal" value={formData.businessName} onChange={(e) => setFormData({...formData, businessName: e.target.value})} required />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Owner Name
            <input name="ownerName" className="border border-thunder-ink/20 px-4 py-3 font-normal" value={formData.ownerName} onChange={(e) => setFormData({...formData, ownerName: e.target.value})} required />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Email Address
            <input name="email" type="email" autoComplete="email" className="border border-thunder-ink/20 px-4 py-3 font-normal" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Mobile Number
            <input name="mobileNumber" autoComplete="tel" className="border border-thunder-ink/20 px-4 py-3 font-normal" value={formData.mobileNumber} onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})} required />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            WhatsApp Number
            <input name="whatsappNumber" autoComplete="tel" className="border border-thunder-ink/20 px-4 py-3 font-normal" value={formData.whatsappNumber} onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})} required />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Country
            <input name="country" autoComplete="country-name" className="border border-thunder-ink/20 px-4 py-3 font-normal" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} required />
          </label>
          <label className="grid gap-2 text-sm font-bold md:col-span-2">
            Password
            <input name="password" type="password" autoComplete="new-password" minLength={10} maxLength={128} className="border border-thunder-ink/20 px-4 py-3 font-normal" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          </label>
          <label className="flex gap-3 text-sm font-bold md:col-span-2">
            <input
              name="acceptedTerms"
              type="checkbox"
              className="mt-1 size-4 shrink-0"
              checked={formData.acceptedTerms}
              onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
              required
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="text-thunder-ember underline">
                Terms
              </Link>
              .
            </span>
          </label>
          <label className="flex gap-3 text-sm font-bold md:col-span-2">
            <input
              name="acceptedPrivacy"
              type="checkbox"
              className="mt-1 size-4 shrink-0"
              checked={formData.acceptedPrivacy}
              onChange={(e) => setFormData({ ...formData, acceptedPrivacy: e.target.checked })}
              required
            />
            <span>
              I agree to the{" "}
              <Link href="/privacy" className="text-thunder-ember underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errorMessage ? (
            <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 md:col-span-2">
              {errorMessage}
            </p>
          ) : null}
          <button className="bg-thunder-ink px-6 py-4 font-bold text-white md:col-span-2 disabled:opacity-50" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Trial Workspace"}
          </button>
        </form>
      </div>
    </main>
  );
}
