var rimraf = require('rimraf')
var webpackConfig = process.env.NODE_ENV === 'dev'
  ? require('./build/webpack.dev.conf.js')
  : require('./build/webpack.prod.conf.js')

if (process.env.NODE_ENV !== 'dev') {
  rimraf('./dist', function (err) {
    if (err) throw err
  })
}

module.exports = webpackConfig