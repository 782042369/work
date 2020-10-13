/*
 * @Author: 杨宏旋
 * @Date: 2020-09-28 16:04:49
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-13 11:15:51
 * @Description:
 */
/**
 * @param {number[]} arr
 * @return {number}
 */
var sumOddLengthSubarrays = function (arr) {
  let sum = 0
  let index = 1
  while (index <= arr.length) {
    for (let i = 0; i <= arr.length - index; i++) {
      let num = 0
      for (let j = 0; j < index; j++) {
        num += arr[i + j]
      }
      sum += num
    }
    index += 2
  }
  return sum
}
sumOddLengthSubarrays([1, 4, 2, 5, 3])
sumOddLengthSubarrays([1, 2])
