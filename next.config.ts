import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the dev-mode indicator badge ("N" button) — it's not part of the
  // app UI and only ever shows up locally, but it gets in the way while
  // testing the chat layout.
  devIndicators: false,
};

export default nextConfig;
