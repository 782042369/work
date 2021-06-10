/*
 * @Author: 杨宏旋
 * @Date: 2021-06-01 12:09:06
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-06-01 12:11:01
 * @Description:
 */
function test(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
  }
  return arr
}
console.log(test([1, 2, 5, 8, 0, 10, 3]))
