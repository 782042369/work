'use strict';

const BaseController = require('./base');

class LoginController extends BaseController {
  async index() {
    try {
      const code = this.ctx.request.body.code;
      if (code === this.ctx.session.code) {
        const result = await this.service.user.finduser();
        if (result.length > 0) {
          this.ctx.session.userinfo = result[0].userName;
          this.success(1, '登录成功', {
            userName: result[0].userName
          });
        } else {
          this.error(0, '用户名或密码错误', result);
        }
      } else {
        this.error(0, '验证码错误');
      }
    } catch (error) {
      this.error(0, '登录操作错误', error);

    }
  }
  async loginout() {
    try {
      this.ctx.session.userinfo = null;
      this.success(1, '退出成功');
    } catch (error) {
      this.error(0, '退出操作失败', error);
    }
  }
}

module.exports = LoginController;
