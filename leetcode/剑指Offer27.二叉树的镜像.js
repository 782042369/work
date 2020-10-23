/*
 * @Author: 杨宏旋
 * @Date: 2020-10-20 14:37:54
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-23 16:40:55
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
var mirrorTree = function (root) {
  if (root) {
    let stack = []
    stack.push(root)
    while (stack.length > 0) {
      let node = stack.pop()
      ;[node.left, node.right] = [node.right, node.left]
      if (node.left) {
        stack.push(node.left)
      }
      if (node.right) {
        stack.push(node.right)
      }
    }
  }
  return root
}
