'use strict';
const Controller = require('egg').Controller;

class BaseController extends Controller {
  async code() {
    /**
     * 验证码
     */
    const captcha = await this.service.tools.captcha();
    this.ctx.response.type = 'image/svg+xml'; // 指定返回类型
    this.ctx.body = captcha.data; // 返回验证码
  }
}

module.exports = BaseController;
