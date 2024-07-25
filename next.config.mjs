/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
         {
            source: '/',
            destination: 'https://nouns.build/dao/base/0x8de71d80eE2C4700bC9D4F8031a2504Ca93f7088',
            permanent: true,
          },
          {
            source: '/:path*',
            destination: 'https://nouns.build/dao/base/0x8de71d80eE2C4700bC9D4F8031a2504Ca93f7088',
            permanent: true,
          },
        ]
    },
};

export default nextConfig;
