import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thunder POS",
  description: "Sell at the Speed of Thunder with secure multi-tenant POS, inventory, accounting, and reporting."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

