import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Povolení přísného režimu Reactu
  eslint: {
    ignoreDuringBuilds: true, // Ignorování ESLint chyb během buildu
  },
};

export default nextConfig;
