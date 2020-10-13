/*
 * @Author: 杨宏旋
 * @Date: 2020-10-12 10:03:49
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-12 10:16:05
 * @Description:
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var decompressRLElist = function (nums) {
  const arr = []
  for (let i = 0; i < nums.length; i++) {
    i % 2 !== 0 && arr.push(...new Array(nums[i - 1]).fill(nums[i]))
  }
  return arr
}
decompressRLElist([1, 2, 3, 4])
