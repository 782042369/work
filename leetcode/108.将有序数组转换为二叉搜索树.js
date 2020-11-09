/*
 * @Author: 杨宏旋
 * @Date: 2020-11-06 16:03:39
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-06 16:11:11
 * @Description:
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}
var sortedArrayToBST = function (nums) {
  if (nums.length === 0) return null
  const mid = Math.floor(nums.length / 2)
  const result = new TreeNode(nums[mid])
  const left = nums.slice(0, mid)
  const right = nums.slice(mid + 1, nums.length)
  result.left = sortedArrayToBST(left)
  result.right = sortedArrayToBST(right)
  return result
}

const arr = sortedArrayToBST([-10, -3, 0, 5, 9])
console.log('arr: ', JSON.stringify(arr))
