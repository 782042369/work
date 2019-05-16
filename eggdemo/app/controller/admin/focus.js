'use strict';

const BaseController = require('./base');

class FocusController extends BaseController {
  async bannerlist() {
    try {
      const result = await this.service.focus.find();
      this.success(1, '图片列表读取成功', result);
    } catch (error) {
      this.error(0, '图片列表读取失败', error);
    }
  }
  async addbanner() {
    try {
      const result = await this.service.focus.addbanner();
      this.success(1, '增加banner成功', result);
    } catch (error) {
      this.error(0, '增加banner失败', error);
    }
  }
  async editbanner() {
    try {
      const result = await this.service.focus.editbanner();
      this.success(1, '修改banner成功', result);
    } catch (error) {
      this.error(0, '修改banner失败', error);
    }
  }

  async deletebanner() {
    try {
      const result = await this.service.focus.deletebanner();
      this.success(1, '删除banner成功', result);
    } catch (error) {
      this.error(0, '删除banner失败', error);
    }
  }
}

module.exports = FocusController;
