/*
 * @Author: 杨宏旋
 * @Date: 2020-10-15 18:02:11
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-15 18:12:25
 * @Description:
 */
/**
 * @param {string} s
 * @param {number[]} indices
 * @return {string}
 */
var restoreString = function (s, indices) {
  if (s.length !== indices.length) {
    return
  }
  const arr = []
  s.split('').map((ele, index) => (arr[indices[index]] = ele))
  return arr.join('')
}
restoreString('codeleet', [4, 5, 6, 7, 0, 2, 1, 3])
