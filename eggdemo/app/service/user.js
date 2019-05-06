'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async finduser() {
    const password = this.ctx.request.body.password
    const username = this.ctx.request.body.userName
    const result = await this.ctx.model.User.find({
      username,
      password
    });
    return result;
  }
}

module.exports = UserService;
