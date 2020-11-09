/*
 * @Author: 杨宏旋
 * @Date: 2020-11-06 15:46:58
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-06 15:55:02
 * @Description:
 */
/**
 * @param {number} num
 * @return {number}
 */
var maximum69Number = function (num) {
  return Number(num.toString().replace('6', '9'))
}
const arr = maximum69Number(9669)
console.log('arr: ', arr)
