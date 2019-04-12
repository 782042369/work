const express = require('express');
// 实列
const app = new express;
// ejs模版
app.set('view engine', 'ejs')
// 静态资源目录
app.use(express.static('public'))
// 首页
app.get('/', (req, res) => {
  res.render('index')
});
// 登陆
app.get('/login', (req, res) => {
  res.render('login')
});
// 商品
app.get('/product', (req, res) => {
  res.render('index')
});
// 增加商品列表
app.get('/add', (req, res) => {
  res.render('add')
});
// 编辑商品列表
app.get('/productedit', (req, res) => {
  res.render('edit')
});
// 删除商品列表
app.get('/productdelete', (req, res) => {
  res.render('delete')
});
// 监听端口
app.listen(3000, '127.0.0.1');
