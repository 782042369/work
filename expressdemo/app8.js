/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: sesstion 中间件  匹配路由之前和匹配路由之后做的操作 
 * 关闭浏览器消失
 * @Date: 2019-04-11 20:02:04
 * @LastEditTime: 2019-04-12 11:20:30
 */
const express = require('express');
const session = require('express-session');
let app = new express;
// session 中间件
app.use(session({
  secret: 'keyboard cat', // 服务器生成session 签名
  name: 'session_id', // 本地的cookiename 
  resave: false, // 强制保存session 即使没有变化 建议设置false 
  saveUninitialized: true, // 强制将未初始化的 session 存储 默认true 建议设置 true
  cookie: { // cookie https 访问cookies secure: true
    secure: false,
    maxAge: 20000 // 过期时间
  },
  rolling: true // 每次 设置sessin
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
// 退出登陆
app.get('/loginout', (req, res) => {
  // req.session.cookie.maxAge = 0; // 设置cookit生存 时间0
  req.session.destroy(err => { // 销毁session
    console.log('err: ', err);
  })
  res.send('退出登陆')
})
app.get('/news', (req, res) => {
  if (req.session.uesrinfo) {
    res.send(req.session.uesrinfo)
  } else {
    res.send('未登录')
  }
})
app.listen(3000, '127.0.0.1');
