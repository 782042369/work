const fs = require('fs');
// 读取目录没有创建
// fs.stat('upload', (err, stats) => {
//   if (err) {
//     fs.mkdir('upload', err => { // 创建目录
//       if (err) {
//         console.log('err: ', err);
//         return;
//       }
//       console.log('创建成功');
//     })
//   } else {
//     console.log('目录存在');
//     console.log('目录', stats.isDirectory());
//   }
// })
// 查找目录下的所有目录
let arr = [];
fs.readdir('html', (err, files) => {
  if (err) {} else {
    // (function getFile(i) {
    //   if (i == files.length) {
    //     console.log(arr);
    //     return false;
    //   }
    //   fs.stat('html/' + files[i], (err, stats) => {
    //     if (stats.isDirectory()) {
    //       arr.push(files[i])
    //     }
    //     getFile(i + 1);
    //   })
    // })(0)
    for (let i in files) {
      fs.stat('html/' + files[i], (err, stats) => {
        if (stats.isDirectory()) {
          arr.push(files[i])
        }
        console.log('arr: ', arr);
      })
    }
  }
})
