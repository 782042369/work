/*
 * @Author: 杨宏旋
 * @Date: 2020-11-11 15:32:54
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-11 15:48:07
 * @Description:
 */
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  // return s.reverse()
  var i = -1,
    j = s.length
  while (++i < --j) {
    ;[s[i], s[j]] = [s[j], s[i]]
  }
  return s
}
const arr = reverseString(['h', 'e', 'l', 'l', 'o'])
console.log('arr: ', arr)
