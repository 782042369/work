/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 14:33:42
 * @LastEditTime: 2019-05-06 10:00:54
 */
'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {
  async index() {
    this.ctx.body = {
      data: '111'
    }
  }
  async add() {
    this.ctx.body = '增加角色'
  }
  async edit() {
    this.ctx.body = '编辑角色'
  }
  async delete() {
    this.ctx.body = '删除角色'
  }
}

module.exports = RoleController;
