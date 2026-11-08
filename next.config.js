/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com', 'avatar.iran.liara.run'],
    unoptimized: true
  }
};

module.exports = nextConfig;
