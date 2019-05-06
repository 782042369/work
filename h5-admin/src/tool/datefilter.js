/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 时间过滤器
 * @Date: 2019-05-06 17:53:48
 * @LastEditTime: 2019-05-06 18:10:17
 */
const datefilter = function (timestamp, formats) {
  let zero = function (time) {
    let arr = time < 10 ? '0' + time : time
    return arr
  }
  let myDate = new Date(timestamp)
  let year = myDate.getFullYear()
  let month = zero(myDate.getMonth() + 1)
  let day = zero(myDate.getDate())
  let hour = zero(myDate.getHours())
  let minite = zero(myDate.getMinutes())
  let second = zero(myDate.getSeconds())
  let val = formats || 'Y年m月d日 H:i'
  return val.replace(/Y|m|d|H|i|s/ig, function (matches) {
    return ({
      Y: year,
      m: month,
      d: day,
      H: hour,
      i: minite,
      s: second
    })[matches]
  })
}
export default datefilter;
