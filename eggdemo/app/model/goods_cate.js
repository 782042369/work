'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const GoodsCateSchema = new Schema({
    title: {
      type: String,
    },
    cate_img: { // 分类图片
      type: String,
    },
    filter_attr: { // 筛选id
      type: String,
    },
    link: {
      type: String,
    },
    template: { // 分类模版
      type: String,
    },
    pid: {
      type: Schema.Types.Mixed,
    },
    sub_title: { // seo
      type: String,
    },
    keywords: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: Number,
      default: 1,
    },
    sort: {
      type: Number,
    },
    add_time: {
      type: Number,
      default: new Date().getTime(),
    },
  });
  return mongoose.model('GoodsCate', GoodsCateSchema, 'goods_cate');
};
