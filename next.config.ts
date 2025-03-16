import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/uploads/:path*",
        headers: [
          {
            key: "Content-Type",
            value: "audio/mpeg",
          },
        ],
      },
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d11di5ixegvag7.cloudfront.net",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "d13tirqpsc6n7g.cloudfront.net",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
