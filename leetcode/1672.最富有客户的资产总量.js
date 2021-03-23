/*
 * @Author: 杨宏旋
 * @Date: 2021-03-23 14:23:26
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-03-23 14:38:53
 * @Description:
 */
/**
 * @param {number[][]} accounts
 * @return {number}
 */
var maximumWealth = function (accounts) {
  // const num = []
  // for (let i = 0; i < accounts.length; i++) {
  //   num.push(accounts[i].reduce((prev, curr) => prev + curr))
  // }
  // return Math.max(...num)

  return Math.max(
    ...accounts.map((customer) => customer.reduce((prev, cur) => prev + cur, 0))
  )
}
const result = maximumWealth([
  [1, 2, 3],
  [3, 2, 1],
])

console.log('result: ', result)
