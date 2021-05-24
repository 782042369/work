/*
 * @Author: 杨宏旋
 * @Date: 2021-05-24 14:14:23
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-05-24 14:39:33
 * @Description:
 */
const handlePrimeNum = (num) => {
  if (!num || num < 2) {
    return []
  }
  if (num === 2) {
    return [2]
  }
  let i = 2
  const ret = []
  while (true) {
    if (num % i === 0) {
      if (num === i) {
        ret.push(i)
        break
      } else {
        ret.push(i)
        num = num / i
      }
    } else {
      i++
      if (i > num + 1) break
    }
  }
  return ret
}
console.log(handlePrimeNum(10000000)) // [2,2,5,5]
