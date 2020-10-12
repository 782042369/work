// @Author: 杨宏旋
// @Date: 2020-09-28 10:20:56
// @LastEditors: 杨宏旋
// @LastEditTime: 2020-09-28 10:28:47
// @Description:
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function (nums) {
  // const arr = []
  // for (let i = 0; i < nums.length; i++) {
  //   let count = 0
  //   for (let j = 0; j < nums.length; j++) {
  //     if (nums[j] < nums[i]) {
  //       count += 1
  //     }
  //   }
  //   arr.push(count)
  // }
  const sortNum = [].concat(nums).sort((a, b) => a - b)
  return nums.map((item) => sortNum.indexOf(item))
}

smallerNumbersThanCurrent([8, 1, 2, 2, 3])
smallerNumbersThanCurrent([6, 5, 4, 8])
smallerNumbersThanCurrent([7, 7, 7, 7])
