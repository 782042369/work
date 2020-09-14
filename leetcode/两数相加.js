// @Author: 杨宏旋
// @Date: 2020-01-18 10:39:57
// @LastEditors: 杨宏旋
// @LastEditTime: 2020-09-14 16:22:03
// @Description: 两数相加
//
// 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
// 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
// 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
// 示例：
// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807
//
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function (l1, l2) {
  function ListNode(val) {
    this.val = val
    this.next = null
  }
  let carry = 0
  let start
  let node
  while (l1 || l2 || carry) {
    let val = carry
    l1 && (val += l1.val)
    l2 && (val += l2.val)
    carry = 0
    if (val >= 10) {
      val = val - 10
      carry = 1
    }
    const nod = new ListNode(val)
    if (!start) {
      start = nod
      node = nod
    } else {
      node.next = nod
      node = nod
    }
    l1 && (l1 = l1.next)
    l2 && (l2 = l2.next)
  }
  console.log('start: ', start)
  return start
}
const la = {}
la.val = [2, 4, 3]
const lb = {}
lb.val = [5, 6, 4]

addTwoNumbers(la, lb)
