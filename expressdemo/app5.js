/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 错误中间件  匹配路由之前和匹配路由之后做的操作
 * @Date: 2019-04-11 20:02:04
 * @LastEditTime: 2019-04-11 20:36:53
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
app.get('/news', (req, res) => {
  res.send('新闻'); // 渲染模版
})
app.use(function (req, res) {
  res.status(404).send('404了')
})
app.listen(3000, '127.0.0.1');
