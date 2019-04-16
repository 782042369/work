/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 第三方中间件 
 * @Date: 2019-04-15 16:55:01
 * @LastEditTime: 2019-04-15 17:29:00
 */
const koa = require('koa');
// 引入实例化
const router = require('koa-router')();
const ejs = require('ejs');
const views = require('koa-views');
// 实例化
const app = new koa();
// ejs模版引擎
app.use(views('views', {
  map: {
    html: 'ejs'
  }
}))
router.get('/', async (ctx) => {
  let title = '你好ejs'
  await ctx.render('index', {
    title: title
  });
})
router.get('/news', async (ctx) => {
  ctx.body = '新闻';
})
app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods()); // 可以配置也可以不配置 建议配置 设置对应的响应头

app.listen(3000, '127.0.0.1');
