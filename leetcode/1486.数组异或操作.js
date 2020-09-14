// @Author: 杨宏旋
// @Date: 2020-09-14 17:31:21
// @LastEditors: 杨宏旋
// @LastEditTime: 2020-09-14 17:44:00
// @Description:
/**
 * @param {number} n
 * @param {number} start
 * @return {number}
 */
const xorOperation = function (n, start) {
  let num = 0
  for (let i = 0; i < n; i++) {
    const arr = start + 2 * i
    num = num ^ arr
  }
  return num
}
xorOperation(5, 0) // 8
xorOperation(4, 3) // 8
xorOperation(1, 7) // 7
xorOperation(10, 5) // 2
