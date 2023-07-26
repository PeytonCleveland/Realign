/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hwhemdldlrdjiwlrnbzw.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
