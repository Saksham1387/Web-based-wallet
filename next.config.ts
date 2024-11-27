import type { NextConfig } from "next";
import { nodePolyfills } from "vite-plugin-node-polyfills";

const nextConfig: NextConfig = {
  /* config options here */
  plugins: [nodePolyfills()],
};

export default nextConfig;
