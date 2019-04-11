/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 路由中间件  匹配路由之前和匹配路由之后做的操作
 * @Date: 2019-04-11 20:02:04
 * @LastEditTime: 2019-04-11 20:35:18
 */
const express = require('express');
let app = new express;
/* 中间件匹配任何路由
应用中间件 */
app.use(function (req, res, next) {
  console.log(new Date());
  next();
})
app.get('/', (req, res) => {
  res.send('1'); // 渲染模版
})
app.get('/news', (req, res, next) => {
  console.log('路由中间件,通过app.use');
  next();
})
app.get('/news', (req, res) => {
  res.send('路由中间件'); // 渲染模版
})
app.listen(3000, '127.0.0.1');
