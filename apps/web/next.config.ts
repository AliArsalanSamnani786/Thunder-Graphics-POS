import type { NextConfig } from "next";

function normalizeOrigin(value?: string) {
  if (!value) {
    return undefined;
  }

  try {
    return new URL(value.includes("://") ? value : `https://${value}`).origin;
  } catch {
    return undefined;
  }
}

const nextConfig: NextConfig = {
  typedRoutes: true,
  async rewrites() {
    const apiUrl = normalizeOrigin(process.env.API_URL || process.env.NEXT_PUBLIC_API_URL);
    const appUrl = normalizeOrigin(process.env.APP_URL);
    const vercelUrl = normalizeOrigin(process.env.VERCEL_URL);

    if (!apiUrl || apiUrl === appUrl || apiUrl === vercelUrl) {
      return [];
    }

    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiUrl}/api/v1/:path*`
      }
    ];
  }
};

export default nextConfig;
