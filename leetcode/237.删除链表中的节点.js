/*
 * @Author: 杨宏旋
 * @Date: 2020-09-16 17:02:49
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-23 17:05:21
 * @Description:
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
  node.val = node.next.val
  node.next = node.next.next
}
const a = {
  val: 5,
  next: {
    val: 1,
    next: {
      val: 9,
      next: null,
    },
  },
}
deleteNode(a)
console.log('a: ', a)
