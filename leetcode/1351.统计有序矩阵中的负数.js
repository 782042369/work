/*
 * @Author: 杨宏旋
 * @Date: 2020-10-28 17:06:05
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-28 17:13:45
 * @Description:
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
var countNegatives = function (grid) {
  // let count = 0
  // const arr = grid.flat()
  // for (let i = 0; i < arr.length; i++) {
  //   arr[i] < 0 && (count += 1)
  // }
  // return count
  return grid.toString().split('-').length - 1
}
const arr = countNegatives([
  [4, 3, 2, -1],
  [3, 2, 1, -1],
  [1, 1, -1, -2],
  [-1, -1, -2, -3],
])
console.log('arr: ', arr)
