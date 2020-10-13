// @Author: 杨宏旋
// @Date: 2020-10-13 18:30:29
// @LastEditors: 杨宏旋
// @LastEditTime: 2020-10-13 18:31:16
// @Description:
/**
 * @param {number[][]} points
 * @return {number}
 */
var minTimeToVisitAllPoints = function (points) {
  let time = 0
  for (let i = 0; i < points.length - 1; i++) {
    // x坐标相减
    const a = Math.abs(points[i][0] - points[i + 1][0])
    // y坐标相减
    const b = Math.abs(points[i][1] - points[i + 1][1])
    // 取最大，差值即为时间值
    time += a > b ? a : b
  }
  return time
}
minTimeToVisitAllPoints([
  [1, 1],
  [3, 4],
  [-1, 0],
])
