/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Empty turbopack config to enable Turbopack and silence warnings
  turbopack: {},
  // Keep webpack config for fallback compatibility
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding'); // Rainbowkit polyfills

    return config;
  },
};

export default nextConfig;
