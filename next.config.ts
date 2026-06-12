import type { NextConfig } from "next";

// Base path is set by the GitHub Pages workflow (e.g. "/waba-grill").
// Empty locally so `next dev` serves from the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
  },
};

export default nextConfig;
