/* eslint-disable no-throw-literal */
// @Author: 杨宏旋
// @Date: 2020-09-28 10:42:08
// @LastEditors: 杨宏旋
// @LastEditTime: 2020-09-28 10:47:01
// @Description:
/**
 * @param {string[]} votes
 * @return {string}
 */
var rankTeams = function (votes) {
  if (!votes || !votes.length === 0) {
    return ''
  }
  const ans = votes[0].split('')
  const map = {}
  // 获取投票人数
  for (let i = 0; i < votes.length; i++) {
    let rank = 1
    const every = votes[i]
    for (let j = 0; j < every.length; j++) {
      if (!map[rank]) {
        map[rank] = {}
      }
      const c = every.charAt(j)
      if (!map[rank][c]) {
        map[rank][c] = 1
      } else {
        map[rank][c]++
      }
      rank++
    }
  }
  ans.sort((a, b) => {
    let rank = 1
    let res = 0
    while (res === 0) {
      if (!map[rank]) {
        if (a < b) res = -1
        if (a > b) res = 1
      } else {
        const l = map[rank][a] || 0
        const r = map[rank][b] || 0
        if (l > r) res = -1
        if (l < r) res = 1
      }
      rank++
    }
    return res
  })
  return ans.join('')
}
const s1 = rankTeams(['ABC', 'ACB', 'ABC', 'ACB', 'ACB'])
console.log('s1: ', s1)
const s2 = rankTeams(['WXYZ', 'XYZW'])
console.log('s2: ', s2)
const s3 = rankTeams(['ZMNAGUEDSJYLBOPHRQICWFXTVK'])
console.log('s3: ', s3)
const s4 = rankTeams(['BCA', 'CAB', 'CBA', 'ABC', 'ACB', 'BAC'])
console.log('s4: ', s4)
const s5 = rankTeams(['M', 'M', 'M', 'M'])
console.log('s5: ', s5)
