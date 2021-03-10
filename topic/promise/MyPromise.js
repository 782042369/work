/*
 * @Author: 杨宏旋
 * @Date: 2020-10-20 16:06:19
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-01-28 12:49:03
 * @Description:
 */
/**
 * https://promisesaplus.com/ 实现
 */
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>')
    )
  }
  let called = false
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then
      if (typeof then === 'function') {
        console.log('then: ', then)
        then.call(
          x,
          (y) => {
            if (called) {
              return
            }
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          (r) => {
            if (called) {
              return
            }
            called = true
            reject(r)
          }
        )
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) {
        return
      }
      called = true
      reject(e)
    }
  } else {
    if (called) return
    called = true
    resolve(x)
  }
}
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
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === PENDING) {
        // 订阅onFulfilled任务
        this.onFulfilledCallbacks.push(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
        // 订阅onRejected任务
        this.onRejectedCallbacks.push(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })
    return promise2
  }
  catch(onRejected) {
    this.then(undefined, onRejected)
  }
}
module.exports = MyPromise
