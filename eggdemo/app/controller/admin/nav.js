'use strict';

const BaseController = require('./base');

class NavController extends BaseController {
  async index() {
    try {
      const result = await this.service.nav.find();
      this.success(1, '导航列表请求成功', result);
    } catch (error) {
      this.error(0, '导航列表请求失败', error);
    }
  }
  async addnav() {
    try {
      const result = await this.service.nav.addnav();
      if (result.length > 0) {
        this.error(0, '导航已经存在', result);
      } else {
        this.success(1, '增加导航成功', result);
      }
    } catch (error) {
      this.error(0, '增加导航失败', error);
    }
  }
  async editnav() {
    try {
      const result = await this.service.nav.edit();
      this.success(1, '修改导航成功', result);
    } catch (error) {
      this.error(0, '修改导航失败', error);
    }
  }
  async deletenav() {
    try {
      const result = await this.service.nav.delete();
      this.success(1, '删除导航成功', result);
    } catch (error) {
      this.error(0, '删除导航失败', error);
    }
  }
}

module.exports = NavController;
