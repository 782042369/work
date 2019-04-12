/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: cookie 中间件  匹配路由之前和匹配路由之后做的操作
 * @Date: 2019-04-11 20:02:04
 * @LastEditTime: 2019-04-12 10:44:47
 */
const express = require('express');
var cookieParser = require('cookie-parser')
let app = new express;

// views 默认加载这个文件夹 配置模版引擎
app.set('view engine', 'ejs');
// 内置中间件 静态文件 中间件
app.use(express.static('public'))

app.use(cookieParser('yhongx123'))

app.get('/', (req, res) => {
  console.log();
  res.send(req.cookies); // 渲染模版
})

/* username  名字 cookie 值 {}配置 */
app.get('/city', (req, res) => {
  let city = req.query.city
  let citys = req.cookies.citys;
  if (citys) {
    citys.push(city);
  } else {
    citys = [];
    citys.push(city);
  }

  res.cookie('citys', [...new Set(citys)], {
    maxAge: 60000,
    httpOnly: true // 只允许服务端设置
  })
  res.send('设置cookie'); // 渲染模版
})

app.get('/news', (req, res) => {
  console.log(req.cookies);
  res.send('获取cookie'); // 渲染模版
})
app.listen(3000, '127.0.0.1');
