// process.nextTick(function () {
//   console.log('延迟执行')
// })
// console.log('正常执行')
// setImmediate(function () {
//   console.log('延迟执行')
// })
// console.log('正常执行')
// process.nextTick(function () {
//   console.log('nextTick延迟执行')
// })
// setImmediate(function () {
//   console.log('setImmediate延迟执行')
// })
// console.log('正常执行')
// process.nextTick(function () {
//   console.log(1)
// })
// process.nextTick(function () {
//   console.log('nextTick延迟执行2')
// }) // 加入两个setImmediate()的回调函数
// setImmediate(function () {
//   console.log('setImmediate延迟执行1') // 进入下次循环 
//   process.nextTick(function () {
//     console.log('插入')
//   })
// })
// setImmediate(function () {
//   console.log('setImmediate延迟执行1') // 进入下次循环 
// })
process.nextTick(function () {
  console.log(1)
})
setTimeout(() => {
  console.log(2)
}, 0)
setImmediate(function () {
  console.log(3)
})
let p = new Promise(function (resolve, reject) {
  console.log(4)
  resolve()
})
p.then(function () {
  console.log(5)
})
console.log(6)
