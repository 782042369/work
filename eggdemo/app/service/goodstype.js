'use strict';

const Service = require('egg').Service;
class GoodsService extends Service {
  async find() {
    try {
      const pagesize = this.ctx.request.body.pagesize || 10
      const pagenum = this.ctx.request.body.pagenum || 1
      const result = await this.ctx.model.GoodsType.find(this.ctx.request.body).sort({
        add_time: -1
      }).skip((pagenum - 1) * pagesize).limit(pagesize);
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
    const result = await this.ctx.model.GoodsType.updateOne({
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
