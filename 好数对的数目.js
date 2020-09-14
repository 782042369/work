/*
 * @Author: 杨宏旋
 * @Date: 2020-09-14 16:13:19
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-09-14 16:21:53
 * @Description: 好数对的数目
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
const numIdenticalPairs = function (nums) {
  if (!nums || nums.length === 0) return
  let j = 0
  let count = 0
  for (let i = 0; i < nums.length; j++) {
    if (j === nums.length) {
      i++
      j = 0
    }
    i < j && nums[i] === nums[j] && count++
  }
  return count
}
numIdenticalPairs([1, 2, 3, 1, 1, 3]) // 4
numIdenticalPairs([1, 1, 1, 1]) // 6
numIdenticalPairs([1, 2, 3]) // 0
