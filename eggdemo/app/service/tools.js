'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

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
}

module.exports = ToolsService;
