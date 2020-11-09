/*
 * @Author: 杨宏旋
 * @Date: 2020-11-09 11:08:56
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-09 11:16:55
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
 * @return {number[]}
 */
var reversePrint = function (head) {
  const arr = []
  while (head) {
    arr.unshift(head.val)
    head = head.next
  }
  return arr
}
const arr = reversePrint({
  val: 1,
  next: {
    val: 3,
    next: {
      val: 2,
      next: null,
    },
  },
})
