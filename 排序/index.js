/*
 * @Author: 杨宏旋
 * @Date: 2021-05-21 13:42:33
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-05-21 14:08:09
 * @Description:
 */
const quickSort = (arr) => {
  if (!arr) {
    console.error('data is array')
  }
  const len = arr.length
  const pos = (arr, left, right) => {
    let contrast = arr[right] // 对比基准
    let storeIndex = left
    for (let i = left; i < right; i++) {
      if (arr[i] < contrast) {
        ;[arr[storeIndex], arr[i]] = [arr[i], arr[storeIndex]]
        storeIndex++
      }
    }
    ;[arr[storeIndex], arr[right]] = [arr[right], arr[storeIndex]]
    return storeIndex
  }
  const handleSort = (arr, left, right) => {
    if (left > right) {
      return
    }
    const posIndex = pos(arr, left, right)
    handleSort(arr, posIndex + 1, right)
    handleSort(arr, left, posIndex - 1)
  }
  handleSort(arr, 0, len - 1)
  return arr
}
console.log(quickSort([1, 11, 3, 70, 4, 50, 20, 7, 6, 2]))
