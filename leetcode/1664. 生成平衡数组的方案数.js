/*
 * @Author: 杨宏旋
 * @Date: 2021-03-23 16:24:07
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-03-23 16:46:45
 * @Description:
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var waysToMakeFair = function (nums) {
  let res = 0,
    n = nums.length
  let sum_odd = 0, // 奇数和
    sum_even = 0, // 偶数和
    left_odd = 0,
    left_even = 0,
    right_odd = 0,
    right_even = 0
  //初始化sum_odd,sum_even
  for (let i = 0; i < n; i++) {
    i % 2 ? (sum_odd += nums[i]) : (sum_even += nums[i])
  }
  for (let i = 0; i < n; i++) {
    //计算left_odd,left_even
    i % 2 ? (left_odd += nums[i]) : (left_even += nums[i])
    //计算right_odd,right_even
    right_odd = sum_even - left_even
    right_even = sum_odd - left_odd
    //减掉元素本身
    i % 2 ? (right_odd -= nums[i]) : (right_even -= nums[i])
    //判等
    if (left_odd + right_odd == left_even + right_even) res++
  }
  return res
}
const result = waysToMakeFair([2, 1, 6, 4])
console.log('result: ', result)
// const result2 = waysToMakeFair([1, 1, 1])
// console.log('result2: ', result2)
// const result3 = waysToMakeFair([1, 2, 3])
// console.log('result3: ', result3)
