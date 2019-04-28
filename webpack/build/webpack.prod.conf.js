const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseWebpackConfig = require('./webpack.build')
const config = require('../config')
const CompressionPlugin = require('compression-webpack-plugin');
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let UglifyJsPluginOptions = {
  parallel: 4,
  uglifyOptions: {
      output: {
          comments: false,
          beautify: false,
      },
      compress: {
          warnings: false
      },
  },
  cache: true
}
if(config.isIe){
  UglifyJsPluginOptions = merge(UglifyJsPluginOptions, {
    compress: {
      properties: false,
      screw_ie8: false
    },
    output: {
      quote_keys: true,
      screw_ie8: false
    },
    mangle: {
      screw_ie8: false
    },
    support_ie8: true
  })
}
module.exports = merge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            'postcss-loader'
          ]
        }),
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true //css压缩
              }
            },
            'postcss-loader','sass-loader'
          ]
        }),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CompressionPlugin({ //开启gizp压缩
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new BundleAnalyzerPlugin(),
    new webpack.optimize.UglifyJsPlugin(UglifyJsPluginOptions) // 打包开启
  ]
})