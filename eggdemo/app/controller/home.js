'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const {
      ctx
    } = this;
    await ctx.render('index.ejs');
  }
  async add() {
    const {
      ctx
    } = this;
    ctx.body = 'hi, egg';
    console.log('ctx: ', ctx.request.body);
  }
}

module.exports = HomeController;
