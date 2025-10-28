/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: [
      'api.idxbroker.com',
      'images.idxbroker.com',
      'photos.idxbroker.com',
      'media.idxbroker.com',
      'cdn.idxbroker.com',
      'patronrealestateservices.idxbroker.com',
      'patronrealestateservices.com',
      'images.unsplash.com',
      'api-trestle.corelogic.com',
      'trestle.corelogic.com'
    ],
  },
}

export default nextConfig
