'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    this.ctx.body = '后台登录'
  }
}

module.exports = LoginController;
