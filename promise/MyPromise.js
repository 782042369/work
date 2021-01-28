/*
 * @Author: 杨宏旋
 * @Date: 2020-10-20 16:06:19
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-01-28 11:02:31
 * @Description:
 */
/**
 * https://promisesaplus.com/ 实现
 */
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class MyPromise {
  constructor(execute) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined

    const resolve = (value) => {
      console.log('value: ', value)
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
      }
    }
    try {
      execute(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === REJECTED) {
      onRejected(this.reason)
    }
  }
}
module.exports = MyPromise
