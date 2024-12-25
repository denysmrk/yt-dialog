import { webpack } from 'next/dist/compiled/webpack/webpack';
/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // Optional: Add a trailing slash to all paths `/about` -> `/about/`
  // trailingSlash: true,
  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          querystring: require.resolve('querystring-es3'),
          crypto: require.resolve('crypto-browserify'),
          https: require.resolve('https-browserify'),
          http: require.resolve('stream-http'),
          tls: require.resolve('tls-browserify'),
          net: require.resolve('net-browserify'),
        },
      };
    }
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      }),
    );

    return config;
  },
  experimental: { appDir: true },
};

export default nextConfig;
