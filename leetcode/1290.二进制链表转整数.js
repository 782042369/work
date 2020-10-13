/*
 * @Author: 杨宏旋
 * @Date: 2020-10-13 12:26:41
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-13 12:28:48
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
 * @param {ListNode} head
 * @return {number}
 */
var getDecimalValue = function (head) {
  let str = ''
  let node = head
  while (node) {
    str += node.val
    node = node.next
  }
  return parseInt(str, 2)
}
