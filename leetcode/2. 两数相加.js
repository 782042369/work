/*
 * @Author: 杨宏旋
 * @Date: 2021-05-24 17:08:59
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-05-24 17:22:07
 * @Description:
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let addOne = 0
  let sum = new ListNode(0)
  let head = sum
  while (addOne || l1 || l2) {
    let val1 = l1 !== null ? l1.val : 0
    let val2 = l2 !== null ? l2.val : 0
    let r1 = val1 + val2 + addOne
    addOne = r1 >= 10 ? 1 : 0
    sum.next = new ListNode(r1 % 10)
    sum = sum.next
    if (l1) l1 = l1.next
    if (l2) l2 = l2.next
  }
  return head.next
}
const l1 = {
    val: 2,
    next: {
      val: 4,
      next: {
        val: 3,
        next: null,
      },
    },
  },
  l2 = {
    val: 5,
    next: {
      val: 6,
      next: {
        val: 4,
        next: null,
      },
    },
  }
console.log('addTwoNumbers(): ', addTwoNumbers(l2, l2))
