/*
 * @Author: 杨宏旋
 * @Date: 2021-05-25 15:23:27
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-05-25 15:54:36
 * @Description:
 */
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  let pre = '',
    num = '',
    idx = 0
  while (s[idx] === ' ') {
    idx++
  }
  while (s[idx] === '+' || s[idx] === '-') {
    if (pre) {
      return 0
    }
    pre = s[idx++]
  }
  while (s[idx] && s[idx].charCodeAt() >= 48 && s[idx].charCodeAt() <= 57) {
    num += s[idx++]
  }
  let res = Number(pre + num) || 0
  res = Math.max((-2) ** 31, res)
  res = Math.min(2 ** 31 - 1, res)
  return res
}
console.log('myAtoi(words and 987): ', myAtoi('words and 987'))
console.log('myAtoi(4193 with words): ', myAtoi('4193 with words'))
console.log('myAtoi(   -42): ', myAtoi('   -42'))
console.log('myAtoi(42): ', myAtoi('42'))
