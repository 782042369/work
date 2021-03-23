/*
 * @Author: 杨宏旋
 * @Date: 2021-03-23 15:51:56
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-03-23 16:23:17
 * @Description:
 */
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getSmallestString = function (n, k) {
  let cur = 0,
    pre = 0,
    sum = k,
    ans = ''
  for (let i = 1; i <= n; i++) {
    sum -= pre
    cur = Math.min(26, sum - (n - i))
    pre = cur
    ans = String.fromCharCode(cur + 'a'.charCodeAt(0) - 1) + ans
  }
  return ans
}
const result = getSmallestString(3, 27)
console.log('result: ', result)
