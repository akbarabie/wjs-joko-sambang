import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
      Izinkan next/image memuat foto dari CDN Sanity. Tanpa ini, foto yang
      diunggah admin cafe lewat panel Studio akan ditolak Next.js dengan
      alasan domain tidak dikenal.
    */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
