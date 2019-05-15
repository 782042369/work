'use strict';

const Service = require('egg').Service;
class FocusService extends Service {
  async find() {
    try {
      const _id = this.ctx.request.body.id;
      let arr = {};
      if (_id) {
        arr = {
          _id,
        };
      } else {
        arr = {};
      }
      const result = await this.ctx.model.GoodsType.find(arr);
      return result;
    } catch (error) {
      return error;
    }
  }
  async editbanner() {
    try {} catch (error) {
      return error;
    }
  }
  async deletebanner() {
    const _id = this.ctx.request.body.id;
    const result = await this.ctx.model.GoodsType.deleteOne({
      _id,
    });
    return result;
  }
}

module.exports = FocusService;
