/*
 * @Author: 杨宏旋
 * @Date: 2020-10-23 17:07:00
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-23 17:18:16
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
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function (t1, t2) {
  if (!t1 || !t2) {
    return t1 || t2
  }
  t1.val += t2.val
  t1.left = mergeTrees(t1.left, t2.left)
  t1.right = mergeTrees(t1.right, t2.right)
  return t1
}
const arr = {
  val: 1,
  left: {
    val: 3,
    left: {
      val: 5,
      left: null,
      right: null,
    },
    right: null,
  },
  right: {
    val: 2,
    left: null,
    right: null,
  },
}
const brr = {
  val: 2,
  left: {
    val: 1,
    left: null,
    right: {
      val: 4,
      left: null,
      right: null,
    },
  },
  right: {
    val: 3,
    left: null,
    right: {
      val: 7,
      left: null,
      right: null,
    },
  },
}
const a = mergeTrees(arr, brr)
console.log('a: ', a)
