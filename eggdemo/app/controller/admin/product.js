'use strict';

const Controller = require('egg').Controller;

class ProductController extends Controller {
  async index() {
    this.ctx.body = '后台商品管理'
  }
  async add() {
    this.ctx.body = '后台商品添加'
  }
  async delete() {
    this.ctx.body = '后台商品删除'
  }
  async edit() {
    this.ctx.body = '后台商品编辑'
  }
}

module.exports = ProductController;
