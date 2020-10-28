/*
 * @Author: 杨宏旋
 * @Date: 2020-10-26 14:29:35
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-28 15:30:05
 * @Description:
 */
/**
 * @param {string} S
 * @return {string}
 */
var removeOuterParentheses = function (S) {
  var stack = []
  var count = 0
  for (var i = 0; i < S.length; i++) {
    if (S[i] === '(') {
      count++
      // 根据数量判断
      count >= 2 && stack.push(S[i])
    } else if (S[i] === ')') {
      count--
      // 根据数量判断
      count >= 1 && stack.push(S[i])
    }
  }
  return stack.join('')
}
const arr = removeOuterParentheses('(()())(())')
console.log('arr: ', arr)
