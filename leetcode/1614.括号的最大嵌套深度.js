/*
 * @Author: 杨宏旋
 * @Date: 2020-10-13 11:42:42
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-13 11:50:33
 * @Description:
 */
/**
 * @param {string} s
 * @return {number}
 */
var maxDepth = function (s) {
  const stack = []
  let maxDep = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(s[i])
    } else if (s[i] === ')') {
      stack.pop()
    }
    maxDep = Math.max(maxDep, stack.length)
  }
  return maxDep
}
maxDepth('(1+(2*3)+((8)/4))+1')
