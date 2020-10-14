/*
 * @Author: 杨宏旋
 * @Date: 2020-10-14 11:24:20
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-14 14:40:03
 * @Description:
 */
/**
 * @param {string[]} A
 * @return {string[]}
 */
var commonChars = function (A) {
  let ans = A[0].split('')
  for (let i = 0; i < A.length; i++) {
    let temp = A[i].split('')
    ans = ans.filter((item) => {
      const index = temp.indexOf(item)
      return index !== -1 ? (temp[index] = ' ') : false
    })
  }
  console.log('ans: ', ans)
  return ans
}
commonChars(['bella', 'label', 'roller'])
commonChars(['cool', 'lock', 'cook'])
commonChars([
  'acabcddd',
  'bcbdbcbd',
  'baddbadb',
  'cbdddcac',
  'aacbcccd',
  'ccccddda',
  'cababaab',
  'addcaccd',
])
