import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const monorepoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const nextConfig: NextConfig = {
  typedRoutes: true,
  outputFileTracingRoot: monorepoRoot,
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    return config;
  }
};

export default nextConfig;
