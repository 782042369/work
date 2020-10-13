/*
 * @Author: 杨宏旋
 * @Date: 2020-10-13 11:17:01
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-13 11:31:18
 * @Description:
 */
/**
 * @param {number} num
 * @return {number}
 */
var numberOfSteps = function (num) {
  // let count = 0
  // while (num) {
  //   if (num % 2) {
  //     num--
  //   } else {
  //     num = num >> 1
  //   }
  //   count += 1
  // }
  // return count
  return num > 1 ? 1 + (num % 2) + numberOfSteps(num >> 1) : num
}
numberOfSteps(14)
