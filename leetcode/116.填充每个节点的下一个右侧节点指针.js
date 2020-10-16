/*
 * @Author: 杨宏旋
 * @Date: 2020-10-15 10:43:44
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-15 16:33:22
 * @Description:
 */
// @Author: 杨宏旋
// @Date: 2020-10-15 10:43:44
// @LastEditors: 杨宏旋
// @LastEditTime: 2020-10-15 10:46:21
// @Description:
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
  var s = root ? [root] : [],
    l = 0
  while (s.length) {
    l = s.length
    while (l--) {
      var n = s.shift()
      n.next = l ? s[0] : null
      if (n.left) s.push(n.left, n.right)
    }
  }
  return root
}
connect({
  $id: '1',
  left: {
    $id: '2',
    left: {
      $id: '3',
      left: null,
      next: null,
      right: null,
      val: 4,
    },
    next: null,
    right: {
      $id: '4',
      left: null,
      next: null,
      right: null,
      val: 5,
    },
    val: 2,
  },
  next: null,
  right: {
    $id: '5',
    left: {
      $id: '6',
      left: null,
      next: null,
      right: null,
      val: 6,
    },
    next: null,
    right: {
      $id: '7',
      left: null,
      next: null,
      right: null,
      val: 7,
    },
    val: 3,
  },
  val: 1,
})
