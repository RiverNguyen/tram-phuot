import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
    qualities: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  compress: true,
  experimental: {
    turbopackSourceMaps: false,
    serverSourceMaps: false,
    optimizePackageImports: ['sonner', 'nextjs-toploader'],
  },
  reactCompiler: true,
  // Optimize font loading
  optimizeFonts: true,
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
