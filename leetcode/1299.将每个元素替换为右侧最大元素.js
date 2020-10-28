/*
 * @Author: 杨宏旋
 * @Date: 2020-10-28 15:49:36
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-28 15:56:48
 * @Description:
 */
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var replaceElements = function (arr) {
  const data = []
  let max = -1
  for (let i = arr.length - 1; i >= 0; i--) {
    data[i] = max
    max = arr[i] > max ? arr[i] : max
  }
  return data
}
const arr = replaceElements([17, 18, 5, 4, 6, 1]) // [18,6,6,6,1,-1]
console.log('arr: ', arr)
