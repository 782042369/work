'use strict';

const BaseController = require('./base');

class LoginController extends BaseController {
  async index() {
    const password = this.ctx.request.body.password
    const username = this.ctx.request.body.userName
    const code = this.ctx.request.body.code
    let msg = '';
    const data = await this.ctx.model.User.find({
      username,
      password
    });
    console.log('this.ctx.session.code: ', this.ctx.session.code);
    console.log('code: ', code);
    if (code === this.ctx.session.code) {
      if (data.length > 0) {
        msg = '登录成功'
      }
    } else {
      msg = '验证码错误'
    }

    this.ctx.body = {
      msg: msg,
      status: 0
    }
  }
}

module.exports = LoginController;
