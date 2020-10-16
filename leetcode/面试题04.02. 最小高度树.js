/*
 * @Author: 杨宏旋
 * @Date: 2020-10-16 16:24:57
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-16 17:31:27
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
  if (nums.length === 0) {
    return null
  }
  let m = parseInt(nums.length / 2)
  let root = new TreeNode(nums[m])
  root.left = sortedArrayToBST(nums.slice(0, m))
  root.right = sortedArrayToBST(nums.slice(m + 1))
  return root
}
const arr = sortedArrayToBST([-10, -3, 0, 5, 9])
