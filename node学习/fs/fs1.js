const fs = require('fs');
// fs.stat('index.html', (err, stats) => {
//   if (err) {
//     console.log('err: ', err);
//     return;
//   }
//   stats.isFile(); // 文件
//   console.log('文件', stats.isFile());
//   stats.isDirectory(); // 目录
//   console.log('目录', stats.isDirectory());
// })
// fs.stat('html', (err, stats) => {
//   if (err) {
//     console.log('err: ', err);
//     return;
//   }
//   stats.isFile(); // 文件
//   console.log('文件', stats.isFile());
//   stats.isDirectory(); // 目录
//   console.log('目录', stats.isDirectory());
// })
// fs.mkdir('css', err => { // 创建目录
//   if (err) {
//     console.log('err: ', err);
//     return;
//   }
//   console.log('创建成功');
// })
// fs.writeFile('demo.txt', '你好ndoe.js', err => {
//   if (err) {
//     console.log('err: ', err);
//     return;
//   }
//   console.log('写入成功');
// })
// fs.appendFile('demo1.txt', '你好ndoe.js', err => { // 追加文件
//   if (err) {
//     console.log('err: ', err);
//     return;
//   }
//   console.log('写入成功');
// })
// fs.readFile('demo1.txt', (err, data) => { // 追加文件
//   if (err) {
//     console.log('err: ', err);
//     return;
//   }
//   console.log(data.toString());
// // })
// fs.readdir('html', (err, data) => { // 读取目录
//   if (err) {
//     console.log('err: ', err);
//     return;
//   }
//   console.log('data: ', data);
// })
// fs.rename('html/index.html', 'html/news.html', (err, data) => { // 改名
//   if (err) {
//     console.log('err: ', err);
//     return;
//   }
//   console.log('改名成功');
// })
// fs.rename('html/style.css', 'html/css/base.css', (err, data) => { // 剪切
//   if (err) {
//     console.log('err: ', err);
//     return;
//   }
//   console.log('剪切成功');
// })

// fs.rmdir('d', err => { // 只能删除目录
//   if (err) {
//     console.log('err: ', err);
//     return;
//   }
//   console.log('删除目录成功');
// })
fs.unlink('d.txt', err => { // 删除文件
  if (err) {
    console.log('err: ', err);
    return;
  }
  console.log('删除文件成功');
})
