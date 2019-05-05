'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const {
      ctx,
      service
    } = this;
    const data = await service.user.getUserList();
    ctx.body = {
      data: data
    };
  }
  async adduser() {
    const {
      ctx,
      service
    } = this;
    const data = await service.user.addUser();
    ctx.body = {
      data: data
    };
  }
}

module.exports = UserController;
