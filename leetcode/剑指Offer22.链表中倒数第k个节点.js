/*
 * @Author: 杨宏旋
 * @Date: 2020-10-23 16:45:17
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-23 17:00:30
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
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
  let fast = head
  let slow = head

  let i = 0
  while (i++ < k) {
    fast = fast.next
  }
  console.log('fast: ', fast)
  console.log('slow: ', slow)
  while (fast) {
    fast = fast.next
    console.log('fast: ', fast)
    slow = slow.next
    console.log('slow: ', slow)
  }

  return slow
}
getKthFromEnd(
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
  2
)
