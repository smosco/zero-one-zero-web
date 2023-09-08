const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    const { dev, isServer } = options;
    if (dev && !isServer)
      config.plugins.push(new ForkTsCheckerWebpackPlugin({ devServer: dev }));
    return config;
  },
};

module.exports = nextConfig;
