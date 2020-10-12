/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  if (head === null || head.next === null) {
    return null
  }
  let slow = head.next
  let fast = head.next.next
  while (fast !== null) {
    if (fast.next === null) {
      return null
    }
    if (slow === fast) {
      break
    }
    slow = slow.next
    fast = fast.next.next
  }
  if (fast === null) {
    return null
  }
  let start = head
  while (start !== slow) {
    start = start.next
    slow = slow.next
  }
  return slow
}
