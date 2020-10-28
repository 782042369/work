/*
 * @Author: 杨宏旋
 * @Date: 2020-10-28 15:34:53
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-28 15:49:16
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
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
var rangeSumBST = function (root, L, R) {
  return (
    root &&
    rangeSumBST(root.left, L, R) +
      rangeSumBST(root.right, L, R) +
      (L <= root.val && R >= root.val && root.val)
  )
}
const root = {
  val: 10,
  left: {
    val: 5,
    left: { val: 3, left: null, right: null },
    right: { val: 7, left: null, right: null },
  },
  right: {
    val: 15,
    left: null,
    right: { val: 18, left: null, right: null },
  },
}
const arr = rangeSumBST(root, 7, 15)
console.log(arr)
