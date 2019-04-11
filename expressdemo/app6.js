/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: bodyParser 中间件  匹配路由之前和匹配路由之后做的操作
 * @Date: 2019-04-11 20:02:04
 * @LastEditTime: 2019-04-11 20:51:19
 */
const express = require('express');
const bodyParser = require('body-parser')
let app = new express;

// views 默认加载这个文件夹 配置模版引擎
app.set('view engine', 'ejs');
// 内置中间件 静态文件 中间件
app.use(express.static('public'))

app.use(bodyParser.urlencoded({
  extended: false
}))
// parse application/json
app.use(bodyParser.json())

app.get('/login', (req, res) => {
  res.render('login'); // 渲染模版
})
app.post('/dologin', (req, res) => {
  console.log('req: ', req.body);
  res.send(req.body)
  // res.render('login'); // 渲染模版
})
app.listen(3000, '127.0.0.1');
