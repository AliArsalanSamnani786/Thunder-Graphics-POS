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
  transpilePackages: ["@thunder-pos/api"],
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    return config;
  }
};

export default nextConfig;
