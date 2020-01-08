/*
 * @Author: 杨宏旋
 * @Date: 2020-01-08 18:00:56
 * @LastEditors  : 杨宏旋
 * @LastEditTime : 2020-01-08 18:05:17
 * @Description:
 */
// 栈，是一种遵从后进先出(LIFO,Later-In-First-Out)原则的有序集合。新添加的元素都保存在栈的一端，称作栈顶，另一端叫做栈底。在栈中，新元素都靠近栈顶，旧元素都靠近栈底。
class Stack {
  constructor() {
    this.items = [];
  };
  // push(value): 添加一个新元素到栈顶
  push(value) {
    this.items.push(value);
  };
  // pop(): 移除栈顶的元素， 同时返回该元素
  pop() {
    return this.items.pop();
  };
  // peek(): 获取栈顶的元素
  peek() {
    return this.items[this.items.length - 1];
  };
  // isEmpty(): 判断栈是否为空。 是返回true, 否返回fallse
  isEmpty() {
    return this.items.length === 0;
  };
  // clear(): 清空栈里的元素
  clear() {
    return this.items = [];
  };
  // size(): 获取栈里元素的个数
  size() {
    return this.items.length;
  }
  // 打印数据
  toString() {
    return this.items.join(',')
  }
}
export default Stack
