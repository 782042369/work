/*
 * @Author: 杨宏旋
 * @Date: 2020-11-09 15:24:54
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-09 15:35:27
 * @Description:
 */
/**
 * @param {number[]} target
 * @param {number[]} arr
 * @return {boolean}
 */
var canBeEqual = function (target, arr) {
  if (!target || !arr || target.length !== arr.length) {
    return false
  }
  for (let i = 0; i < arr.length; i++) {
    let index = target.indexOf(arr[i])
    if (!target.includes(arr[i])) {
      return false
    }
    target.splice(index, 1)
  }
  return true
}
const arr = canBeEqual([1, 2, 2, 3], [1, 1, 2, 3])
console.log('arr: ', arr)
const brr = canBeEqual([3, 1, 1, 2], [1, 1, 2, 3])
console.log('brr: ', brr)
