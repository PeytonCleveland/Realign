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
      {
        protocol: "https",
        hostname: "drjttjvfswrhgzhtkbrh.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
