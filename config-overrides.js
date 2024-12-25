module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    querystring: require.resolve('querystring-es3'),
    crypto: require.resolve('crypto-browserify'),
    https: require.resolve('https-browserify'),
    http: require.resolve('stream-http'),
    tls: require.resolve('tls-browserify'),
    net: require.resolve('net-browserify'),
  };
  return config;
};
