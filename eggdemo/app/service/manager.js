'use strict';
const Service = require('egg').Service;
class ManagerService extends Service {
  // 查找
  async find() {
    const _id = this.ctx.request.body.id;
    let result = '';
    if (_id) {
      result = await this.ctx.model.User.find({
        _id,
      });
    } else {
      result = await this.ctx.model.User.aggregate([{
        $lookup: {
          from: 'role',
          localField: 'role_id',
          foreignField: '_id',
          as: 'role',
        },
      }]);
    }
    return result;
  }
  // 增加
  async addmanager() {
    const userName = this.ctx.request.body.userName;
    let result = await this.ctx.model.User.find({
      userName,
    });
    if (result.length === 0) {
      const rolearr = new this.ctx.model.User(this.ctx.request.body);
      result = rolearr.save();
    }
    return result;
  }
  // 编辑
  async edit() {
    const _id = this.ctx.request.body.id;
    const result = await this.ctx.model.User.updateOne({
      _id,
    }, Object.assign(this.ctx.request.body, {
      add_time: new Date().getTime(),
    }));
    return result;
  }
  // 删除
  async delete() {
    const _id = this.ctx.request.body.id;
    const result = await this.ctx.model.User.deleteOne({
      _id,
    });
    return result;
  }
}

module.exports = ManagerService;
