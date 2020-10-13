/*
 * @Author: 杨宏旋
 * @Date: 2020-10-13 11:04:44
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-13 11:11:30
 * @Description:
 */
/**
 * @param {number[]} nums
 * @param {number[]} index
 * @return {number[]}
 */
var createTargetArray = function (nums, index) {
  const arr = []
  for (let i = 0; i < nums.length; i++) {
    arr.splice(index[i], 0, nums[i])
  }
  return arr
}
createTargetArray([0, 1, 2, 3, 4], [0, 1, 2, 2, 1])
