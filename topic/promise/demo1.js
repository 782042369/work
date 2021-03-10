/*
 * @Author: 杨宏旋
 * @Date: 2020-10-21 10:58:46
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-01-28 11:52:29
 * @Description:
 */
const MyPromise = require('./MyPromise')
const promise = new Promise((resolve, reject) => {
  // resolve('promise resolve')
  // reject('promise reject')
  // throw 'promise throw error'
  setTimeout(() => {
    resolve('promise setTimeout resolve')
    // reject('promise setTimeout reject')
  }, 2000)
})

promise
  .then(
    (val) => {
      console.log('then resolve ', val)
      return 'promise then resolve'
    },
    (err) => {
      console.log('then reject ', err)
      return 'promise then reject'
    }
  )
  .then(
    (val) => {
      console.log('then resolve ', val)
    },
    (err) => {
      console.log('then reject ', err)
    }
  )

const mypromise = new MyPromise((resolve, reject) => {
  // resolve('mypromise resolve')
  // reject('mypromise reject')
  // throw 'mypromise throw error'
  setTimeout(() => {
    resolve('mypromise setTimeout resolve')
    // reject('mypromise setTimeout reject')
  }, 2000)
})

mypromise.then(
  (val) => {
    console.log('then resolve ', val)
    return 'mypromise then resolve'
  },
  (err) => {
    console.log('then reject ', err)
    return 'mypromise then reject'
  }
)
// .then(
//   (val) => {
//     console.log('then resolve ', val)
//   },
//   (err) => {
//     console.log('then reject ', err)
//   }
// )
