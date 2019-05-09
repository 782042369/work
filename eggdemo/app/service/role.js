'use strict';
const Service = require('egg').Service;
class RoleService extends Service {
  // 查找
  async find() {
    const _id = this.ctx.request.body.id;
    let arr = {};
    if (_id) {
      arr = {
        _id,
      };
    } else {
      arr = {};
    }
    const result = await this.ctx.model.Role.find(arr);
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
    const result = await this.ctx.model.Role.updateOne({
      _id,
    }, Object.assign(this.ctx.request.body, {
      add_time: new Date().getTime()
    }));
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


  // 关联权限
  async addauth() {
    let {
      access_node,
      role_id
    } = this.ctx.request.body;
    try {
      const arr = await this.service.tools.steamroller(access_node)
      for (let i = 0; i < arr.length; i++) {
        console.log('arr[i]: ', arr[i]);
        let auth = new this.ctx.model.Addauth({
          role_id,
          access_id: arr[i]
        })
        console.log('auth: ', auth);
        auth.save();
      }
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
  // 查询关联权限
  async authlist() {
    console.log('this.ctx.request.query: ', this.ctx.request.query);
    const result = await this.ctx.model.Addauth.find(this.ctx.request.query);
    return result;
  }
}

module.exports = RoleService;
