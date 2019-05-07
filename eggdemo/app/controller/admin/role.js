/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 14:33:42
 * @LastEditTime: 2019-05-07 13:22:41
 */
'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {
  async index() {
    try {
      const result = await this.service.role.find();
      this.success(1, '角色列表请求成功', result);
    } catch (error) {
      this.error(0, '角色列表请求失败', error);
    }
  }
  async add() {
    try {
      const result = await this.service.role.addrole();
      if (result.length > 0) {
        this.success(0, '角色已经存在', result);

      } else {
        this.success(1, '增加角色成功', result);
      }
    } catch (error) {
      this.error(0, '增加角色失败', error);
    }
  }
  async edit() {
    try {
      const result = await this.service.role.edit();
      this.success(1, '修改角色成功', result);
    } catch (error) {
      this.error(0, '修改角色失败', error);
    }
  }
  async delete() {
    try {
      const result = await this.service.role.delete();
      this.success(1, '删除角色成功', result);
    } catch (error) {
      this.error(0, '删除角色失败', error);
    }
  }
}

module.exports = RoleController;
