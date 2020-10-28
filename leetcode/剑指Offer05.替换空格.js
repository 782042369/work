/*
 * @Author: 杨宏旋
 * @Date: 2020-10-28 17:01:05
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-28 17:05:19
 * @Description:
 */
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function (s) {
  // return s.replace(/\s/g, '%20')
  return s.split(' ').join('%20')
}
const arr = replaceSpace('We are happy.')
console.log('arr: ', arr)
