const webpack = require('webpack');
/**
 * Extend the default Webpack configuration from nx / ng.
 */
module.exports = (config) => {
  // Install additional plugins
  config.plugins = config.plugins || [];
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.ENV': JSON.stringify(process.env.ENV),
    })
  );

  return config;
};
