/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 14:33:42
 * @LastEditTime: 2019-05-06 20:37:16
 */
'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {
  async index() {
    const result = await this.service.role.find();
    this.ctx.body = result
  }
  async add() {
    await this.service.role.addrole();
    this.ctx.body = {
      status: 1,
      msg: '增加角色成功'
    }
  }
  async edit() {
    await this.service.role.edit();
    this.ctx.body = {
      status: 1,
      msg: '修改角色成功'
    }
  }
  async delete() {
    await this.service.role.delete();
    this.ctx.body = {
      status: 1,
      msg: '删除角色成功'
    }
  }
}

module.exports = RoleController;
