/*
 * @Author: 杨宏旋
 * @Date: 2020-10-26 14:12:03
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-26 14:17:18
 * @Description:
 */
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
  let ans = 0
  while (x !== 0 || y !== 0) {
    if ((x & 1) !== (y & 1)) {
      ans++
    }
    x >>= 1
    y >>= 1
  }
  return ans
}
hammingDistance(1, 4)
