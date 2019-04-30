'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async index() {
    this.ctx.body = '后台文章管理'
  }
  async add() {
    this.ctx.body = '后台文章添加'
  }
  async delete() {
    this.ctx.body = '后台文章删除'
  }
  async edit() {
    this.ctx.body = '后台文章编辑'
  }
}

module.exports = ArticleController;
