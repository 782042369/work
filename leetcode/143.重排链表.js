/*
 * @Author: 杨宏旋
 * @Date: 2020-10-20 10:53:19
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-20 11:24:24
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
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  if (!head) return null
  let tempHead = head
  let arr = []
  while (tempHead) {
    arr.push(tempHead)
    tempHead = tempHead.next
  }
  //原链表第一个节点不变，依次加入 最右边节点，最左边节点（加入后移除）
  let left = 1
  let right = arr.length - 1
  while (left <= right) {
    //如果left===right时的最后next指向自己，最后有节点置空可以排除影响
    //例子：1->4->2->3->3 最后置空 3->null，因为两个节点是同一个地址结果变成1->4->2->3->null
    //也可以 用if(left<=right)排除重复添加

    //先加右边节点
    head.next = arr[right]
    right--
    head = head.next
    //再加左边节点
    head.next = arr[left]
    left++
    head = head.next
  }
  //最后一个节点置空，避免出现环
  head.next = null
}
reorderList([1, 2, 3, 4])
