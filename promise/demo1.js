/*
 * @Author: 杨宏旋
 * @Date: 2020-10-21 10:58:46
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-01-28 11:01:04
 * @Description:
 */
const MyPromise = require('./MyPromise')
const promise = new Promise((resolve, reject) => {
  // resolve('promise resolve')
  // reject('promise reject')
  // throw 'promise throw error'
  setTimeout(() => {
    resolve('promise setTimeout resolve')
  }, 2000)
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
  // throw 'mypromise throw error'
  setTimeout(() => {
    resolve('mypromise setTimeout resolve')
  }, 2000)
})

mypromise.then(
  (val) => {
    console.log('then1 resolve ', val)
  },
  (err) => {
    console.log('then1 reject ', err)
  }
)
