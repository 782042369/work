/*
 * @Author: 杨宏旋
 * @Date: 2020-10-21 10:58:46
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-21 10:59:28
 * @Description:
 */
const MyPromise = require('./MyPromise')

const mockAjax = (url, s, callback) => {
  setTimeout(() => {
    callback(url + '异步请求耗时' + s + '秒')
  }, 1000 * s)
}
//Promise应用
new MyPromise((resolve) => {
  resolve('getUserId同步请求')
}).then((result) => {
  console.log(result)
})
