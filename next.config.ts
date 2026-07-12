import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mohosin5003.binarybards.online',
      },
      {
        protocol: 'http',
        hostname: '92.205.234.176',
        port: '5000',
      },
      {
        protocol: 'http',
        hostname: '10.10.26.173',
        port: '5000',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
      },
    ],
  },
};

export default nextConfig;
