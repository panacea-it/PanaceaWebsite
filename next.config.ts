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
};

module.exports = nextConfig;