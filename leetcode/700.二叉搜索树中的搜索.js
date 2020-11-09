/*
 * @Author: 杨宏旋
 * @Date: 2020-11-09 11:51:03
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-09 12:00:15
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
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
  if (!root) return root
  if (root.val == val) return root
  return root.val < val ? searchBST(root.right, val) : searchBST(root.left, val)
}
const arr = searchBST(
  {
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
      left: null,
      right: null,
    },
  },
  2
)
console.log('arr: ', arr)
