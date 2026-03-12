import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',
  // images: {
  //   unoptimized: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "portfolio-media-**.s3.amazonaws.com",
        hostname: "**",
      }
    ]
  }
};

export default nextConfig;
