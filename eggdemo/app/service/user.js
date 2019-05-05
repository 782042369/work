'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async getUserList() {
    const {
      ctx
    } = this;
    const data = await ctx.model.User.find();
    return data;
  }
  async addUser() {
    const {
      ctx
    } = this;
    let user = new ctx.model.User({
      username: '杨宏旋',
      password: '123456'
    });
    let result = await user.save();
    return result;
  }
}

module.exports = UserService;
