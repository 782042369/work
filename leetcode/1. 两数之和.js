/*
 * @Author: 杨宏旋
 * @Date: 2021-05-24 16:58:33
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-05-24 17:08:29
 * @Description:
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (!map.has(target - nums[i])) {
      map.set(nums[i], i)
    } else {
      return [map.get(target - nums[i]), i]
    }
  }
  return []
}
console.log('twoSum([2, 7, 11, 15], 9): ', twoSum([2, 7, 11, 15], 9))
console.log('twoSum([3,2,4], ): ', twoSum([3, 2, 4], 6))
