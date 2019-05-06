'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha')

class ToolsService extends Service {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4, // size of random string
      fontSize: 50, // size of random string
      width: 100,
      height: 40,
      background: '#fefefe' // background color of the svg images
    });
    this.ctx.session.code = captcha.text.toLowerCase(); // 验证码信息
    console.log('this.ctx.session.code: ', this.ctx.session.code);
    this.ctx.session.maxAge = 1000 * 60 * 10
    return captcha;
  }
}

module.exports = ToolsService;
