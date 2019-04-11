/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 动态路由
 * @Date: 2019-04-11 20:02:04
 * @LastEditTime: 2019-04-11 20:02:31
 */
const express = require('express');
let app = new express;
app.get('/', (req, res) => {
  res.send('你好express');
})
app.get('/login', (req, res) => {
  res.send('login');
})
app.get('/news', (req, res) => {
  res.send('news');
})
app.get('/home', (req, res) => {
  res.send('home');
})
// 动态路由 /newscontent/1234
app.get('/newscontent/:aid', (req, res) => {
  let aid = req.params.aid;
  res.send('newscontent' + aid);
})
// get动态路由 /newscontent?aid=1234
app.get('/product', (req, res) => {
  let aid = req.query.aid;
  res.send('product' + aid);
})

// app.post('/dologin', (req, res) => {
//   res.send('home');
// })
app.listen(3000, '127.0.0.1');
