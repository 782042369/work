/*
 * @Author: 杨宏旋
 * @Date: 2020-11-10 16:29:14
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-10 16:41:48
 * @Description:
 */
/**
 * @param {number[]} heights
 * @return {number}
 */
var heightChecker = function (heights) {
  let num = 0
  ;[...heights]
    .sort((a, b) => a - b)
    .forEach((ele, index) => {
      if (ele !== heights[index]) {
        num++
      }
    })
  return num
}
const arr = heightChecker([
  10,
  6,
  6,
  10,
  10,
  9,
  8,
  8,
  3,
  3,
  8,
  2,
  1,
  5,
  1,
  9,
  5,
  2,
  7,
  4,
  7,
  7,
])
console.log('arr: ', arr)
// const brr = heightChecker([5, 1, 2, 3, 4])
// console.log('brr: ', brr)
