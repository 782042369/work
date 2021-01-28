/*
 * @Author: 杨宏旋
 * @Date: 2020-10-20 16:06:19
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-01-28 11:54:09
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
    this.onFulfilledCallbacks = [] // 异步订阅onFulfilled任务
    this.onRejectedCallbacks = [] // 异步订阅onRejected任务
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        // 发布onFulfilled任务
        this.onFulfilledCallbacks.forEach((fn) => fn())
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        // 发布onRejected任务
        this.onRejectedCallbacks.forEach((fn) => fn())
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
    if (this.status === PENDING) {
      // 订阅onFulfilled任务
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value)
      })
      // 订阅onRejected任务
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}
module.exports = MyPromise
