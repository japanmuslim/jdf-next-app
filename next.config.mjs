/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'japan-dakwah-foundation.s3.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
