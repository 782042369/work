/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 14:33:42
 * @LastEditTime: 2019-05-05 17:18:08
 */
'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
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
