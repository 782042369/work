// @Author: 杨宏旋
// @Date: 2020-09-14 16:51:02
// @LastEditors: 杨宏旋
// @LastEditTime: 2020-09-14 17:04:54
// @Description: 1431.拥有最多糖果的孩子
/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
const kidsWithCandies = function (candies, extraCandies) {
  const s = Math.max(...candies) // 找到最大的数
  // const arr = []
  // for (let i = 0; i < candies.length; i++) {
  //   arr.push(extraCandies + candies[i] >= s)
  // }
  return candies.map((ele) => extraCandies + ele >= s)
}
kidsWithCandies([2, 3, 5, 1, 3], 3) // [true,true,true,false,true]
kidsWithCandies([4, 2, 1, 1, 2], 1) // [ true, false, false, false, false ]
kidsWithCandies([12, 1, 12], 10) // [true,false,true]
