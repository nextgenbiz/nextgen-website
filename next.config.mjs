/** @type {import('next').NextConfig} */

const serviceSlugs = [
  "private-limited-company",
  "limited-liability-partnership",
  "one-person-company",
  "registered-partnership",
  "gst-certificate",
  "company-compliances",
  "startup-india-certificate",
  "udyam-certificate-msme",
  "import-export-code",
  "icegate-registration",
  "startup-india-seedfund",
  "rkvy-raftaar",
  "naiff",
  "pmegp",
  "cgtmse",
  "mudra-loan",
  "startup-seed-support",
  "project-finance",
  "venture-capital-funds",
];

// Same third-party allowances as the old site (Google, YouTube, Clarity, Pagesense).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https://www.google.com https://apis.google.com https://ssl.gstatic.com https://www.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com https://*.youtube.com https://*.google.com https://*.gstatic.com https://youtube.com https://*.doubleclick.net https://*.googleapis.com https://www.googleadservices.com https://tpc.googlesyndication.com https://www.youtube-nocookie.com https://www.clarity.ms https://scripts.clarity.ms https://cdn-in.pagesense.io",
  "script-src-elem 'self' 'unsafe-inline' blob: https://www.google.com https://apis.google.com https://ssl.gstatic.com https://www.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com https://*.youtube.com https://*.google.com https://*.gstatic.com https://youtube.com https://*.doubleclick.net https://*.googleapis.com https://www.googleadservices.com https://tpc.googlesyndication.com https://www.youtube-nocookie.com https://www.clarity.ms https://scripts.clarity.ms https://cdn-in.pagesense.io",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://*.youtube.com https://www.google.com",
  "media-src 'self' https://*.googlevideo.com https://*.youtube.com https://www.youtube-nocookie.com blob: data:",
  "connect-src 'self' https://www.google.com https://apis.google.com https://*.google.com https://*.googleapis.com https://*.youtube.com https://www.youtube.com https://www.clarity.ms https://*.clarity.ms https://www.googletagmanager.com https://www.google-analytics.com https://*.analytics.google.com https://cdn-in.pagesense.io https://*.zoho.in",
  "img-src 'self' data: blob: https:",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
].join("; ");

const nextConfig = {
  compress: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    remotePatterns: [{ protocol: "https", hostname: "img.youtube.com" }],
  },

  // Keep every URL the old site served working (SEO).
  async redirects() {
    return [
      ...serviceSlugs.map((slug) => ({
        source: `/inheritance/${slug}`,
        destination: `/service/${slug}`,
        permanent: true,
      })),
      { source: "/about/festival/:slug*", destination: "/about/events/:slug*", permanent: true },
    ];
  },

  async headers() {
    const immutable = { key: "Cache-Control", value: "public, max-age=31536000, immutable" };
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
      { source: "/fonts/(.*)", headers: [immutable] },
      { source: "/brand/(.*)", headers: [immutable] },
      { source: "/assets/(.*)", headers: [immutable] },
      { source: "/images/(.*)", headers: [immutable] },
    ];
  },
};

export default nextConfig;
