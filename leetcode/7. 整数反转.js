/*
 * @Author: 杨宏旋
 * @Date: 2021-05-25 14:51:50
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-05-25 15:03:48
 * @Description:
 */
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const res =
    parseInt(String(x).split('').reverse().join('')) * (x >= 0 ? 1 : -1)
  return res < Math.pow(-2, 31) || res > Math.pow(2, 31) - 1 ? 0 : res
}
console.log('reverse(123): ', reverse(1534236469))
