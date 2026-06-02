import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  outputFileTracingRoot: new URL("../..", import.meta.url).pathname
};

export default nextConfig;
