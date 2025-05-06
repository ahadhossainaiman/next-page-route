/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@ant-design',
    '@ant-design/icons',
    'rc-util',
    'rc-picker',
    'rc-pagination',
    'rc-tree',
    'rc-table',
    'rc-input',
  ],
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
