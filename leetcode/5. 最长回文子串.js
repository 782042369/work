// /*
//  * @Author: 杨宏旋
//  * @Date: 2021-05-25 10:31:57
//  * @LastEditors: 杨宏旋
//  * @LastEditTime: 2021-05-25 13:55:47
//  * @Description:
//  */
// /**
//  * @param {string} s
//  * @return {string}
//  */
// var longestPalindrome = function (s) {
//   const len = s.length
//   if (!s || len < 2) {
//     return s
//   }
//   let res = ''
//   for (let i = 0; i < len; i++) {
//     // 回文子串长度是奇数
//     helper(i, i)
//     // 回文子串长度是偶数
//     helper(i, i + 1)
//   }

//   function helper(m, n) {
//     while (m >= 0 && n < len && s[m] == s[n]) {
//       m--
//       n++
//     }
//     // 注意此处m,n的值循环完后  是恰好不满足循环条件的时刻
//     // 此时m到n的距离为n-m+1，但是mn两个边界不能取 所以应该取m+1到n-1的区间  长度是n-m-1
//     if (n - m - 1 > res.length) {
//       // slice也要取[m+1,n-1]这个区间
//       res = s.slice(m + 1, n)
//     }
//   }
//   return res
// }
// console.log(longestPalindrome('aca'))
// const handle = (arr) => {
//   const ret = []
//   let i = 0
//   ret[i] = [arr[0]]
//   arr
//     .sort((a, b) => a - b)
//     .reduce(
//       (pre, cur) => {
//         // const len = pre.length - 1
//         // const num = pre[len]
//         // if (num.length === 0) {
//         //   pre[0].push(cur)
//         // } else {
//         //   cur - num[num.length - 1] === 1
//         //     ? pre[len].push(cur)
//         //     : (pre[len + 1] = [cur])
//         // }
//         // return pre
//         cur - pre === 1 ? ret[i].push(cur) : (ret[++i] = [cur])
//         return cur
//       }
//       // [[]]
//     )
//   return ret
// }
// console.time('1')
// console.log(
//   'handle([1, 2, 3, 5, 7, 8, 9]): ',
//   handle([-1, 0, 1, 2, 4, 3, 5, 7, 8, 9])
// )
// console.timeEnd('1')
function handle() {
  return [...arguments].reduce((pre, cur) => pre.concat(cur), [])
}
console.log(
  'handle([[-1, 0, 1, 2, 3, 4], [5], [7, 8, 9]]): ',
  handle([-1, 0, 1, 2, 3, 4], [5], [7, 8, 9])
)
