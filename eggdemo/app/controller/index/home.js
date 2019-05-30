'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const {
      ctx,
      app
    } = this;
    // set
    await app.redis.set('username', '杨宏旋');
    await this.app.redis.set('age', '20')
    const username = await this.app.redis.get('username')
    console.log('username: ', username);
    ctx.body = {
      msg: '欢迎欢迎',
    };
  }
}

module.exports = HomeController;
