import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set the tracing root to the project directory
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
