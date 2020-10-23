/*
 * @Author: 杨宏旋
 * @Date: 2020-10-23 17:42:52
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-23 17:52:02
 * @Description:
 */
/**
 * @param {string[][]} paths
 * @return {string}
 */
var destCity = function (paths) {
  const map = new Map()
  for (const [x, y] of paths) {
    map.set(x, y)
  }
  for (const [x, y] of map) {
    if (!map.has(y)) {
      return y
    }
  }
}
const arr = destCity([
  ['London', 'New York'],
  ['New York', 'Lima'],
  ['Lima', 'Sao Paulo'],
])
console.log('arr: ', arr)
const brr = destCity([
  ['B', 'C'],
  ['D', 'B'],
  ['C', 'A'],
])
console.log('arr: ', brr)
