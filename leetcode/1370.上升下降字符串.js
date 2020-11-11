/*
 * @Author: 杨宏旋
 * @Date: 2020-11-10 16:42:18
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-11 09:51:38
 * @Description:
 */
/**
 * @param {string} s
 * @return {string}
 */
var sortString = function (s) {
  var list = new Array(26).fill(0)
  var end = false
  var result = ''
  for (var i = 0; i < s.length; i++) {
    let index = s.charCodeAt(i) - 97
    list[index]++
  }
  while (!end) {
    end = true
    for (var i = 0; i < list.length; i++) {
      if (list[i]) {
        result += String.fromCharCode(i + 97)
        console.log('result: ', result)
        list[i]--
      }
    }
    for (var i = list.length - 1; i > -1; i--) {
      if (list[i]) {
        result += String.fromCharCode(i + 97)
        list[i]--
      }
      if (list[i] > 0) {
        end = false
      }
    }
  }
  return result
}
const arr = sortString('vrwhhkaydscvllvcsdyakhhwrv')
console.log('arr: ', arr)
// acdhklrsvwy ywvsrlkhdca hvvh
// acdhklrsvwy ywvsrlkhdca vvhh

// const brr = sortString('aaaabbbbcccc')
// console.log('brr: ', brr)

// const crr = sortString('rat')
// console.log('crr: ', crr)
