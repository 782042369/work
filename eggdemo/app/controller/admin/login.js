'use strict';

const BaseController = require('./base');

class LoginController extends BaseController {
  async index() {
    let datarr = {}
    const code = this.ctx.request.body.code
    if (code === this.ctx.session.code) {
      const result = await this.service.user.finduser();
      console.log('result: ', result);
      if (result.length > 0) {
        this.ctx.session.userinfo = result[0].userName
        console.log('this.ctx.session.userinfo: ', this.ctx.session.userinfo);
        datarr = {
          username: result[0].userName,
          msg: '登录成功',
          status: 1
        }
      } else {
        datarr = {
          msg: '用户名或密码错误',
          status: 0
        }
      }
    } else {
      datarr = {
        msg: '验证码错误',
        status: 0
      }
    }
    this.ctx.body = datarr
  }
  async loginout() {
    this.ctx.session.userinfo = null;
    this.ctx.body = {
      username: result.username,
      msg: '登录成功',
      status: 1
    }
  }
}

module.exports = LoginController;
