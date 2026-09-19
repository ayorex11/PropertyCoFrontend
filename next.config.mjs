/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },

  images: {
    // next/image only loads remote images from hosts listed here.
    // Backblaze B2 public URLs look like:
    //   https://<bucket>.s3.<region>.backblazeb2.com/media/...
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.backblazeb2.com",
      },
      // Uncomment if you later serve media through a custom domain / CDN:
      // { protocol: "https", hostname: "media.yourdomain.com" },
    ],
  },

  async redirects() {
    return [
      {
        source: "/old-route",
        destination: "/new-route",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
