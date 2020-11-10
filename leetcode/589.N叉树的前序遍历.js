/*
 * @Author: 杨宏旋
 * @Date: 2020-11-06 16:49:29
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-09 18:27:08
 * @Description:
 */
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function (root) {
  if (!root) {
    return []
  }
  let res = [root.val]
  let queue = root.children
  while (queue.length > 0) {
    let node = queue.shift()
    if (node != null) {
      res.push(node.val)
      if (node.children) {
        queue.unshift(...node.children)
      }
    }
  }
  return res
}
