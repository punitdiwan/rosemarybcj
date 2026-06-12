module.exports = {
  reactStrictMode: true,

  // Compress responses to reduce bandwidth and improve TTFB
  compress: true,

  // Serve images from external domain (your CMS API)
  images: {
    domains: [
      process.env.NEXT_PUBLIC_BASE_URL
        ? new URL(process.env.NEXT_PUBLIC_BASE_URL).hostname
        : '',
    ].filter(Boolean),
    // Cache optimized images for 24 hours on Vercel CDN
    minimumCacheTTL: 86400,
  },

  // Cache static assets aggressively
  async headers() {
    return [
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|svg|webp|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=3600',
          },
        ],
      },
    ]
  },
}
