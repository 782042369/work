/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 应用中间件 
 * @Date: 2019-04-15 16:55:01
 * @LastEditTime: 2019-04-15 17:11:57
 */
const koa = require('koa');
// 引入实例化
var router = require('koa-router')();

const app = new koa();

app.use(async (ctx, next) => {
  console.log(new Date());
  next();
})
router.get('/', async (ctx) => {
  ctx.body = '首页';
})
router.get('/news', async (ctx) => {
  ctx.body = '新闻';
})
app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods()); // 可以配置也可以不配置 建议配置 设置对应的响应头

app.listen(3000, '127.0.0.1');
