/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: post 
 * @Date: 2019-04-15 16:55:01
 * @LastEditTime: 2019-04-15 18:01:06
 */
const koa = require('koa');
// 引入实例化
const router = require('koa-router')();
const views = require('koa-views');
var bodyParser = require('koa-bodyparser');
// 实例化
const app = new koa();
// ejs模版引擎
app.use(views('views', {
  map: {
    html: 'ejs'
  }
}))
app.use(bodyParser());

router.get('/', async (ctx) => {
  await ctx.render('form');
})
router.post('/doadd', async (ctx) => {
  console.log('ctx.request.body: ', ctx.request.body);
  ctx.body = ctx.request.body;
})
app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods()); // 可以配置也可以不配置 建议配置 设置对应的响应头

app.listen(3000, '127.0.0.1');
