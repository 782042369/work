'use strict';
const Controller = require('egg').Controller;

class BaseController extends Controller {
  async code() {
    await this.service.tools.captcha();
  }
}

module.exports = BaseController;
