/*
 * @Author: 杨宏旋
 * @Date: 2020-11-06 15:33:19
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-06 15:40:52
 * @Description:
 */
/**
 * @param {number} n
 * @param {number} m
 * @param {number[][]} indices
 * @return {number}
 */
var oddCells = function (n, m, indices) {
  // 一. 生成 n * m 的矩阵
  let arr = Array.apply(null, Array(n)).map((t) => Array(m).fill(0))
  // 二. 遍历坐标点, 坐标点在的 横竖 都加上1
  for (let n of indices) {
    let [i, j] = n
    arr[i] = arr[i].map((t) => ++t)
    arr.forEach((r) => r[j]++)
  }
  // 三.  得到增量操作后的矩阵nm  遍历 然后 筛选出奇数
  let res = 0
  for (let item of arr) {
    res += item.filter((t) => t % 2 === 1).length
  }
  return res
}

let n = 2,
  m = 3,
  indices = [
    [0, 1],
    [1, 1],
  ]
const arr = oddCells(n, m, indices)
console.log('arr: ', arr)
