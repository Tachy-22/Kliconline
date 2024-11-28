import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd11di5ixegvag7.cloudfront.net',
        pathname: '/uploads/**',
      },
    ],
  }
};

export default nextConfig;
