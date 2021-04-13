/*
 * @Author: 杨宏旋
 * @Date: 2021-03-31 17:09:43
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-03-31 17:09:44
 * @Description:
 */
Promise.resolve()
  .then(() => {
    console.log(0)
    return Promise.resolve(4)
  })
  .then((res) => {
    console.log(res)
  })

Promise.resolve()
  .then(() => {
    console.log(1)
  })
  .then(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(5)
  })
  .then(() => {
    console.log(6)
  })
