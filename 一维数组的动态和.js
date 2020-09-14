// @Author: 杨宏旋
// @Date: 2020-09-14 15:52:11
// @LastEditors: 杨宏旋
// @LastEditTime: 2020-09-14 16:22:37
// @Description:
/**
 * 一维数组的动态和
 * @param {number[]} nums
 * @return {number[]}
 */
const runningSum = function (nums) {
  /**
   * 执行用时：
    84 ms
    , 在所有 JavaScript 提交中击败了
    59.33%
    的用户
    内存消耗：
    39.1 MB
    , 在所有 JavaScript 提交中击败了
    12.54%
    的用户
   */
  // const arr = []
  // for (let i = 0; i < nums.length; i++) {
  //   if (arr.length < 1) {
  //     arr.push(nums[0])
  //   } else {
  //     arr.push(nums[i] + arr[i - 1])
  //   }
  // }
  // return arr
  for (let i = 1; i < nums.length; i++) {
    nums[i] = nums[i] + nums[i - 1]
  }
  return nums
}
const nums = [1, 2, 3, 4]
// [1,3,6,10]
console.log('runningSum(nums): ', runningSum(nums))
