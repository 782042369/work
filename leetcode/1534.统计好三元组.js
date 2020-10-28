/*
 * @Author: 杨宏旋
 * @Date: 2020-10-23 17:59:57
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-26 14:11:27
 * @Description:
 */
/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var countGoodTriplets = function (arr, a, b, c) {
  var l = arr.length,
    count = 0
  const brr = []
  for (var i = 0; i < l - 2; i++) {
    for (var j = i + 1; j < l - 1; j++) {
      for (var k = j + 1; k < l; k++) {
        if (
          Math.abs(arr[i] - arr[j]) <= a &&
          Math.abs(arr[j] - arr[k]) <= b &&
          Math.abs(arr[i] - arr[k]) <= c
        ) {
          brr.push([arr[i], arr[j], arr[k]])
          count++
        }
      }
    }
  }
  return count
}
countGoodTriplets([3, 0, 1, 1, 9, 7], 7, 2, 3)
