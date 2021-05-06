/*
 * @Author: 杨宏旋
 * @Date: 2021-05-06 15:45:11
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-05-06 18:03:47
 * @Description:
 */
export default class Dep {
  constructor() {
    this.subs = []
  }
  static target = null
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach((sub) => {
      debugger
      sub.update()
    })
  }
}
