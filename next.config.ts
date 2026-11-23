/** @type {import('next').NextConfig} */
// Enable static HTML export only when NEXT_EXPORT=true (keeps dev server behavior normal)
const nextConfig = {
  ...(process.env.NEXT_EXPORT === 'true'
    ? { output: 'export' }
    : { output: 'standalone' }),

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
      },
    ],
  },

  async redirects() {
    return [
      { source: "/services/ppc", destination: "/services/google-ads", permanent: true },
      { source: "/services/smm", destination: "/services/social-media", permanent: true },
      { source: "/services/content", destination: "/services/content-marketing", permanent: true },
    ];
  },
};

module.exports = nextConfig;