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
              url
            } = ele[0]
            let authpid = new this.ctx.model.Addauth({
              role_id,
              module_name,
              url
            })
            authpid.save();
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
      role_id
    } = this.ctx.request.query
    const result = await this.ctx.model.Addauth.find({
      role_id
    });
    let map = {},
      dest = []
    for (let i = 0; i < result.length; i++) {
      let ai = result[i]
      if (!map[ai.pid] && ai.pid) {
        dest.push({
          pid: ai.pid,
          data: [ai]
        })
        map[ai.pid] = ai
      } else {
        for (let j = 0; j < dest.length; j++) {
          let dj = dest[j]
          if (dj.pid && dj.pid == ai.pid) {
            console.log('dj.pid: ', dj.pid);
            dj.data.push(ai)
          }
        }
      }
    }
    console.log('dest: ', dest);
    return dest;
  }
}

module.exports = RoleService;
