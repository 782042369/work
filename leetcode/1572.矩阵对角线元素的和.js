// @Author: 杨宏旋
// @Date: 2020-10-13 18:33:54
// @LastEditors: 杨宏旋
// @LastEditTime: 2020-10-13 18:45:51
// @Description:
/**
 * @param {number[][]} mat
 * @return {number}
 */
var diagonalSum = function (mat) {
  if (!mat) {
    return 0
  }
  const row = mat.length
  if (row < 1) {
    return 0
  }

  let all = 0
  for (let i = 0; i < row; i++) {
    all += mat[i][i]
    const col = row - i - 1
    col !== i && (all += mat[i][col])
  }
  return all
}
diagonalSum([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
])
// diagonalSum([
//   [1, 1, 1, 1],
//   [1, 1, 1, 1],
//   [1, 1, 1, 1],
//   [1, 1, 1, 1],
// ])
