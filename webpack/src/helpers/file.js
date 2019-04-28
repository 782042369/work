/* eslint-disable */
let file = {
  js: {
    flexible: require('!file-loader?name=static/js/[name].[ext]!../common/js/flexible.js'),
    // layui: require('!file-loader?name=static/js/[name].[ext]!../common/js/zwcomponent/layui.all.js')
  },
  css: {
    // layui: require('!file-loader?name=css/[name].[ext]!../common/js/src/css/layui.css')
  },
}

module.exports = function (e) {
  let out = file
  e = e.split(".")
  for (let i in e){
    out = out[e[i]]
  }
  return out
}