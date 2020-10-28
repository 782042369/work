/*
 * @Author: 杨宏旋
 * @Date: 2020-10-28 16:38:34
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-28 16:50:12
 * @Description:
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  // var aMax = nums[0]
  // var bMax = nums[1]

  // for (var i = 2; i < nums.length; i++) {
  //   if (aMax > bMax) {
  //     nums[i] > bMax && (bMax = nums[i])
  //   } else {
  //     nums[i] > aMax && (aMax = nums[i])
  //   }
  // }
  let aMax = Math.max(...nums)
  let index = nums.indexOf(aMax)
  nums.splice(index, 1)
  let bMax = Math.max(...nums)
  return (aMax - 1) * (bMax - 1)
}
const arr = maxProduct([3, 4, 5, 2])
console.log('arr: ', arr)
const brr = maxProduct([1, 5, 4, 5])
console.log('brr: ', brr)
const crr = maxProduct([10, 2, 5, 2])
console.log('crr: ', crr)
