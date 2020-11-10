/*
 * @Author: 杨宏旋
 * @Date: 2020-11-09 17:58:52
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-09 18:07:09
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
 * @param {number} k
 * @return {number}
 */
var kthLargest = function (root, k) {
  let num = 0
  let res = null
  const dfs = (node) => {
    if (!node) return null
    dfs(node.right)
    num++
    if (num === k) {
      res = node.val
      return
    }
    dfs(node.left)
  }
  dfs(root)
  return res
}
const arr = kthLargest(
  {
    val: 3,
    left: {
      val: 1,
      left: null,
      right: {
        val: 2,
        left: null,
        right: null,
      },
    },
    right: {
      val: 4,
      left: null,
      right: null,
    },
  },
  1
)
console.log('arr: ', arr)
