'use strict';
module.exports = app => {
  const mongoose = app.mongoose; /* 引入建立连接的mongoose */
  const Schema = mongoose.Schema;
  const d = new Date();
  const FocusSchema = new Schema({
    title: {
      type: String,
    },
    type: {
      type: String,
    },
    focus_img: {
      type: String,
    },
    link: {
      type: String,
      default: '',
    },
    sort: {
      type: String,
    },
    status: {
      type: String,
      default: 1,
    },
    add_time: {
      type: Number,
      default: d.getTime(),
    },
  });
  return mongoose.model('Focus', FocusSchema, 'focus');
};
