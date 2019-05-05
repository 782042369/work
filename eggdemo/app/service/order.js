'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
  async getOrderItem() {
    const orderResult = await this.ctx.model.Order.aggregate([{
      $lookup: {
        from: 'order_item',
        localField: 'order_id',
        foreignField: 'order_id',
        as: 'items'
      }
    }])
    return orderResult
  }
}

module.exports = OrderService;
