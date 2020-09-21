// @Author: 杨宏旋
// @Date: 2020-09-21 11:14:11
// @LastEditors: 杨宏旋
// @LastEditTime: 2020-09-21 14:33:54
// @Description:
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const arr = []
  for (let i = 0, temp = 1; i < nums.length; i++) {
    arr[i] = temp
    temp *= nums[i]
  }
  for (let i = nums.length - 1, temp = 1; i >= 0; i--) {
    arr[i] *= temp
    temp *= nums[i]
  }
  return arr
}
productExceptSelf([1, 2, 3, 4]) // [24,12,8,6]
