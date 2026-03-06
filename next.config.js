/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Image optimisation ───────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },

  // ─── Compression ─────────────────────────────────────────────────────────
  compress: true,

  // ─── Power headers for performance, SEO & security ───────────────────────
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Security
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Performance / caching
          { key: "Vary", value: "Accept-Encoding" },
        ],
      },
      // Aggressive cache for static assets
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Cache for images
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      // No-cache for API routes
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
        ],
      },
    ]
  },

  // ─── Redirects ────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Keep legacy /pricing redirect in case anyone bookmarked it
      { source: "/pricing", destination: "/services", permanent: true },
    ]
  },

  // ─── Experimental ─────────────────────────────────────────────────────────
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "www.nolojia.com", "nolojia.com"],
    },
  },
}

module.exports = nextConfig
