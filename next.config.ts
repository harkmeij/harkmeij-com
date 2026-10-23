import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'export',
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Next 16.4 refetches a prefetch that is answered by an HTTP redirect about
  // 1,000 times a second (vercel/next.js#100431, open). Netlify redirects could
  // trigger it, so keep the 16.3 behaviour.
  experimental: {
    optimisticRouting: false,
  },
};

export default nextConfig;
