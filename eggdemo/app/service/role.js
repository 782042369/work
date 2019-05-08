'use strict';
const Service = require('egg').Service;
class RoleService extends Service {
  // 查找
  async find() {
    const _id = this.ctx.request.body.id;
    let result = '';
    let arr = {};
    if (_id) {
      arr = {
        _id,
      };
    } else {
      arr = {};
    }
    result = await this.ctx.model.Role.find(arr);
    return result;
  }
  // 增加
  async addrole() {
    const title = this.ctx.request.body.title;
    let result = '';
    result = await this.ctx.model.Role.find({
      title,
    });
    if (result.length === 0) {
      const role = new this.ctx.model.Role(this.ctx.request.body);
      result = role.save();
    }
    return result;
  }
  // 编辑
  async edit() {
    const _id = this.ctx.request.body.id;
    const title = this.ctx.request.body.title;
    const description = this.ctx.request.body.description;
    const result = await this.ctx.model.Role.updateOne({
      _id,
    }, {
      description,
      title,
      add_time: new Date().getTime(),
    });
    return result;
  }
  // 删除
  async delete() {
    const _id = this.ctx.request.body.id;
    const result = await this.ctx.model.Role.deleteOne({
      _id,
    });
    return result;
  }
}

module.exports = RoleService;
