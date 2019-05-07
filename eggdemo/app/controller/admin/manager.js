/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 管理员
 * @Date: 2019-05-05 14:33:42
 * @LastEditTime: 2019-05-07 11:25:13
 */
'use strict';

const BaseController = require('./base');

class ManagerController extends BaseController {
  async index() {
    const result = await this.service.manager.find();
    this.ctx.body = result
  }
  async add() {
    await this.service.manager.addmanager();
    this.ctx.body = {
      status: 1,
      msg: '增加管理员成功'
    }
  }
  async edit() {
    await this.service.manager.edit();
    this.ctx.body = {
      status: 1,
      msg: '修改管理员成功'
    }
  }
  async delete() {
    await this.service.manager.delete();
    this.ctx.body = {
      status: 1,
      msg: '删除管理员成功'
    }
  }
}

module.exports = ManagerController;
