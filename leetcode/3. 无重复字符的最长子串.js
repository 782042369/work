/*
 * @Author: 杨宏旋
 * @Date: 2021-05-24 17:23:52
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-05-24 17:59:39
 * @Description:
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let start = 0
  let res = 0
  const map = new Map()
  for (let end = 0; end < s.length; end++) {
    const txt = s[end]
    if (map.has(txt) && map.get(txt) >= start) {
      start = map.get(txt) + 1
    }
    res = Math.max(res, end - start + 1)
    map.set(txt, end)
  }
  return res
}
console.log(
  'lengthOfLongestSubstring("abcabcbb"): ',
  lengthOfLongestSubstring('abcabcbb')
)
