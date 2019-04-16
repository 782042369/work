/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: art-template 
 * @Date: 2019-04-15 16:55:01
 * @LastEditTime: 2019-04-15 18:29:16
 */
const koa = require('koa');
const path = require('path');
// 引入实例化
const router = require('koa-router')();
const render = require('koa-art-template');
// 实例化
const app = new koa();
// ejs模版引擎
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});
router.get('/', async (ctx) => {
  let app = {
    name: '2w12d',
    h: '<h2>lkaldlasdal </h2>'
  }
  await ctx.render('index', {
    list: app
  });
})
app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods()); // 可以配置也可以不配置 建议配置 设置对应的响应头

app.listen(3000, '127.0.0.1');
