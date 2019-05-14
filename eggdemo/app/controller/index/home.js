'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    console.log(1);
    this.ctx.body = {
      msg: '欢迎欢迎'
    };
  }
}

module.exports = HomeController;
