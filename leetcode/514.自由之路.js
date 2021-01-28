/*
 * @Author: 杨宏旋
 * @Date: 2020-11-11 11:21:27
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-11-11 11:53:45
 * @Description:
 */
/**
 * @param {string} ring
 * @param {string} key
 * @return {number}
 */
const getIdx = (str, v) => str.codePointAt(v) - 'a'.codePointAt(0)
var findRotateSteps = function (ring, key) {
  const n = ring.length,
    m = key.length
  const pos = new Array(26).fill(0).map((v) => [])
  for (let i = 0; i < n; ++i) {
    pos[getIdx(ring, i)].push(i)
  }
  console.log('pos: ', pos)
  const dp = new Array(m)
    .fill(0)
    .map((v) => new Array(n).fill(Number.MAX_SAFE_INTEGER))

  for (const i of pos[getIdx(key, 0)]) {
    dp[0][i] = Math.min(i, n - i) + 1
  }
  for (let i = 1; i < m; ++i) {
    for (const j of pos[getIdx(key, i)]) {
      for (const k of pos[getIdx(key, i - 1)]) {
        dp[i][j] = Math.min(
          dp[i][j],
          dp[i - 1][k] + Math.min(Math.abs(j - k), n - Math.abs(j - k)) + 1
        )
      }
    }
  }
  return dp[m - 1].reduce(
    (pre, cur) => Math.min(pre, cur),
    Number.MAX_SAFE_INTEGER
  )
}
const ring = 'godding',
  key = 'gd'
const arr = findRotateSteps(ring, key)
console.log('arr: ', arr)
