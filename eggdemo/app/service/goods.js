'use strict';

const Service = require('egg').Service;

class GoodsService extends Service {
  async find() {
    try {
      const pagesize = this.ctx.request.body.pagesize || 10;
      const pagenum = this.ctx.request.body.pagenum || 1;
      const result = await this.ctx.model.Goods
        .find(this.ctx.request.body)
        .sort({
          add_time: -1,
        })
        .skip((pagenum - 1) * pagesize)
        .limit(pagesize);
      return result;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
  // 增加商品
  async addgoods() {
    const {
      title,
      goods_color,
      goods_type_id,
      pic,
      cate_id,
      selecttypeoptions,
      photoList
    } = this.ctx.request.body;
    const link = pic.file.response.data[0].saveDir; // 商品主图
    this.ctx.request.body.goods_color = goods_color.join('\n');
    this.ctx.request.body.goods_img = link;
    this.ctx.request.body.goods_type_id = this.app.mongoose.Types.ObjectId(goods_type_id)
    let result = '';
    result = await this.ctx.model.Goods.find({
      title,
    });
    if (result.length === 0) {
      const goods = new this.ctx.model.Goods(this.ctx.request.body);
      result = await goods.save();
      if (result._id) {
        let goods_id = this.app.mongoose.Types.ObjectId(result._id)
        this.savegoodsimg(photoList, goods_id) // 商品相册存储
        selecttypeoptions && this.findattribute(selecttypeoptions, cate_id, goods_id) // 商品属性存储
      }
    }
    return result;
  }
  // 商品相册
  async savegoodsimg(photoList, goods_id) {
    photoList.fileList.forEach(res => {
      const img_url = res.response.data[0].saveDir;
      const goodsimglist = new this.ctx.model.GoodsImage({
        img_url,
        goods_id
      });
      goodsimglist.save();
    });
  }
  async findattribute(selecttypeoptions, cate_id, goods_id) {
    for (let i in selecttypeoptions) {
      let res = selecttypeoptions[i]
      if (typeof res.value == 'object') {
        res.value = res.value.join('')
      }
      let attributeresult = await this.ctx.model.GoodsTypeAttribute.find({
        _id: res.key,
      })
      const goodsattr = new this.ctx.model.GoodsAttr({
        goods_id,
        cate_id,
        attribute_id: res.key,
        attribute_type: attributeresult[0].attr_type,
        attribute_title: attributeresult[0].title,
        attribute_value: res.value,
      });
      await goodsattr.save();
    }
  }
  // 编辑
  async editgoods() {
    try {
      const {
        _id
      } = this.ctx.request.body;
      const result = await this.ctx.model.Goods.updateOne({
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
  // 删除商品
  async deletegoods() {
    const _id = this.ctx.request.body.id;
    const result = await this.ctx.model.Goods.deleteOne({
      _id,
    });
    return result;
  }
}

module.exports = GoodsService;
