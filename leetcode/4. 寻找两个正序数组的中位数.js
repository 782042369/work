/*
 * @Author: 杨宏旋
 * @Date: 2021-05-24 18:00:33
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-05-24 18:09:13
 * @Description:
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  if ((nums1.length === nums2.length) === 0) {
    return 0
  }
  const nums = [...nums1, ...nums2].sort((a, b) => a - b)
  console.log('nums: ', nums)
  const len = nums.length
  if (len === 1) return nums[0]
  if (len % 2 === 0) {
    // 偶数个
    const midd = len / 2
    return nums[midd] + nums[midd - 1] === 0
      ? 0
      : (nums[midd] + nums[midd - 1]) / 2
  } else {
    // 奇数个
    const midd = Math.floor(len / 2)
    return nums[midd]
  }
}
console.log(findMedianSortedArrays([3], [-2, -1]))
