'use strict';

const Service = require('egg').Service;

class GoodsCateService extends Service {
  async find() {
    try {
      const result = await this.ctx.model.GoodsCate.find(this.ctx.request.body);
      return result;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
  // 增加
  async addgoodsattribute() {
    const title = this.ctx.request.body.title;
    const cate_id = this.ctx.request.body.cate_id;
    let result = '';
    result = await this.ctx.model.GoodsCate.find({
      title,
      cate_id,
    });
    if (result.length === 0) {
      this.ctx.request.body.cate_img = this.ctx.request.body.cate_img.fileList[0].response.data[0].saveDir;
      const goods = new this.ctx.model.GoodsCate(this.ctx.request.body);
      result = goods.save();
    }
    return result;
  }
  // 编辑
  async editgoodsattribute() {
    try {
      const _id = this.ctx.request.body.id;
      if (this.ctx.request.body.cate_img) {
        this.ctx.request.body.cate_img = this.ctx.request.body.cate_img.fileList[0].response.data[0].saveDir;
      }
      const result = await this.ctx.model.GoodsCate.updateOne({
          _id,
        },
        Object.assign(this.ctx.request.body, {
          add_time: new Date().getTime(),
        })
      );
      return result;
    } catch (error) {
      console.log('error: ', error);
      return error;

    }
  }
  async deletegoodsattribute() {
    const _id = this.ctx.request.body.id;
    const result = await this.ctx.model.GoodsCate.deleteOne({
      _id,
    });
    return result;
  }
}

module.exports = GoodsCateService;
