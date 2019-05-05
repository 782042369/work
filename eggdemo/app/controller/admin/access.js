/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 权限
 * @Date: 2019-05-05 14:33:42
 * @LastEditTime: 2019-05-05 14:37:53
 */
'use strict';

const Controller = require('egg').Controller;

class AccessController extends Controller {
  async index() {
    this.ctx.body = '权限列表'
  }
  async add() {
    this.ctx.body = '增加权限'
  }
  async edit() {
    this.ctx.body = '编辑权限'
  }
  async delete() {
    this.ctx.body = '删除权限'
  }
}

module.exports = AccessController;
