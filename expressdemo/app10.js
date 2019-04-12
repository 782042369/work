/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 负载均衡 中间件  匹配路由之前和匹配路由之后做的操作 
 * 关闭浏览器消失
 * @Date: 2019-04-11 20:02:04
 * @LastEditTime: 2019-04-12 11:34:54
 */
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongourl = 'mongodb://127.0.0.1:27017/nodedemo'
let app = new express;
// session 中间件
app.use(session({
  secret: 'keyboard cat', // 服务器生成session 签名
  name: 'session_id', // 本地的cookiename 
  resave: false, // 强制保存session 即使没有变化 建议设置false 
  saveUninitialized: true, // 强制将未初始化的 session 存储 默认true 建议设置 true
  cookie: { // cookie https 访问cookies secure: true
    secure: false,
    maxAge: 2000000 // 过期时间
  },
  rolling: true, // 每次 设置sessin
  store: new MongoStore({
    url: mongourl,
    touchAfter: 24 * 3600, // 通过这样做， 设置touchAfter： 24 * 3600 你说会话只在24小时内更新一次， 无论发生了多少请求（ 除了那些改变会话数据的东西）
  })

}))
// views 默认加载这个文件夹 配置模版引擎
app.set('view engine', 'ejs');
// 内置中间件 静态文件 中间件
app.use(express.static('public'))

app.get('/', (req, res) => {
  req.session;
  if (req.session.uesrinfo) {
    res.send(req.session.uesrinfo)
  } else {
    res.send('未登录')
  }
})

app.get('/login', (req, res) => {
  req.session.uesrinfo = 'yanghongxuan';
  res.send('设置session')
})

app.listen(3000, '127.0.0.1');
