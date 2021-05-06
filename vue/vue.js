/*
 * @Author: 杨宏旋
 * @Date: 2021-05-06 14:55:15
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-05-06 18:00:40
 * @Description:
 */
import Dep from './Dep.js'
import Watcher from './Watcher.js'
import Observer from './Observer.js'
import Compile from './Compile.js'

export default class Vue {
  constructor(options) {
    this.data = options.data
    this.methods = options.methods
    // 数据劫持
    Object.keys(this.data).forEach((key) => {
      this.proxyKeys(key)
    })
    // 监听
    Observer(this.data)
    // 挂载
    new Compile(options.el, this)
    options.mounted.call(this) //所有事情处理好后执行mounted函数
  }
  proxyKeys(key) {
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: function getter() {
        return this.data[key]
      },
      set: function setter(newVal) {
        this.data[key] = newVal
      },
    })
  }
}
