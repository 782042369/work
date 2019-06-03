'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GoodsTypeSchema = new Schema({
    title: {
      type: String,
    },
    description: {
      type: String,
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

  return mongoose.model('GoodsType', GoodsTypeSchema, 'goods_type');
};
