/*
 * @Author: 杨宏旋
 * @Date: 2020-10-26 14:25:15
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-26 14:28:09
 * @Description:
 */
/**
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function (moves) {
  let x = 0
  let y = 0
  for (let i = 0; i < moves.length; i++) {
    switch (moves[i]) {
      case 'U':
        y++
        break
      case 'D':
        y--
        break
      case 'L':
        x--
        break
      case 'R':
        x++
        break
    }
  }
  return x === 0 && y === 0
}
const arr = judgeCircle('UD')
console.log('arr: ', arr)
const brr = judgeCircle('LL')
console.log('brr: ', brr)
