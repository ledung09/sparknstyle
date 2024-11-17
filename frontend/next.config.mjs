/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fatjqzsihhfgokzxxsco.supabase.co",
      },
    ],
  },
};

export default nextConfig;
