/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 14:33:42
 * @LastEditTime: 2019-05-15 14:23:21
 */
'use strict';

const BaseController = require('./base');

class RoleController extends BaseController {
  async index() {
    try {
      const result = await this.service.role.find();
      const data = await this.sortdata(result, 'add_time');
      this.success(1, '角色列表请求成功', data);
    } catch (error) {
      this.error(0, '角色列表请求失败', error);
    }
  }
  async add() {
    try {
      const result = await this.service.role.addrole();
      if (result.length > 0) {
        this.error(0, '角色已经存在', result);
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
  async auth() {
    try {
      const result = await this.service.role.addauth();
      this.success(1, '权限关联成功', result);
    } catch (error) {
      this.error(0, '权限关联失败', error);
    }
  }
  async authlist() {
    try {
      const result = await this.service.role.authlist();
      this.success(1, '查询关联权限成功', result);
    } catch (error) {
      this.error(0, '查询关联权限失败', error);
    }
  }
  async updateauth() {
    try {
      const result = await this.service.role.list();
      this.success(1, '更新关联权限成功', result);
    } catch (error) {
      this.error(0, '更新关联权限成功', error);
    }
  }
}

module.exports = RoleController;
