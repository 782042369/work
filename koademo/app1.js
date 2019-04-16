const koa = require('koa');
var Router = require('koa-router');

const app = new koa();
var router = new Router();

router.get('/', async (ctx) => {
  ctx.body = '首页';
}).get('/news', async (ctx) => {
  console.log('ctx: ', ctx);
  ctx.body = '新闻';
})
app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods()); // 可以配置也可以不配置 建议配置 设置对应的响应头

app.listen(3000, '127.0.0.1');
