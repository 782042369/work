'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha')

class ToolsService extends Service {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 6, // size of random string
      fontSize: 50, // size of random string
      width: 100,
      height: 40,
      background: '#fefefe' // background color of the svg images
    });
    this.ctx.session.code = captcha.text; // 验证码信息
    this.ctx.response.type = 'image/svg+xml'; // 指定返回类型
    this.ctx.body = captcha.data; // 返回验证码
  }
}

module.exports = ToolsService;
