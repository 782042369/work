/*
 * @Author: 杨宏旋
 * @Date: 2021-03-23 16:47:08
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-03-23 16:58:24
 * @Description:
 */
/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function (s) {
  let res = [...s]
  //栈匹配括号，剩下括号删除
  let stack = []
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i)
    } else if (s[i] === ')') {
      if (stack.length > 0) {
        stack.pop()
      } else {
        delete res[i] //栈为空，没有左括号，把当前右括号删除
      }
    }
  }
  while (stack.length) {
    //删除栈顶元素直到栈空
    delete res[stack.pop()]
  }
  return res.join('')
}
const result = minRemoveToMakeValid('lee(t(c)o)de)')
console.log('result: ', result)
