/*
 * @Author: 杨宏旋
 * @Date: 2021-03-08 17:56:00
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-03-08 18:30:27
 * @Description:
 */
import sayHello from './sayHello'

console.log(sayHello, sayHello('Gopal'))

// 单纯为了演示，就是有条件的时候才去动态加载
if (true) {
  import('./Another.js').then((res) => console.log(res))
}
