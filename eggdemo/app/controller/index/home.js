'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = {
      msg: '欢迎欢迎',
    };
  }
}

module.exports = HomeController;
