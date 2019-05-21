'use strict';

const BaseController = require('./base');

class GoodsController extends BaseController {
  async index() {
    try {
      const result = await this.service.goodsColor.find();
      this.success(1, '商品颜色列表读取成功', result);
    } catch (error) {
      this.error(0, '商品颜色列表读取失败', error);
    }
  }
  async addgoodscolor() {
    try {
      const result = await this.service.goodsColor.addgoodscolor();
      if (result.length > 0) {
        this.success(0, '商品颜色已经存在', result);
      } else {
        this.success(1, '增加商品颜色成功', result);
      }
    } catch (error) {
      this.error(0, '商品颜色增加失败', error);
    }
  }
  async editgoodscolor() {
    try {
      const result = await this.service.goodsColor.editgoodscolor();
      this.success(1, '商品颜色修改成功', result);
    } catch (error) {
      this.error(0, '商品颜色修改失败', error);
    }
  }
  async deletegoodscolor() {
    try {
      const result = await this.service.goodsColor.deletegoodscolor();
      this.success(1, '商品颜色删除成功', result);
    } catch (error) {
      this.error(0, '商品颜色删除失败', error);
    }
  }
}

module.exports = GoodsController;
