/*
 * @Author: 杨宏旋
 * @Date: 2020-11-06 16:49:29
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-09 10:59:45
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
var postorder = function (root) {
  if (!root) {
    return []
  }
  let res = [root.val]
  let queue = root.children
  while (queue.length > 0) {
    let node = queue.pop()
    if (node != null) {
      res.unshift(node.val)
      if (node.children) {
        queue.push(...node.children)
      }
    }
  }
  return res
}
