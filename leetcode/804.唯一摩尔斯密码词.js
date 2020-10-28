/*
 * @Author: 杨宏旋
 * @Date: 2020-10-28 17:33:45
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-28 17:38:12
 * @Description:
 */
/**
 * @param {string[]} words
 * @return {number}
 */

var uniqueMorseRepresentations = function (words) {
  const fms = [
    '.-',
    '-...',
    '-.-.',
    '-..',
    '.',
    '..-.',
    '--.',
    '....',
    '..',
    '.---',
    '-.-',
    '.-..',
    '--',
    '-.',
    '---',
    '.--.',
    '--.-',
    '.-.',
    '...',
    '-',
    '..-',
    '...-',
    '.--',
    '-..-',
    '-.--',
    '--..',
  ]
  const res = new Map()
  for (let i = 0; i < words.length; i++) {
    let str = ''
    for (var j = 0; j < words[i].length; j++) {
      str += fms[words[i][j].charCodeAt() - 97]
    }
    if (!res.has(str)) {
      res.set(str)
    }
  }
  return res.size
}
const arr = uniqueMorseRepresentations(['gin', 'zen', 'gig', 'msg'])
console.log('arr: ', arr)
