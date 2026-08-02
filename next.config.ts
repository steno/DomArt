import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Static export has no Image Optimization API — serve pre-encoded WebP as-is.
  // Responsive bytes are handled via manual srcset on critical assets (see SiteImage).
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
