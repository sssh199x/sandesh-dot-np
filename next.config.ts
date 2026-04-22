import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.18.179", "192.168.86.16", "192.168.1.234", "192.168.40.135"],
  images: {
    qualities: [60, 65, 75],
  },
};

export default nextConfig;