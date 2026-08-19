import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyjson.com",
        pathname: "/icon/**",
      },
    ],
  },
};

export default nextConfig;
