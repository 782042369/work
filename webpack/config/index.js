const path = require('path')
const fs = require('fs')

const filePath = path.resolve(__dirname, '../src/page')
let entryPath = {}
fs.readdirSync(filePath).forEach((ele, index) => {
  entryPath[ele] = path.resolve(__dirname, `../src/page/${ele}/${ele}.js`)
})

module.exports = {
  port: 8080,
  entryPath: entryPath,
  assetsRoot: path.resolve(__dirname, '../dist'),
  pagePath: 'page',
  staticPath: 'static',
  isIe: true
}