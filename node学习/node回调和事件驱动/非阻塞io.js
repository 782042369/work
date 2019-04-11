const fs = require('fs');
const events = require('events');
// 非阻塞io 
// console.log(1);
// fs.readFile('./mime.json', (err, data) => {
//   if (err) {
//     console.log('json不存在')
//     return;
//   }
//   console.log(2);
// })
// console.log(3);

// 回调函数
// function getMine(callback) {
//   fs.readFile('./mime.json', (err, data) => {
//     if (err) {
//       console.log('json不存在')
//       return;
//     }
//     callback(data);
//   })
// }
// getMine(function (data) {
//   console.log('data: ', data);
// });

// let EventEmitter = new events.EventEmitter();
// 广播 和 接受广播
// EventEmitter.on('to_mine', (data) => {
//   console.log(data);
// })
// EventEmitter.on('to_parent', (data) => {
//   console.log(data);
//   EventEmitter.emit('to_mine', '发送mine')
// })
// setTimeout(() => {
//   console.log('开始广播');
//   EventEmitter.emit('to_parent', '发送parent')
// }, 2000);
// function getMine() {
//   fs.readFile('./mime.json', (err, data) => {
//     if (err) {
//       console.log('json不存在')
//       return;
//     }
//     EventEmitter.emit('data', data.toString())
//   })
// }
// getMine();
// EventEmitter.on('data', (mime) => {
//   console.log('mime: ', mime);
// })
// async await
async function getMine() {
  let result = await new Promise(function (resolve, reject) {
    fs.readFile('./mime.json', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    })
  })
  return result;
}
getMine().then((res) => {
  console.log('res: ', res);
});
