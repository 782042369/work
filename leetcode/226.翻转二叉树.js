/*
 * @Author: 杨宏旋
 * @Date: 2020-10-28 16:23:04
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-28 16:36:21
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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (!root) {
    return root
  }
  invertTree(root.left)
  invertTree(root.right)
  ;[root.left, root.right] = [root.right, root.left]

  return root
}

const root = {
  val: 4,
  left: {
    val: 2,
    left: {
      val: 1,
      left: null,
      right: null,
    },
    right: {
      val: 3,
      left: null,
      right: null,
    },
  },
  right: {
    val: 7,
    left: {
      val: 6,
      left: null,
      right: null,
    },
    right: {
      val: 9,
      left: null,
      right: null,
    },
  },
}
const arr = invertTree(root)
console.log('arr: ', arr)
