/*
 * @Author: 杨宏旋
 * @Date: 2021-03-23 15:18:21
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-03-23 15:40:46
 * @Description:
 */
/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
  const memo = new Array(n + 1)
  const dfs = (n) => {
    if (memo[n]) return memo[n]
    let res = 0
    for (let i = 1; i <= n - 1; i++) {
      res = Math.max(res, i * (n - i), i * dfs(n - i))
    }
    return (memo[n] = res)
  }
  return dfs(n)
}
// n 不小于 2 且不大于 58
const result = integerBreak(7)
console.log('result: ', result)
