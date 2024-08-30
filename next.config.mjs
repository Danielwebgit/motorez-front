/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: '(?<subdomain>[^.]+)?.localhost:3000',
            },
          ],
          destination: '/:path*',
        },
      ];
    },
  
    async headers() {
      return [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: '(?<subdomain>[^.]+)?.localhost:3000',
            },
          ],
          headers: [
            {
              key: 'x-subdomain',
              value: ':subdomain',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  