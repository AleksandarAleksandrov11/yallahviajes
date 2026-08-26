import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2200],
    imageSizes: [96, 160, 240, 320, 420],
  },
  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig
