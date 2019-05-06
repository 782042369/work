/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 管理员
 * @Date: 2019-05-05 14:33:42
 * @LastEditTime: 2019-05-06 10:00:32
 */
'use strict';

const BaseController = require('./base');

class ManagerController extends BaseController {
  async index() {
    this.ctx.body = '管理员列表'
  }
  async add() {
    this.ctx.body = '增加管理员'
  }
  async edit() {
    this.ctx.body = '编辑管理员'
  }
  async delete() {
    this.ctx.body = '删除管理员'
  }
}

module.exports = ManagerController;
