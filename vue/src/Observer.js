/*
 * @Author: 杨宏旋
 * @Date: 2021-05-06 15:45:57
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-05-06 15:49:40
 * @Description:
 */
import Dep from './Dep.js'

const defineReactive = (data, key, val) => {
  const dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function getter() {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    set: function setter(newVal) {
      if (newVal === val) {
        return
      }
      val = newVal
      dep.notify()
    },
  })
}

function Observer(data) {
  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key])
  })
}
export default Observer
