/*
 * @Author: 杨宏旋
 * @Date: 2020-10-23 17:22:16
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-23 17:36:15
 * @Description:
 */
/**
 * @param {number} n
 * @return {number[]}
 */
var printNumbers = function (n) {
  return Array.from({ length: Math.pow(10, n) - 1 }, (item, index) => index + 1)
}
printNumbers(1)
