'use strict';

const BaseController = require('./base');

class LoginController extends BaseController {
  async index() {
    console.log(this.ctx.request.body);
    this.ctx.body = {
      data: 11111
    }
  }
}

module.exports = LoginController;
