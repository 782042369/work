'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  // 查找
  async find() {
    const _id = this.ctx.request.body.id
    let result = ''
    if (_id) {
      result = await this.ctx.model.Role.find({
        _id
      });
    } else {
      result = await this.ctx.model.Role.find({});
    }

    return result;
  }
  // 增加
  async addrole() {
    const title = this.ctx.request.body.title
    const description = this.ctx.request.body.description
    const role = new this.ctx.model.Role({
      description,
      title
    });
    const result = role.save();
    return result;
  }
  // 编辑
  async edit() {
    const id = this.ctx.request.body.id
    const title = this.ctx.request.body.title
    const description = this.ctx.request.body.description
    const result = await this.ctx.model.Role.updateOne({
      _id: id
    }, {
      description,
      title
    });
    return result;
  }
  // 删除
  async delete() {
    const password = this.ctx.request.body.password
    const username = this.ctx.request.body.userName
    const result = await this.ctx.model.Role.find({
      username,
      password
    });
    return result;
  }
}

module.exports = RoleService;