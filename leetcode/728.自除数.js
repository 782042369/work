/*
 * @Author: 杨宏旋
 * @Date: 2020-11-09 14:11:30
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-09 14:29:20
 * @Description:
 */
/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var selfDividingNumbers = function (left, right) {
  if (!left || !right) {
    return []
  }
  const arr = []
  for (let num = left; num <= right; num++) {
    num
      .toString()
      .split('')
      .every((ele) => num % parseInt(ele) === 0) && arr.push(num)
  }
  return arr
}

const arr = selfDividingNumbers(47, 85)
