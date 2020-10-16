/*
 * @Author: 杨宏旋
 * @Date: 2020-10-16 17:37:03
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-16 17:42:45
 * @Description:
 */
/**
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function (s) {
  let num = 0
  let total = 0
  for (let i = 0; i < s.length; i++) {
    num += s[i] === 'R' ? 1 : -1
    num === 0 && (total += 1)
  }
  return total
}
balancedStringSplit('RLRRLLRLRL')
balancedStringSplit('RLLLLRRRLR')
balancedStringSplit('LLLLRRRR')
