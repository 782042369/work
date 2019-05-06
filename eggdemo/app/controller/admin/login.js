'use strict';

const BaseController = require('./base');

class LoginController extends BaseController {
  async index() {
    const password = this.ctx.request.body.password
    const username = this.ctx.request.body.userName
    const code = this.ctx.request.body.code
    let msg = '';
    let status = 0;
    if (code === this.ctx.session.code) {
      const data = await this.ctx.model.User.find({
        username,
        password
      });
      if (data.length > 0) {
        msg = '登录成功'
        status = 1
      } else {
        msg = '用户名或密码错误'
        status = 0
      }
    } else {
      msg = '验证码错误'
      status = 0
    }

    this.ctx.body = {
      msg: msg,
      status: status
    }
  }
}

module.exports = LoginController;
