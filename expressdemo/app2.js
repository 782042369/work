/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: ejs模版 
 * @Date: 2019-04-11 20:02:04
 * @LastEditTime: 2019-04-11 20:38:50
 */
const express = require('express');
let app = new express;
app.set('view engine', 'ejs'); // views 默认加载这个文件夹 配置模版引擎
// 内置中间件 静态文件 中间件
app.use(express.static('public'))
// 虚拟目录
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.render('index'); // 渲染模版
})
app.get('/news', (req, res) => {
  let arr = [1, 2, 34, 5123];
  res.render('news', {
    list: arr
  }); // 渲染模版
})
app.listen(3000, '127.0.0.1');
