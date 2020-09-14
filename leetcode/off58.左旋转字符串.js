// @Author: 杨宏旋
// @Date: 2020-09-14 17:26:02
// @LastEditors: 杨宏旋
// @LastEditTime: 2020-09-14 17:28:38
// @Description:
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
const reverseLeftWords = function (s, n) {
  if (!s || s === '') {
    return ''
  }
  return s.substring(n) + s.substring(n, 0)
}
reverseLeftWords('abcdefg', 2) // cdefgab
reverseLeftWords('lrloseumgh', 6) // umghlrlose
