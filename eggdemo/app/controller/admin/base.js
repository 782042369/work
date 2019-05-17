'use strict';
const Controller = require('egg').Controller;

class BaseController extends Controller {
  /**
   *
   * @param {*} status 状态码
   * @param {*} message 提示信息
   * @param {*} data 数据
   */
  async success(status, message, data = []) {
    this.ctx.body = {
      status,
      data,
      message,
    };
  }
  /**
   *
   * @param {*} status 状态码
   * @param {*} message 提示信息
   * @param {*} data 数据
   */
  async error(status, message, data = []) {
    console.log('——————————————出错了——————————————');
    console.log('error', data);
    console.log('——————————————出错了——————————————');
    this.ctx.status = 200;
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
  async sortdata(res, name) {
    /**
     * 输出倒序 json
     */
    return res.sort((a, b) => b[name] - a[name]);
  }

}

module.exports = BaseController;
