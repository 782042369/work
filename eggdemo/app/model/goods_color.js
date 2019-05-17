'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const GoodsColorSchema = new Schema({
    color_name: {
      type: String,
    },
    color_value: {
      type: String,
    },
    add_time: {
      type: Number,
      default: new Date().getTime(),
    },
  });
  return mongoose.model('GoodsColor', GoodsColorSchema, 'goods_color');
};
