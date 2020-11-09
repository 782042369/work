/*
 * @Author: 杨宏旋
 * @Date: 2020-11-06 16:39:27
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-06 16:46:51
 * @Description:
 */
/**
 * @param {string} s
 * @return {string}
 */
var freqAlphabets = function (s) {
  const data = new Map()
  for (let i = 1; i < 27; i++) {
    data.set(i > 9 ? `${i}#` : `${i}`, String.fromCharCode(96 + i))
  }
  const result = []
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i + 2) === '#') {
      result.push(data.get(s.slice(i, i + 3)))
      i += 2
    } else {
      result.push(data.get(s.charAt(i)))
    }
  }

  return result.join('')
}
const arr = freqAlphabets('10#11#12')
console.log('arr: ', arr)
const abrr = freqAlphabets('1326#')
console.log('arr: ', abrr)
