'use strict';
const Service = require('egg').Service;
class ManagerService extends Service {
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
    result = await this.ctx.model.User.find(arr);
    return result;
  }
  // 增加
  async addmanager() {
    const userName = this.ctx.request.body.userName;
    const email = this.ctx.request.body.email;
    const mobile = this.ctx.request.body.mobile;
    const role_id = this.ctx.request.body.role_id;
    const role = this.ctx.request.body.role;
    const password = this.ctx.request.body.password;
    let result = await this.ctx.model.User.find({
      userName,
    });
    if (result.length === 0) {
      const rolearr = new this.ctx.model.User({
        password,
        email,
        userName,
        mobile,
        role_id,
        role,
      });
      result = rolearr.save();
    }
    return result;
  }
  // 编辑
  async edit() {
    const _id = this.ctx.request.body.id;
    const userName = this.ctx.request.body.userName;
    const email = this.ctx.request.body.email;
    const mobile = this.ctx.request.body.mobile;
    const role_id = this.ctx.request.body.role_id;
    const role = this.ctx.request.body.role;
    const password = this.ctx.request.body.password;
    const result = await this.ctx.model.User.updateOne({
      _id,
    }, {
      password,
      email,
      userName,
      mobile,
      role_id,
      role,
    });
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
