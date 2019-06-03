'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GoodsSchema = new Schema({
    title: {
      type: String,
    },
    sub_title: {
      type: String,
    },
    goods_sn: {
      type: String,
    },
    cate_id: {
      type: Schema.Types.ObjectId,
    },
    click_count: {
      type: Number,
      default: 100,
    },
    goods_number: {
      type: Number,
      default: 1000,
    },
    shop_price: {
      type: Number,
    },
    market_price: {
      type: Number,
    },
    relation_goods: {
      type: String,
    },
    goods_attrs: {
      type: String,
    },
    goods_version: {
      /* 版本*/
      type: String,
    },
    goods_img: {
      type: String,
    },
    goods_gift: {
      type: String,
    },
    goods_fitting: {
      type: String,
    },
    goods_color: {
      type: String,
    },
    goods_keywords: {
      type: String,
    },
    goods_desc: {
      type: String,
    },
    goods_content: {
      type: String,
    },
    sort: {
      type: Number,
      default: 100,
    },
    is_delete: {
      type: Number,
    },
    recommend: { // 0 精品 1  热销 2 新品
      type: String,
    },
    goods_type_id: {
      type: Schema.Types.Mixed, // 混合类型
    },
    status: {
      type: Number,
      default: 1,
    },
    add_time: {
      type: Number,
      default: new Date().getTime(),
    },
  });
  return mongoose.model('Goods', GoodsSchema, 'goods');
};
