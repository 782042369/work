'use strict';

const Service = require('egg').Service;

class GoodsTypeAttributeAttributeService extends Service {
  async find() {
    try {
      const _id = this.ctx.request.body.id;
      let arr = {};
      if (_id) {
        arr = {
          _id,
        };
      } else {
        arr = {};
      }
      const result = await this.ctx.model.GoodsTypeAttribute.find(arr);
      return result;
    } catch (error) {
      return error;
    }
  }
  // 增加
  async addgoodsattribute() {
    const title = this.ctx.request.body.title;
    console.log('this.ctx.request.body: ', this.ctx.request.body);
    let result = '';
    result = await this.ctx.model.GoodsTypeAttribute.find({
      title,
    });
    if (result.length === 0) {
      const goods = new this.ctx.model.GoodsTypeAttribute(this.ctx.request.body);
      result = goods.save();
    }
    return result;
  }
  // 编辑
  async editgoodsattribute() {
    const _id = this.ctx.request.body.id;
    const result = await this.ctx.model.GoodsTypeAttribute.updateOne({
      _id,
    }, Object.assign(this.ctx.request.body, {
      add_time: new Date().getTime(),
    }));
    return result;
  }
  async deletegoodsattribute() {
    const _id = this.ctx.request.body.id;
    const result = await this.ctx.model.GoodsTypeAttribute.deleteOne({
      _id,
    });
    return result;
  }
}

module.exports = GoodsTypeAttributeAttributeService;
