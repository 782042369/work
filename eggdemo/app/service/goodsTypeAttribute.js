'use strict';

const Service = require('egg').Service;

class GoodsTypeAttributeService extends Service {
  async find() {
    try {
      let result = [];
      const pagesize = this.ctx.request.body.pagesize || 10;
      const pagenum = this.ctx.request.body.pagenum || 1;
      if (this.ctx.request.body._id) {
        result = this.ctx.model.GoodsTypeAttribute
          .find({
            _id: this.ctx.request.body._id,
          })
          .sort({
            add_time: -1,
          })
          .skip((pagenum - 1) * pagesize)
          .limit(pagesize);
      } else {
        result = await this.ctx.model.GoodsTypeAttribute.aggregate([{
            $lookup: {
              from: 'goods_type',
              localField: 'cate_id',
              foreignField: '_id',
              as: 'parent',
            },
          },
          {
            $match: {
              // 字符串
              cate_id: this.app.mongoose.Types.ObjectId(this.ctx.request.body.id),
            },
          },
          {
            $sort: {
              add_time: -1,
            },
          },
          {
            $skip: (pagenum - 1) * pagesize,
          },
          {
            $limit: pagesize,
          },
        ]);
      }
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
    result = await this.ctx.model.GoodsTypeAttribute.find({
      title,
      cate_id,
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
    console.log('this.ctx.request.body: ', this.ctx.request.body);
    const result = await this.ctx.model.GoodsTypeAttribute.updateOne({
        _id,
      },
      Object.assign(this.ctx.request.body, {
        add_time: new Date().getTime(),
      })
    );
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

module.exports = GoodsTypeAttributeService;
