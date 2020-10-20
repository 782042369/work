/*
 * @Author: 杨宏旋
 * @Date: 2020-10-20 11:31:39
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-20 14:37:00
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
 * @param {number} k
 * @return {number}
 */
var kthToLast = function (head, k) {
  let fastP = head,
    slowP,
    i = 1
  while (!!fastP) {
    if (i === k) {
      slowP = head
    }
    i++
    fastP = fastP.next
    slowP && fastP && (slowP = slowP.next)
  }
  return slowP.val
}
