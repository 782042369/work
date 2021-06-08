/*
 * @Author: 杨宏旋
 * @Date: 2021-05-24 16:04:13
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-05-24 16:16:03
 * @Description:
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
var swapNodes = function (head, k) {
  var dummy = new ListNode(0)
  dummy.next = head
  var i = 0,
    slow = (fast = dummy),
    nodeK
  while (i++ < k) {
    fast = fast.next
    console.log('fast: ', fast)
  }
  nodeK = fast
  while (fast) {
    fast = fast.next
    slow = slow.next
  }
  i = nodeK.val
  nodeK.val = slow.val
  slow.val = i
  return head
}
// [1,2,3,4,5]
const arr = swapNodes(
  {
    val: 1,
    next: {
      val: 2,
      next: {
        val: 3,
        next: {
          val: 4,
          next: {
            val: 5,
            next: null,
          },
        },
      },
    },
  },
  1
)
console.log('arr: ', arr)
