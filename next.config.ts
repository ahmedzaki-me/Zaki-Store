import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
/** @type {import('next').Config} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qpxgafmzblnjcztkwenf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/item-images/items/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        // كل الصفحات ماعدا static assets
        source: "/((?!_next/static|_next/image|favicon.ico).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
