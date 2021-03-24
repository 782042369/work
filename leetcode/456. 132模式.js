/*
 * @Author: 杨宏旋
 * @Date: 2021-03-24 11:30:07
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-03-24 14:05:47
 * @Description:
 */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function (nums) {
  let minIdx = 0,
    len = nums.length,
    stack = []
  while (minIdx < len) {
    // 每次循环，都要记得清空之前的栈内容
    stack = []
    for (let i = minIdx; i < len; i++) {
      // 若栈无内容，那么默认当前值就是最小值，压入栈即可。
      if (!stack.length) stack[0] = nums[i]
      // 若当前数大于栈顶（stack[0]），并且栈的长度为1，
      // 则将该数作为最大值(stack[1])，压入栈。
      if (nums[i] > stack[0] && stack.length === 1) stack[1] = nums[i]
      // 若当前数大于最大值(stack[1]) 并且栈长度为 2，
      // 并且当前索引并非数组最后一位，则将最大值替换即可。
      // 这步操作是核心思想！
      if (nums[i] > stack[1] && stack.length === 2 && i !== len - 1)
        stack[1] = nums[i]
      // 如果此时找到了符合条件的中间值，返回 true 即可
      if (nums[i] > stack[0] && nums[i] < stack[1]) return true
      // 如果最小值已经位于数组倒数第二位，则绝不可能找到符合条件的最大值和中间值
      if (minIdx === len - 2) return false
    }
    // 当前最小值时，找不到符合条件的最大值和中间值
    // 最小值往右移动一位，继续找最大值和中间值
    minIdx++
  }
  // 最终还是找不到，当前数组无符合 132 模式的3个值
  return false
}
const result = find132pattern([3, 1, 4, 2])
console.log('result: ', result)
