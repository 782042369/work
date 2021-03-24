/* eslint-disable class-methods-use-this */
/*
 * @Author: 杨宏旋
 * @Date: 2020-07-01 15:27:50
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-03-24 15:56:57
 * @Description:
 */
const string2fileStream = require('string-to-file-stream')
const fs = require('fs')
const path = require('path')

class ZipController {
  async index(ctx) {
    try {
      const data = await fs.readFileSync(path.join(__dirname, '1.zip'))
      ctx.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment;filename=1.zip',
      })
      // 返回文件流
      ctx.body = data
    } catch (error) {
      ctx.body = {
        message: `下载失败${error}`,
        code: 0,
      }
    }
  }
  // 定时添加报表
}

module.exports = new ZipController()
