import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mohosin5003.binarybards.online',
      },
    ],
  },
};

export default nextConfig;
