/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for production builds
  productionBrowserSourceMaps: false,
  
  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false,
  },
  
  // Compression and performance
  compress: true,
  
  // Headers for security
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ]
  },
  
  // Redirects for common paths
  redirects: async () => {
    return []
  },
}

export default nextConfig
