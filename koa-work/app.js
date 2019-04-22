/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 错误处理中间件 
 * @Date: 2019-04-15 16:55:01
 * @LastEditTime: 2019-04-19 16:50:09
 */
const koa = require('koa');
// 引入实例化
const router = require('koa-router')();

const app = new koa();
router.get('/admin', async (ctx) => {
  ctx.body = '首页';
})

app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods()); // 可以配置也可以不配置 建议配置 设置对应的响应头

app.listen(3003, '127.0.0.1');
