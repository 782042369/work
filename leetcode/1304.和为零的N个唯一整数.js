/*
 * @Author: 杨宏旋
 * @Date: 2020-11-06 16:23:11
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-06 16:39:21
 * @Description:
 */
/**
 * @param {number} n
 * @return {number[]}
 */
var sumZero = function (n) {
  const ans = []
  let sum = 0

  for (let i = 0; i < n - 1; i++) {
    ans.push(i)
    sum += i
  }
  ans.push(-sum)
  return ans
}
const arr = sumZero(5)
console.log('arr: ', arr)
