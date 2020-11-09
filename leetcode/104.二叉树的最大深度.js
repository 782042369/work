/*
 * @Author: 杨宏旋
 * @Date: 2020-11-06 15:56:02
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-06 16:03:31
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
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) {
    return 0
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}
const arr = maxDepth({
  val: 3,
  left: {
    val: 9,
    left: null,
    right: null,
  },
  right: {
    val: 20,
    left: {
      val: 15,
      left: null,
      right: null,
    },
    right: {
      val: 7,
      left: null,
      right: null,
    },
  },
})
console.log('arr: ', arr)
