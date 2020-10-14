/*
 * @Author: 杨宏旋
 * @Date: 2020-10-14 14:40:27
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-14 14:52:32
 * @Description:
 */
/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number} queryTime
 * @return {number}
 */
var busyStudent = function (startTime, endTime, queryTime) {
  // let count = 0
  // for (let i = 0; i < startTime.length; i++) {
  //   if (startTime[i] <= queryTime && endTime[i] >= queryTime) {
  //     count += 1
  //   }
  // }
  // return count
  return startTime.reduce(
    (result, start, i) =>
      start <= queryTime && endTime[i] >= queryTime ? result + 1 : result,
    0
  )
}
busyStudent([1, 2, 3], [3, 2, 7], 4)
