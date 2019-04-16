const koa = require('koa');
// 引入实例化
var router = require('koa-router')();

const app = new koa();
router.get('/', async (ctx) => {
  ctx.body = '首页';
})

router.get('/news', async (ctx) => {
  ctx.body = '新闻';
})

//http://127.0.0.1:3000/newscontent?id=1234
router.get('/newscontent', async (ctx) => {
  // 从ctx 中获取参数
  // console.log(ctx.query); // { id: '1234?uid=2321' } 对象
  // console.log(ctx.querystring); // id=1234?uid=2321 字符串
  console.log(ctx.request);
  // let arr = {
  //   method: 'GET',
  //   url: '/newscontent?id=1234?uid=2321',
  //   header: {
  //     host: '127.0.0.1:3000',
  //     connection: 'keep-alive',
  //     pragma: 'no-cache',
  //     'cache-control': 'no-cache',
  //     'upgrade-insecure-requests': '1',
  //     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
  //     dnt: '1',
  //     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  //     'accept-encoding': 'gzip, deflate, br',
  //     'accept-language': 'zh-CN,zh;q=0.9'
  //   }
  // }
  console.log(ctx.request.query);


  ctx.body = '新闻详情';
})
//http://127.0.0.1:3000/newscontent?id=1234
router.get('/newscontent/:aid', async (ctx) => {

  console.log(ctx.params); //{ aid: '123213' }

  ctx.body = '新闻详情';
})
app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods()); // 可以配置也可以不配置 建议配置 设置对应的响应头

app.listen(3000, '127.0.0.1');
