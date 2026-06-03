import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  outputFileTracingRoot: new URL("../..", import.meta.url).pathname,
  async rewrites() {
    const api_url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    return [
      {
        source: "/api/v1/:path*",
        destination: `${api_url}/api/v1/:path*`
      }
    ];
  }
};

export default nextConfig;
