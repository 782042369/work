import express from 'express';
// 实例化
const app = new express();
// 引入路由
import router from './router/index.js';
// session
import session from 'express-session';
app.locals['userinfo'] = ''; // 全局ejs模版
// ejs模版
app.set('view engine', 'ejs')
// 静态资源目录
app.use(express.static('public'));
app.use('/upload', express.static('upload'));
// 使用路由
app.use('/', router);
// 使用中间件session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 6 * 30
    },
    rolling: true
  })
)
// 监听端口
app.listen(3000, '127.0.0.1')
