/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: session
 * @Date: 2019-04-15 16:55:01
 * @LastEditTime: 2019-04-16 12:13:06
 */
const koa = require('koa');
const session = require('koa-session');
// 引入实例化
const router = require('koa-router')();
// 实例化
const app = new koa();
// 配置sesstion
app.keys = ['some secret hurr']; // 签名

const CONFIG = {
  key: 'koa:sess', // key
  maxAge: 86400000, // 过期时间
  autoCommit: true,
  overwrite: true, // 默认
  httpOnly: true, // 服务端获取
  signed: true, // 默认
  rolling: false, // 请求强制设置session
  renew: true, // 快过期后 重设section
};

app.use(session(CONFIG, app));
router.get('/', async (ctx) => {
  ctx.body = ctx.session.ueerinfo;
})
router.get('/login', async (ctx) => {
  ctx.session.ueerinfo = '张三';
  ctx.body = '登陆成功';
})
app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods()); // 可以配置也可以不配置 建议配置 设置对应的响应头

app.listen(3000, '127.0.0.1');
