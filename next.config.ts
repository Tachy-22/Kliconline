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
        hostname: "klicbucket.s3.us-east-1.amazonaws.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/detyrovtq/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
