/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Image optimisation ───────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // No remote hosts. Every image the site renders is local, and R2 objects
    // are private — they are streamed through an authenticated route, never
    // fetched by the image optimiser.
    remotePatterns: [],
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

  // ─── Rewrites ─────────────────────────────────────────────────────────────
  // Next.js App Router cannot express a dynamic parameter that shares a path
  // segment with static text (`/hire-virtual-assistant-for-[industry]` is read
  // as a literal folder name, not a route). The pages therefore live at
  // /hire-virtual-assistant-for/[industry] and these rewrites keep the
  // hyphenated URLs — the ones in the sitemap and canonical tags — working.
  async rewrites() {
    return [
      {
        source: "/hire-virtual-assistant-for-:industry",
        destination: "/hire-virtual-assistant-for/:industry",
      },
      {
        source: "/virtual-assistant-services-:country",
        destination: "/virtual-assistant-services/:country",
      },
    ]
  },

  // ─── Redirects ────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Keep legacy /pricing redirect in case anyone bookmarked it
      { source: "/pricing", destination: "/services", permanent: true },
      // Renamed as part of the AI-first restructure — keep the old links alive.
      { source: "/success-stories", destination: "/case-studies", permanent: true },
    ]
  },

  // ─── Webpack ──────────────────────────────────────────────────────────────
  webpack: (config, { isServer }) => {
    if (isServer) {
      // instrumentation.ts imports `wrangler` to get local D1/R2 bindings in
      // dev. The import is dynamic and guarded by NODE_ENV, but webpack still
      // resolves it at build time and fails on wrangler's wasm dependencies.
      // Externalising leaves it as a runtime require: loaded in `next dev`,
      // never reached in production because the guard short-circuits first.
      config.externals = [...(config.externals || []), "wrangler"]
    }
    return config
  },

  // ─── Experimental ─────────────────────────────────────────────────────────
  // One block only. A second `experimental` key here is not merged — the later
  // literal silently replaces the earlier one, and whatever was in the first
  // is lost without a warning.
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "www.nolojia.com", "nolojia.com"],
    },

    // Enables instrumentation.ts, which supplies D1 and R2 bindings in
    // `next dev` so the admin console is runnable locally. The hook compiles
    // to a no-op in a production build.
    instrumentationHook: true,
  },
}

module.exports = nextConfig
