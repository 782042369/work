const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let configHtmlPlugins = []
for (let page in config.entryPath) {
  const template = path.resolve(__dirname, `../src/page/${page}/${page}.plan.js`)
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: `${config.pagePath}/${page}.html`,
    template: template,
    chunks: [page, 'vendor','jq'],
    minify: { //压缩HTML文件
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: true, //删除空白符与换行符
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
    chunksSortMode:'dependency'
  })
  configHtmlPlugins.push(htmlPlugin)
}
let jsLoaderOptions
if(config.isIe){
  jsLoaderOptions = {
    test: /\.js$/,
    loader: 'es3ify-loader!babel-loader',
    enforce: 'post',
    include: [resolve('src')]
  }
}else{
  jsLoaderOptions = {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('src')]
  }
}
module.exports = {
  entry: config.entryPath,
  output: {
    path: config.assetsRoot,
    filename: `js/[name].[chunkhash:7].js`,
    publicPath: '../' // 打包开启
  },
  resolve: {
    extensions: ['.js', '.hbs', '.json'],
    alias: {
      '@': resolve('src'),
      'part': resolve('src/part'),
      'common': resolve('src/common'),
      'page': resolve('src/page')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
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
            }
          ]
        }),
        exclude: /node_modules/
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?$!expose-loader?jQuery'
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        include: [resolve('src')],
        query: {
          helperDirs: path.resolve(__dirname, '../src/helpers'),
          rootRelative: './',
          inlineRequires: /^((?!http|https).)*(images|media)((?!http|https).)*$/,
          exclude: '/node_modules/'
        }
      },
      jsLoaderOptions,
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: `img/[name].[hash:7].[ext]`
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: `media/[name].[hash:7].[ext]`
        }
      }, 
      {
        test: /\.(docx|ppt|xlsx|pdf|txt)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: `file/[name].[hash:7].[ext]`
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: `fonts/[name].[hash:7].[ext]`
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: 'vendor',
      minChunks: 2
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    ...configHtmlPlugins
  ]
}