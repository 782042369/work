/*
 * @Author: 杨宏旋
 * @Date: 2020-11-09 11:19:29
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-09 11:50:12
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
 * @return {ListNode}
 */
var reverseList = function (head) {
  var prev = null,
    cur = head,
    temp
  while (cur) {
    temp = cur.next
    // 修改前先记住下一个节点
    cur.next = prev
    // 改别指向，第一个节点prev是null,
    prev = cur
    // 记录前一个节点，供下次循环使用
    cur = temp
    // cur通过temp指向下一节点
  }
  return prev // cur会多循环直到null
}
// 1->2->3->4->5->NULL
const arr = reverseList({
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
})
