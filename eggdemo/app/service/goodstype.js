'use strict';

const Service = require('egg').Service;
class GoodsService extends Service {
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
      const result = await this.ctx.model.GoodsType.find(arr);
      return result;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
  // 增加
  async addgoods() {
    const title = this.ctx.request.body.title;
    let result = '';
    result = await this.ctx.model.GoodsType.find({
      title,
    });
    if (result.length === 0) {
      const goods = new this.ctx.model.GoodsType(this.ctx.request.body);
      result = goods.save();
    }
    return result;
  }
  // 编辑
  async editgoods() {
    const _id = this.ctx.request.body.id;
    const result = await this.ctx.model.GoodsType.updateOne(
      {
        _id,
      },
      Object.assign(this.ctx.request.body, {
        add_time: new Date().getTime(),
      })
    );
    return result;
  }
  async deletegoods() {
    const _id = this.ctx.request.body.id;
    const result = await this.ctx.model.GoodsType.deleteOne({
      _id,
    });
    return result;
  }
}

module.exports = GoodsService;
