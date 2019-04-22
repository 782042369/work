'use strict';

const Controller = require('egg').Controller;

class NewController extends Controller {
  async index() {
    const {
      ctx
    } = this;
    const list = await this.service.news.getNewsList();
    // 异步方法
    await ctx.render('news.ejs', {
      list
    });
  }
  async content() {
    const {
      ctx
    } = this;
    // get传值
    const list = await this.service.news.getNewsContent();
    // 异步方法
    await ctx.render('content.ejs', {
      list: list[0]
    });
  }
  async list() {
    const {
      ctx
    } = this;
    // 动态路由传值
    console.log(ctx.params);
    ctx.body = '新闻列表';
  }
}

module.exports = NewController;
