/*
 * @Author: 杨宏旋
 * @Date: 2020-10-13 17:32:34
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-13 17:39:25
 * @Description:
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumbers = function (nums) {
  let count = 0
  for (let i = 0; i < nums.length; i++) {
    String(nums[i]).length % 2 === 0 && (count += 1)
  }
  nums.reduce((a, x) => (a += ~~Math.log10(x) % 2), 0)
  return count
}
findNumbers([12, 345, 2, 6, 7896])
