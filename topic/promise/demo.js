/*
 * @Author: 杨宏旋
 * @Date: 2020-10-21 10:58:46
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-01-28 11:01:16
 * @Description:
 */
const MyPromise = require('./MyPromise')
const promise = new Promise((resolve, reject) => {
  // resolve('promise resolve')
  // reject('promise reject')
  // throw 'promise throw error'
})

promise.then(
  (val) => {
    console.log('then1 resolve ', val)
  },
  (err) => {
    console.log('then1 reject ', err)
  }
)

const mypromise = new MyPromise((resolve, reject) => {
  // resolve('mypromise resolve')
  // reject('mypromise reject')
  throw 'mypromise throw error'
})

mypromise.then(
  (val) => {
    console.log('then1 resolve ', val)
  },
  (err) => {
    console.log('then1 reject ', err)
  }
)
