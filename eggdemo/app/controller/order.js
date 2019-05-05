'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  async index() {
    const {
      ctx,
      service
    } = this
    const data = await service.order.getOrderItem();
    ctx.body = {
      data: data
    }
  }
}

module.exports = OrderController;
