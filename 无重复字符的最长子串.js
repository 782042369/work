// @Author: 杨宏旋
// @Date: 2020-01-18 10:39:57
// @LastEditors: 杨宏旋
// @LastEditTime: 2020-09-14 16:22:17
// @Description: 无重复字符的最长子串
// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
//  示例 1:
//  输入: "abcabcbb"
//  输出: 3
//  解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
//
//  示例 2:
//  输入: "bbbbb"
//  输出: 1
//  解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
//
//  示例 3:
//  输入: "pwwkew"
//  输出: 3
//  解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//  请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
//
/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function (s) {
  let i = 0,
    k = 0,
    max = 0,
    str = ''
  while (i < s.length) {
    if (str == '') {
      k = i
    }
    if (str.indexOf(s[i]) == -1) {
      str += s[i]
      i++
    } else {
      max = Math.max(max, str.length)
      i = k + str.indexOf(s[i]) + 1
      str = ''
    }
  }
  return Math.max(max, str.length)
}
const arr = 'abedasdasdadasfesdgerhrtejhhjyrjetgcabcbb'
lengthOfLongestSubstring(arr)
