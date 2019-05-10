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
      await this.ctx.model.Addauth.deleteMany({
        role_id
      })
      access_node.forEach(res => {
        if (res.checkedList.length > 0) {
          res.checkedList.forEach(element => {
            this.ctx.model.Access.find({
              _id: element
            }).then(val => {
              let {
                module_name,
                url
              } = val[0]
              let auth = new this.ctx.model.Addauth({
                role_id,
                pid: this.app.mongoose.Types.ObjectId(res.key),
                access_id: this.app.mongoose.Types.ObjectId(element),
                role_id,
                module_name,
                url
              })
              auth.save();
            })
          })
          this.ctx.model.Access.find({
            _id: res.key
          }).then(ele => {
            let {
              module_name,
              _id,
              url
            } = ele[0]
            let authparent = new this.ctx.model.Addauth({
              role_id,
              module_name,
              parent_id: _id,
              url
            })
            authparent.save();
          })
        }
      })
    } catch (error) {
      return error;
    }
  }
  // 查询关联权限
  async authlist() {
    let {
      role_id,
      list
    } = this.ctx.request.query
    let result = []
    if (list === '1') {
      result = await this.ctx.model.Addauth.find({
        role_id
      });
    } else {
      result = await this.ctx.model.Addauth.aggregate([{
          $lookup: {
            from: 'role_access',
            localField: 'parent_id',
            foreignField: 'pid',
            as: 'items',
          }
        },
        {
          $match: {
            role_id,
            pid: ''

          }
        }
      ]);
    }
    return result;
  }
}

module.exports = RoleService;
