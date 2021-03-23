/*
 * @Author: 杨宏旋
 * @Date: 2021-03-23 17:20:19
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-03-23 17:51:00
 * @Description:
 */
/**
 * @param {string} digits
 * @return {string[]}
 */
const map = {
  2: 'abc',
  3: 'def',
  4: 'ghi',
  5: 'jkl',
  6: 'mno',
  7: 'pqrs',
  8: 'tuv',
  9: 'wxyz',
}
var letterCombinations = function (digits) {
  if (digits.length === 0) return []
  const res = []
  const dfs = (curStr, i) => {
    // curStr是当前字符串，i是扫描的指针
    if (i > digits.length - 1) {
      // 指针越界，递归的出口
      res.push(curStr) // 将解推入res
      return // 结束当前递归分支
    }
    const letters = map[digits[i]] // 当前数字对应的字母
    for (const letter of letters) {
      // 一个字母是一个选择，对应一个递归分支
      dfs(curStr + letter, i + 1) // 选择翻译成letter，生成新字符串，i指针右移继续翻译（递归）
    }
  }
  dfs('', 0) // 递归的入口，初始字符串为''，从下标0开始翻译
  return res
}
const result = letterCombinations('23')
