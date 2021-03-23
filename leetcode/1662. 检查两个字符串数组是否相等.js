/*
 * @Author: 杨宏旋
 * @Date: 2021-03-23 15:47:28
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-03-23 15:49:14
 * @Description:
 */
/**
 * @param {string[]} word1
 * @param {string[]} word2
 * @return {boolean}
 */
var arrayStringsAreEqual = function (word1, word2) {
  return word1.join('') === word2.join('')
}
const result = arrayStringsAreEqual(['ab', 'c'], ['a', 'bc'])
console.log('result: ', result)
const result2 = arrayStringsAreEqual(['abc', 'd', 'defg'], ['abcddefg'])
console.log('result2: ', result2)
