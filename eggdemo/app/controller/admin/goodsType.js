'use strict';

const BaseController = require('./base');

class GoodsTypeController extends BaseController {
  async index() {
    try {
      const result = await this.service.goodstype.find();
      this.success(1, '商品列表读取成功', result);
    } catch (error) {
      this.error(0, '商品列表读取失败', error);
    }
  }
  // async index() {
  //   try {
  //     const result = await this.service.goods.find();
  //     this.success(1, '商品列表读取成功', result);
  //   } catch (error) {
  //     this.error(0, '商品列表读取失败', error);
  //   }
  // }
}

module.exports = GoodsTypeController;
