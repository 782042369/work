'use strict';

const BaseController = require('./base');

class GoodsController extends BaseController {
  async index() {
    try {
      const result = await this.service.goodsTypeAttribute.find();
      this.success(1, '商品属性列表读取成功', result);
    } catch (error) {
      this.error(0, '商品属性列表读取失败', error);
    }
  }
  async addgoodsattribute() {
    try {
      const result = await this.service.goodsTypeAttribute.addgoodsattribute();
      if (result.length > 0) {
        this.success(0, '商品属性已经存在', result);
      } else {
        this.success(1, '增加商品属性成功', result);
      }
    } catch (error) {
      this.error(0, '商品属性增加失败', error);
    }
  }
  async editgoodsattribute() {
    try {
      const result = await this.service.goodsTypeAttribute.editgoodsattribute();
      this.success(1, '商品属性修改成功', result);
    } catch (error) {
      this.error(0, '商品属性修改失败', error);
    }
  }
  async deletegoodsattribute() {
    try {
      const result = await this.service.goodsTypeAttribute.deletegoodsattribute();
      this.success(1, '商品属性删除成功', result);
    } catch (error) {
      this.error(0, '商品属性删除失败', error);
    }
  }
}

module.exports = GoodsController;
