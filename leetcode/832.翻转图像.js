/*
 * @Author: 杨宏旋
 * @Date: 2020-10-28 17:48:52
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-06 15:31:08
 * @Description:
 */
/**
 * @param {number[][]} A
 * @return {number[][]}
 */
var flipAndInvertImage = function (A) {
  for (let i = 0; i < A.length; i++) {
    let last = A[i].length - 1
    for (let j = 0; j < A[i].length / 2; j++) {
      if (A[i][j] === A[i][last - j]) {
        if (A[i][j] === 1) {
          A[i][j] = 0
          A[i][last - j] = 0
        } else {
          A[i][j] = 1
          A[i][last - j] = 1
        }
      }
    }
  }
  return A
}
const arr = flipAndInvertImage([
  [1, 1, 0],
  [1, 0, 1],
  [0, 0, 0],
])
console.log('arr: ', arr)
