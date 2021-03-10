/*
 * @Author: 杨宏旋
 * @Date: 2020-10-21 10:58:46
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-01-28 12:51:46
 * @Description:
 */
const MyPromise = require('./MyPromise')
let p1 = new MyPromise((resolve, reject) => {
  resolve(100)
})
const p2 = p1
  .then((a) => {
    return new MyPromise((resolve, reject) => {
      resolve(a + ' new promise reject')
    })
  })
  .then(
    (val) => {
      return new MyPromise((resolve, reject) => {
        reject(val + ' new promise reject')
      })
    },
    (err) => {
      console.log(err)
      return Promise.reject('2222')
    }
  )

p2.then((res) => {
  console.log('res: ', res)
}).catch((err) => {
  console.log('err: ', err)
})
