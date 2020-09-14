// @Author: 杨宏旋
// @Date: 2020-09-14 17:05:26
// @LastEditors: 杨宏旋
// @LastEditTime: 2020-09-14 17:19:26
// @Description:
/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
const shuffle = function (nums, n) {
  const arr = []
  const srr = nums.splice(n)
  for (let i = 0; i < srr.length; i++) {
    arr.push(nums[i])
    arr.push(srr[i])
  }
  return arr
}
shuffle([2, 5, 1, 3, 4, 7], 3) // [2,3,5,4,1,7]
shuffle([1, 2, 3, 4, 4, 3, 2, 1], 4) // [1,4,2,3,3,2,4,1]
shuffle([1, 1, 2, 2], 2) // [1,2,1,2]
