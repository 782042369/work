/*
 * @Author: 杨宏旋
 * @Date: 2020-01-08 18:06:47
 * @LastEditors  : 杨宏旋
 * @LastEditTime : 2020-01-08 18:39:57
 * @Description: 队列封装
 */

const items = new WeakMap()
class Queue {
  constructor() {
    items.set(this, [])
  }
  // enqueue 队列添加一个或者多个元素
  enqueue(ele) {
    items.get(this).push(ele)
  }
  // dequeue 移除第一项 并返回
  dequeue() {
    return items.get(this).shift()
  }
  // front 返回第一个元素 不改变队列
  front() {
    return items.get(this)[0]
  }
  // isEmpty 是否为空
  isEmpty() {
    return items.get(this).length === 0
  }
  // size 个数
  size() {
    return items.get(this).length
  }
  // toString
  toString() {
    return items.get(this).join(',')
  }
}
export default Queue
