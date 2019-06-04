const {
  override,
  fixBabelImports,
} = require('customize-cra');
const {
  BundleAnalyzerPlugin
} = require("webpack-bundle-analyzer");
const addCustomize = () => config => {
  if (process.env.NODE_ENV === 'production') {
    config.devtool = false; //去掉map文件
    if (config.plugins) {
      config.plugins.push(
        new BundleAnalyzerPlugin()
      );
    }
    const splitChunksConfig = config.optimization.splitChunks;
    Object.assign(splitChunksConfig, {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          priority: -10,
        },
        common: {
          name: 'common',
          minChunks: 2,
          minSize: 30000,
          chunks: 'all'
        }
      }
    })
  }
  return config;
}
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addCustomize()
);
