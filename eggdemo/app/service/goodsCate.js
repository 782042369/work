'use strict';

const Service = require('egg').Service;

class GoodsCateService extends Service {
  async find() {
    try {
      let result = []
      if (this.ctx.request.body._id) {
        result = this.ctx.model.GoodsCate.find({
          _id: this.app.mongoose.Types.ObjectId(this.ctx.request.body._id)
        })
      } else {
        result = await this.ctx.model.GoodsCate.aggregate([{
            $lookup: {
              from: 'goods_type',
              localField: 'cate_id',
              foreignField: '_id',
              as: 'parent',
            },
          },
          {
            $match: { // 字符串
              cate_id: this.app.mongoose.Types.ObjectId(this.ctx.request.body.id),
            }
          }
        ]);
      }
      return result;
    } catch (error) {
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
      cate_id
    });
    if (result.length === 0) {
      const goods = new this.ctx.model.GoodsCate(this.ctx.request.body);
      result = goods.save();
    }
    return result;
  }
  // 编辑
  async editgoodsattribute() {
    const _id = this.ctx.request.body.id;
    const result = await this.ctx.model.GoodsCate.updateOne({
      _id,
    }, Object.assign(this.ctx.request.body, {
      add_time: new Date().getTime(),
    }));
    return result;
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
