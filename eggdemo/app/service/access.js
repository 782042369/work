'use strict';

const Service = require('egg').Service;
class AccessService extends Service {
  // 查找
  async find() {
    const _id = this.ctx.request.body.id;
    const module_id = this.ctx.request.body.module_id;
    let arr = {};
    if (_id) {
      arr = {
        _id,
      };
    } else if (module_id !== undefined) {
      arr = {
        module_id,
      };
    } else {
      arr = {};
    }
    const result = await this.ctx.model.Access.find(arr);
    return result;
  }
  async findaccesslist() {
    // 自关联表查询
    const result = await this.ctx.model.Access.aggregate([{
      $lookup: {
        from: 'access',
        localField: '_id',
        foreignField: 'module_id',
        as: 'items',
      },
    },
    {
      $match: {
        module_id: 0,
      },
    },
    ]);
    return result;
  }

  // 增加
  async addaccess() {
    const module_name = this.ctx.request.body.module_name;
    const module_id = this.ctx.request.body.module_id;
    if (module_id) {
      this.ctx.request.body.module_id = this.app.mongoose.Types.ObjectId(module_id);
    }
    let result = '';
    result = await this.ctx.model.Access.find({
      module_name,
    });
    if (result.length === 0) {
      const access = new this.ctx.model.Access(this.ctx.request.body);
      result = access.save();
    }
    return result;
  }
  // 编辑
  async edit() {
    const _id = this.ctx.request.body.id;
    const module_id = this.ctx.request.body.module_id;
    if (module_id) {
      this.ctx.request.body.module_id = this.app.mongoose.Types.ObjectId(module_id);
    }
    const result = await this.ctx.model.Access.updateOne({
      _id,
    }, Object.assign(this.ctx.request.body, {
      add_time: new Date().getTime(),
    }));
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
