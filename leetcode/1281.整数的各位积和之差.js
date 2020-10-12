/* eslint-disable no-eval */
// @Author: 杨宏旋
// @Date: 2020-09-28 15:32:42
// @LastEditors: 杨宏旋
// @LastEditTime: 2020-09-28 15:38:56
// @Description:
/**
 * @param {number} n
 * @return {number}
 */
var subtractProductAndSum = function (n) {
  const arr = n.toString().split('')
  const a = arr.reduce((acc, cur) => acc * cur, 1) // 乘积
  const b = arr.reduce((acc, cur) => acc + cur, 0) // 和
  // for (let i = 0; i < arr.length; i++) {
  //   b += Number(arr[i])
  //   a *= Number(arr[i])
  // }
  // const a = eval(arr.join('*'))
  // const b = eval(arr.join('+'))
  return a - b
}
subtractProductAndSum(234)
subtractProductAndSum(4421)
