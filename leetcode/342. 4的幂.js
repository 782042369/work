/*
 * @Author: 杨宏旋
 * @Date: 2021-03-23 14:54:01
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-03-23 15:18:02
 * @Description:
 */
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function (n) {
  const power = Math.log10(n) / Math.log10(4)
  return Number.isInteger(power)
}
const result = isPowerOfFour(64)
// console.log('result: ', result)
// const result1 = isPowerOfFour(5)
// console.log('result1: ', result1)
// const result2 = isPowerOfFour(1)
// console.log('result2: ', result2)
// const result3 = isPowerOfFour(-2147483648)
// console.log('result3: ', result3)
