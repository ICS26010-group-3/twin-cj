import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
      },
      {
        hostname: "*"
      }
    ], // Allow images from localhost
  },
  async rewrites() {
    return [
      // rewrites all api request to your express server
      {
        source: "/api1/v1/:path*",
        destination: "http://localhost:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;
