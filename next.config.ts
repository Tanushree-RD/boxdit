import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "a.ltrbxd.com",
      },
      {
        protocol: "https",
        hostname: "**.letterboxd.com",
      },
    ],
  },
  serverExternalPackages: [
    "puppeteer",
    "puppeteer-extra",
    "puppeteer-extra-plugin-stealth",
  ],
};

export default nextConfig;
