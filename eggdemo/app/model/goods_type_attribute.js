'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const GoodsTypeAttributeSchema = new Schema({
    cate_id: {
      type: Schema.Types.ObjectId,
    },
    title: {
      type: String
    },
    attr_type: { // 类型 1 input 2 textarea 3 select
      type: String
    },
    attr_value: { // 默认值 input textarea 默认值空 select 有默认值
      type: String
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
  return mongoose.model('GoodsTypeAttribute', GoodsTypeAttributeSchema, 'goods_type_attribute');
};
