'use strict';
const Controller = require('egg').Controller;

class BaseController extends Controller {
  /**
   * 
   * @param {*} status 
   * @param {*} message 
   * @param {*} data 
   */
  async success(status, message, data = []) {
    // this.ctx.body='成功';
    this.ctx.body = {
      status,
      data,
      message,
    };
  }
  /**
   * 
   * @param {*} status 
   * @param {*} message 
   * @param {*} data 
   */
  async error(status, message, data = []) {
    // this.ctx.body='成功';
    this.ctx.status = 200
    this.ctx.body = ({
      status,
      data,
      message,
    });
  }
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
