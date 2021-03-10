/*
 * @Author: 杨宏旋
 * @Date: 2021-03-08 17:54:51
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-03-08 17:55:00
 * @Description:
 */
const path = require('path')

module.exports = {
  mode: 'development', // 可以设置为 production
  // 执行的入口文件
  entry: './src/index.js',
  output: {
    // 输出的文件名
    filename: 'bundle.js',
    // 输出文件都放在 dist
    path: path.resolve(__dirname, './dist'),
  },
  // 为了更加方便查看输出
  devtool: 'cheap-source-map',
}
