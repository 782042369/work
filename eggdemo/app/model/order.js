module.exports = app => {
  const mongoose = app.mongoose; /*引入建立连接的mongoose */
  const Schema = mongoose.Schema;
  //数据库表的映射
  const OrderSchema = new Schema({
    order_id: {
      type: String
    },
    uid: {
      type: Number
    },
    trade_no: {
      type: String
    },
    all_price: {
      type: Number
    },
    all_num: {
      type: Number
    }
  });
  return mongoose.model('Order', OrderSchema, 'order');
}
