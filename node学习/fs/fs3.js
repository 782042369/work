const fs = require('fs');
// 文件流读取

// const readStream = fs.createReadStream('input.txt');
// let arr = ''; // 数据
// let conut = 0; // 读取次数
// readStream.on('data', chunk => {
//   arr += chunk;
//   conut++;
// });
// readStream.on('end', chunk => {
//   console.log('conut: ', conut);
//   console.log('arr', arr);
// });
// readStream.on('error', err => {
//   console.log('读取失败');
// })
// const writeStream = fs.createWriteStream('output.txt');
// let arr = '写入数据\n'; // 写入数据
// for (let i = 0; i < 100; i++) {
//   writeStream.write(arr, 'utf-8');
// }
// writeStream.end();
// writeStream.on('finish', () => {
//   console.log('写入完成');
// })
// writeStream.on('error', err => {
//   console.log('写入失败');
// })
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');
readStream.pipe(writeStream);
console.log('写入完成');
