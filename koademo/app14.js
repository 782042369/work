/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: cookie
 * @Date: 2019-04-15 16:55:01
 * @LastEditTime: 2019-04-19 15:36:38
 */
const koa = require('koa');
const path = require('path');
// 引入实例化
const router = require('koa-router')();
const render = require('koa-art-template');
// 引入数据库
const DB = require('./module/db1')
// 实例化
const app = new koa();
// ejs模版引擎
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});
router.get('/', async (ctx) => {
  ctx.cookies.set('userinfo', 'zhangsan', {
    maxAge: 60 * 60 * 1000
  })
  const resul = await DB.find('user', {});
  await ctx.render('index', {
    list: resul
  });
})
router.get('/news', async (ctx) => {
  ctx.cookies.set('userinfo', 'zhangsan', {
    maxAge: 60 * 60 * 1000
  })
  const resul = await DB.find('user', {});
  await ctx.render('index', {
    list: resul
  });
})
router.get('/add', async (ctx) => {
  const res = await DB.insert('user', {
    username: "杨宏旋",
    age: 20,
    sex: "男",
    status: "1",
  });
  console.log('res: ', res.result);
  await ctx.render('news', {
    list: app
  });
})
router.get('/update', async (ctx) => {
  const res = await DB.update('user', {
    username: "杨宏旋"
  }, {
    username: "杨宏旋1234"
  });
  console.log('res: ', res);
  await ctx.render('news', {
    list: app
  });
})
router.get('/delete', async (ctx) => {
  const res = await DB.delete('user', {
    username: "杨宏旋1234"
  });
  console.log('res: ', res);
  await ctx.render('news', {
    list: app
  });
})
router.get('/login', async (ctx) => {
  let app = {
    name: ctx.cookies.get('userinfo')
  }
  await ctx.render('news', {
    list: app
  });
})
app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods()); // 可以配置也可以不配置 建议配置 设置对应的响应头

app.listen(3000, '127.0.0.1');
