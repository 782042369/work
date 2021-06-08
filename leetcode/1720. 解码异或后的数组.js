/*
 * @Author: 杨宏旋
 * @Date: 2021-05-24 15:57:56
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-05-24 16:03:55
 * @Description:
 */
/**
 * @param {number[]} encoded
 * @param {number} first
 * @return {number[]}
 */
var decode = function (encoded, first) {
  const n = encoded.length + 1
  const ans = [first]
  for (let i = 1; i < n; i++) {
    ans[i] = ans[i - 1] ^ encoded[i - 1]
  }
  return ans
}
console.log('decode([1, 2, 3], 1): ', decode([1, 2, 3], 1))
console.log('decode([1, 2, 3], 1): ', decode([6, 2, 7, 3], 4))
