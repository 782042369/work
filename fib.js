/*
 * @Author: 杨宏旋
 * @Date: 2020-05-22 10:04:57
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-05-22 10:26:08
 * @Description: 斐波那契函数
 */
const fib1 = function (n) {
  if (n <= 2) {
    return 1
  }
  return fib1(n - 1) + fib1(n - 2)
}
// 尾递归
const fib2 = function (n, res1 = 1, res2 = 1) {
  if (n <= 2) {
    return res2
  } else {
    return fib2(n - 1, res2, res1 + res2)
  }
}
// 缓存
const fib3 = function (n) {
  const cache = []
  return helper(cache, n)
}
const helper = function (cache, n) {
  if (n === 1 || n === 2) {
    return 1
  }
  if (cache[n]) return cache[n]
  cache[n] = helper(cache, n - 1) + helper(cache, n - 2)
  return cache[n]
}
const fib4 = function (n) {
  const dp = []
  dp[1] = dp[2] = 1
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  console.log('dp: ', dp)
  return dp[n]
}
console.time('fib')
console.log('fib: ', fib4(45))
console.timeEnd('fib')
