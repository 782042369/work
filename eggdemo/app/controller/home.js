'use strict';

const Controller = require('egg').Controller;
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/egg')
class HomeController extends Controller {
  async index() {
    const {
      ctx
    } = this;
    // 查找
    const data = await this.app.mongo.find('order');
    // const data1 = await this.app.mongo.find('order_item');
    // 增加 
    // const data = await this.app.mongo.insertOne('user', {
    //   doc: {
    //     name: "wuhuimin",
    //     age: "25",
    //     sex: "女",
    //     bir: "03-18"
    //   }
    // });
    // 修改
    // const data = await this.app.mongo.findOneAndUpdate('user', {
    //   filter: {
    //     name: "wuhuimin"
    //   },
    //   update: {
    //     $set: {
    //       name: "吴慧敏"
    //     }
    //   }
    // });
    // 删除
    // const data = await this.app.mongo.findOneAndDelete('user', {
    //   filter: {
    //     name: "minmin"
    //   }
    // });
    // 指定id的数据
    // const data = await this.app.mongo.find('user', {
    //   query: {
    //     '_id': this.app.getObjectID('5cc7df87e5ba1c1c6b0645f8')
    //   },
    // });
    // 删除指定id
    // const data = await this.app.mongo.findOneAndDelete('user', {
    //   filter: {
    //     '_id': this.app.getObjectID('5cc7e2a9e5ba1c1c6b0645fa')
    //   },
    // });

    ctx.body = {
      data: data,
      data1: data1
    };
  }
  async add() {
    const {
      ctx
    } = this;
    ctx.body = 'hi, egg';
  }
  async order() {
    const {
      ctx
    } = this;
    // 查找 
    /**
     * 关联查询
     * from order 和 order_item
     * @localField  @foreignField order-order_id 和 order_item-order_id 关联
     * as 返回数据
     */
    const data = await this.app.mongo.aggregate('order', {
      pipeline: [{
        $lookup: {
          from: 'order_item',
          localField: 'order_id',
          foreignField: 'order_id',
          as: 'items'
        }
      }],
      options: {

      }
    });
    ctx.body = {
      data: data
    }
  }
}

module.exports = HomeController;
