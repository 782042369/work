/*
 * @Author: 杨宏旋
 * @Date: 2021-03-08 17:56:12
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-03-08 18:12:22
 * @Description:
 */
const arr = []
function test() {
  console.log(arr)
}
function sayHello(name) {
  test()
  return `Hello ${name}`
}

export default sayHello
