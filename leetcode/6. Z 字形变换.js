/*
 * @Author: 杨宏旋
 * @Date: 2021-05-25 14:17:40
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-05-25 14:51:13
 * @Description:
 */
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows == 1) return s

  const len = Math.min(s.length, numRows)
  const rows = Array.from({ length: len }, () => '')
  let loc = 0
  let down = false

  for (const c of s) {
    rows[loc] += c
    if (loc == 0 || loc == numRows - 1) down = !down
    loc += down ? 1 : -1
  }
  return rows.join('')
}
const s = 'PAYPALISHIRING',
  numRows = 3
console.log(convert(s, numRows))
// "PAYPALISHIRING"
// "PAHNAPLSIIGYIR"
