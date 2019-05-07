'use strict';

const Service = require('egg').Service;
class AccessService extends Service {
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
    result = await this.ctx.model.Access.find(arr);
    return result;
  }
  // 增加
  async addaccess() {
    const description = this.ctx.request.body.description;
    const module_id = this.ctx.request.body.module_id;
    const module_name = this.ctx.request.body.module_name;
    const role_id = this.ctx.request.body.role_id;
    const sort = this.ctx.request.body.sort;
    let result = '';
    result = await this.ctx.model.Access.find({
      module_name
    });
    console.log('result: ', result);
    if (result.length === 0) {
      const access = new this.ctx.model.Access({
        module_name,
        description,
        module_name,
        module_id,
        role_id,
        sort
      });
      console.log('access: ', access);
      result = access.save();
    }
    return result;
  }
  // 编辑
  async edit() {
    const _id = this.ctx.request.body.id;
    const title = this.ctx.request.body.title;
    const description = this.ctx.request.body.description;
    const result = await this.ctx.model.Access.updateOne({
      _id,
    }, {
      description,
      title,
      add_time: new Date().getTime()
    });
    return result;
  }
  // 删除
  async delete() {
    const _id = this.ctx.request.body.id;
    const result = await this.ctx.model.Access.deleteOne({
      _id,
    });
    return result;
  }
}

module.exports = AccessService;
