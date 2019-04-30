'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    this.ctx.body = '后台用户管理'
  }
  async add() {
    this.ctx.body = '后台用户添加'
  }
  async delete() {
    this.ctx.body = '后台用户删除'
  }
  async edit() {
    this.ctx.body = '后台用户编辑'
  }
}

module.exports = UserController;
