module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
        crypto: require.resolve('crypto-browserify'),
        https: require.resolve('https-browserify'),
        http: require.resolve('stream-http'),
        tls: require.resolve('tls-browserify'),
        net: require.resolve('net-browserify'),
        querystring: require.resolve('querystring-es3'),
        fs: require.resolve('browserify-fs'),
      };
      return webpackConfig;
    },
  },
};
