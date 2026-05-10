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
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
