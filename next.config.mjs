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
  // Excluir páginas de debug/test del build de producción
  async redirects() {
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/admin-debug',
          destination: '/404',
          permanent: false,
        },
        {
          source: '/debug-:path*',
          destination: '/404',
          permanent: false,
        },
        {
          source: '/test-:path*',
          destination: '/404',
          permanent: false,
        },
        {
          source: '/create-:path*-debug',
          destination: '/404',
          permanent: false,
        },
        {
          source: '/env-test',
          destination: '/404',
          permanent: false,
        },
      ];
    }
    return [];
  },
}

export default nextConfig
