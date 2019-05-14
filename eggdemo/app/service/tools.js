'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
const path = require('path')
const mkdirp = require('mkdirp');
const sd = require('silly-datetime');
class ToolsService extends Service {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4, // size of random string
      fontSize: 50, // size of random string
      width: 100,
      height: 40,
      background: '#cc9966', // background color of the svg images
    });
    this.ctx.session.code = captcha.text.toLowerCase(); // 验证码信息
    this.ctx.session.maxAge = 60000;
    return captcha;
  }
  // 数组扁平化
  async steamroller(arr) {
    while (arr.some(item => Array.isArray(item))) {
      arr = [].concat(...arr)
    }
    return arr
  }
  // 数组扁平化
  async getuploadfile(filename) {
    try {
      let day = sd.format(new Date(), 'YYYYMMDD');
      let dir = path.join(this.config.uploadfile, day);
      await mkdirp(dir);
      const uploadDir = path.join(dir, new Date().getTime() + path.extname(filename))
      return {
        uploadDir: uploadDir,
        saveDir: uploadDir.slice(3).replace(/\\/g, '/')
      }
    } catch (error) {
      return error
    }
  }
}

module.exports = ToolsService;
