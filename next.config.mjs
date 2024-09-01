const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  reactStrictMode: true,

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
